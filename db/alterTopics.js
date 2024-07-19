const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('db.db');

// Function to construct path recursively
const constructPath = (topic, topicsMap) => {
  let path = topic.slug;
  let parentSlug = topic.parentSlug;

  while (parentSlug) {
    const parentTopic = topicsMap[parentSlug];
    if (parentTopic) {
      path = parentTopic.slug + '/' + path;
      parentSlug = parentTopic.parentSlug;
    } else {
      // Breaking the loop if no parent found to avoid infinite loop
      parentSlug = null;
    }
  }

  return `/${path}`;
}

// Main function to update topics with path values
const updateTopicsWithPath = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM topics', [], (err, rows) => {
      if (err) {
        return reject(err);
      }

      // Create a map of topics for easy lookup
      const topicsMap = {};
      rows.forEach(row => {
        topicsMap[row.slug] = row;
      });

      const updatePromises = rows.map(topic => {
        const path = constructPath(topic, topicsMap);

        console.log(path)

        return new Promise((updateResolve, updateReject) => {
          db.run('UPDATE topics SET path = ? WHERE slug = ?', [path, topic.slug], function(err) {
            if (err) {
              return updateReject(err);
            }
            updateResolve();
          });
        });
      });

      // Wait for all updates to complete
      Promise.all(updatePromises)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  });
};

// Add the new "path" column to the topics table if it doesn't exist
const addPathColumn = () => {
  return new Promise((resolve, reject) => {
    db.run('ALTER TABLE topics ADD COLUMN path TEXT', (err) => {
      if (err && !err.message.includes("duplicate column name")) {
        return reject(err);
      }
      resolve();
    });
  });
};

// Execution
(async () => {
  try {
    await addPathColumn();
    await updateTopicsWithPath();
    console.log('All topics updated with path.');
  } catch (error) {
    console.error('Error updating topics with path:', error);
  } finally {
    db.close();
  }
})();