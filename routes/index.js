var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.db');
const dbController = require('../controllers/dbController');
var showdown  = require('showdown')

router.get('/favicon.ico', (req, res) => res.status(204));

router.get('/sitemap.xml', async function(req, res, next) {
  var rows = await dbController.getPathsForArticles(db);  
  var paths = rows.map(r => r.path);
  
  console.log(paths)
  
  res.type('application/xml');
  res.render('sitemap', {paths: paths});
});

// Handle the root path separately
router.get('/', async function(req, res, next) {
	var topics = await dbController.getTopicsWithArticles(db);
  // res.send(`path: "${req.path.substring(1)}"`);
  res.render('index', {topics: topics});
});

// Automatically 
router.get('/:mainTopic/in/:city/:state/:country', async function(req, res, next) {
  console.log(`path: ${req.path}`)
  var city = req.params.city.replaceAll("-", " ");
  var state = req.params.state.replaceAll("-", " ");
  var country = req.params.country.replaceAll("-", " ");

  console.log(`params: ${JSON.stringify(req.params)}`)
  var cityStateCountry = await dbController.getCityStateCountry(db, city, state, country)
  console.log(`cityStateCountry: ${JSON.stringify(cityStateCountry)}`);

  var topic = null;
  var subTopics = null;

  if (cityStateCountry) {
    slug = req.path
    console.log(`slug: ${slug}`)
    slug = slug.split("/in")[0]
    console.log(`slug: ${slug}`)
    slug = slug.split("/")
    console.log(`slug: ${slug}`)
    slug = slug.at(-1);
    console.log(`slug: ${slug}`)

    topic = await dbController.getTopicBySlug(db, slug);
    console.log(`topic: ${JSON.stringify(topic)}`)

    subTopics = await dbController.getSubTopicsByParentSlug(db, slug);
    console.log(`subTopic: ${JSON.stringify(subTopics)}`)
  }

  res.render('mainTopicCity', {req, cityStateCountry, topic, subTopics});
})

// Wildcard route to catch all URLs
router.get('*', async function(req, res, next) {
  slug = req.path.split('/').at(-1); // 	Remove leading slash

  try {
  	console.log(`slug ${slug}`)

    var article = await dbController.getArticleBySlug(db, slug);

    var topic = await dbController.getTopicBySlug(db, article.slug);
    console.log(`topic: ${JSON.stringify(topic)}`)

    var st = null;

    if (topic) {
      try {
        st = await dbController.getTopicsWithArticles(db, topic.slug);
        st = st.find(elem => {
          console.log(elem.path)
          return elem.path == req.path;
        }).subTopics;

        console.log(`subTopics: ${st}`)
      } catch (err) {
          st = null;
          console.log(`Error in router.get('*"): ${JSON.stringify(err)}`)
      }
    }


    converter = new showdown.Converter();
    article.content = converter.makeHtml(article.content);
    if (article) {
    	console.log(article)
      console.log(req.path)
      // res.render('article', { req, article, topic, st: subTopics });
      res.render('topic', { req, article, st });
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
