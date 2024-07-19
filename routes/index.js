var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.db');
const dbController = require('../controllers/dbController');
var showdown  = require('showdown')


// Handle the root path separately
router.get('/', async function(req, res, next) {
	var topics = await dbController.getTopicsWithArticles(db);
  // res.send(`path: "${req.path.substring(1)}"`);
  res.render('index', {topics: topics});
});

// Wildcard route to catch all URLs
router.get('*', async function(req, res, next) {
  slug = req.path.split('/').at(-1); // 	Remove leading slash

  if (slug == "") {
  	slug = "index"
  }

  try {
  	console.log(`slug ${slug}`)

    var article = await dbController.getArticleBySlug(db, slug);

    converter = new showdown.Converter();
    article.content = converter.makeHtml(article.content);
    if (article) {
    	console.log(article)
      res.render('article', { req, article });
    } 

    // else {
    //   const topic = await dbController.getTopicBySlug(db, slug);
    //   if (topic) {
    //     let parentTopic = null;
    //     if (topic.parentSlug) {
    //       parentTopic = await dbController.getParentTopic(db, topic.parentSlug);
    //     }
    //     res.render('topic', { topic, parentTopic });
    //   } else {
    //     res.redirect(301, '/');
    //   }
    // }
  } catch (error) {
    next(error);
  } finally {
	// db.close();
  }
});

module.exports = router;
