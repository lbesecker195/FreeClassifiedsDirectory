const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.db')

db.serialize(() => {
	// db.run('DROP TABLE articles;');
  db.run('CREATE TABLE articles (slug TEXT, path TEXT, title TEXT, description TEXT, content TEXT)')
})

db.close()
