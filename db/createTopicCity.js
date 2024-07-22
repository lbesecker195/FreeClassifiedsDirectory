const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.db')

db.serialize(() => {
	// db.run('DROP TABLE topicCity;');
  db.run('CREATE TABLE topicCity (slug TEXT, path TEXT, topic TEXT, title TEXT, description TEXT, content TEXT)');
})

db.close()
