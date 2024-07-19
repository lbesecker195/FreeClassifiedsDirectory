const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('db.db');


// Main function to update topics with path values
const updateTopicsWithPath = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM topics', [], (err, rows) => {
      const updatePromises = rows.map(row => {
        return new Promise((updateResolve, updateReject) => {
          db.run('UPDATE articles SET path = ? WHERE slug = ?', [row.path, row.slug], function(err) {
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

// Execution
(async () => {
  try {
    await updateTopicsWithPath();
    console.log('All topics updated with path.');
  } catch (error) {
    console.error('Error updating topics with path:', error);
  } finally {
    db.close();
  }
})();