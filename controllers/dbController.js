// Function to query the database for an article by slug
const getArticleBySlug = (db, slug) => {
  console.log('getArticleBySlug');
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM articles WHERE slug = ?;', [slug], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to query the database for a topic by slug
const getTopicBySlug = (db, slug) => {
  console.log('getTopicBySlug');
  console.log(`slug: ${slug}`)
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM topics WHERE slug = ?;', [slug], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to query the database for a topic by slug
const getSubTopicsByParentSlug = (db, parentSlug) => {
  console.log('getTopicBySlug');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM topics WHERE parentSlug = ?;', [parentSlug], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to query the database for a parent topic by parentSlug
const getParentTopic = (db, parentSlug) => {
  console.log('getParentTopic');
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM topics WHERE slug = ?;', [parentSlug], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const getTopicsWithArticles = (db, topic_slug = null) => {
  return new Promise((resolve, reject) => {
    // const query = `SELECT t1.slug AS topicSlug, t1.parentSlug, t1.title AS topicTitle, a.slug AS articleSlug 
    //                FROM topics t1 
    //                LEFT JOIN articles a ON t1.slug = a.slug`;


    var query;

    // if (topic_slug) {
    //   query = `SELECT 
    //     t1.slug AS topicSlug, 
    //     t1.parentSlug, 
    //     t1.title AS topicTitle, 
    //     a.slug AS articleSlug,
    //     t1.description as description 
    //   FROM 
    //     topics t1 
    //   JOIN 
    //     articles a 
    //   ON 
    //     '' || t1.parentSlug || '/' | t1.slug = a.slug
    //   OR
    //     t1.slug = a.slug
    //   WHERE
    //     t1.parentSlug = "${topic_slug}";`
    // } else {
      query = `SELECT 
        t1.slug AS topicSlug, 
        t1.parentSlug, 
        t1.title AS topicTitle, 
        a.slug AS articleSlug,
        t1.description as description 
      FROM 
        topics t1 
      JOIN 
        articles a 
      ON 
        '' || t1.parentSlug || '/' | t1.slug = a.slug
      OR
        t1.slug = a.slug;`
    // }

// const query = "SELECT * from articles;";

//     const query = `SELECT 
//   t1.slug AS topicSlug, 
//   t1.parentSlug, 
//   t1.title AS topicTitle, 
//   a.slug AS articleSlug 
// FROM 
//   topics t1 
// JOIN 
//   articles a 
// ON 
//   t1.slug = a.slug 
// OR 
//   '/' || t1.parentSlug || '/' || t1.slug = a.slug;`

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        console.log(rows)

        const topics = rows.filter(row => !row.parentSlug);
        const subTopics = rows.filter(row => row.parentSlug);

        console.log(`topics length: ${topics}`);
        console.log(`subTopics: ${JSON.stringify(subTopics)}`);

        const buildTopicPath = (topic, parentPath = '') => {
          const path = `${(parentPath && parentPath != "") ? `${parentPath}` : ""}/${topic.topicSlug}`;
          // const path = topic.path

          const children = subTopics
            .filter(subTopic => subTopic.parentSlug === topic.topicSlug)
            .map(subTopic => buildTopicPath(subTopic, path));

          console.log(`children: ${JSON.stringify(children)}`)

          const ret = {
            topics: topic.topicTitle,
            path: path,
            title: topic.topicSlug.replaceAll("-", " "),
            description: topic.description,
            subTopics: children
          };

          return ret;
        };

        var result = topics.map(topic => buildTopicPath(topic));
        // if (result = null) { result = subTopics}

        console.log(`result: ${JSON.stringify(result)}`);
        console.log(`Number of topics: ${result.length}`);

        resolve(result);
      }
    });
  });
};


const getPathsForArticles = (db) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT path FROM articles;', [], (err, rows) => {
      // console.log(JSON.stringify(paths))
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to query the database for an article by slug
const getCityStateCountry = (db, city, state, country) => {
  console.log(`city: ${city}\nstate: ${state}\ncountry: ${country}`)
  console.log('getArticleBySlug');
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM cityStateCountry WHERE city = ? AND state = ? AND country = ?;', [city, state, country], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to query the database for an article by slug
const getAllCityStateCountry = (db, city, state, country) => {
  console.log(`city: ${city}\nstate: ${state}\ncountry: ${country}`)
  console.log('getArticleBySlug');
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM cityStateCountry;', [city, state, country], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('../db/db.db');
// // getTopicsWithArticles(db);

// test = async () => {
//   console.log(await getTopicsWithArticles(db, "Children-and-Family-Services"));
// }

// test();

module.exports = {
  getArticleBySlug,
  getTopicBySlug,
  getParentTopic,
  getTopicsWithArticles,
  getPathsForArticles,
  getSubTopicsByParentSlug,
  getCityStateCountry,
  getAllCityStateCountry
};
