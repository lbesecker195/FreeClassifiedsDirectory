import createArticleGPT from '../controllers/misc/createArticleGPT.mjs';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('db.db')

// // Function to retrieve a parent topic that doesn't have an associated article
// const getParentTopicWithoutArticle = (db) => {
//   return new Promise((resolve, reject) => {
//     // db.get('SELECT * FROM topics LIMIT 1;', [], (err, row) => {
//     db.get('SELECT t.* FROM topics t LEFT JOIN articles a ON t.slug = a.slug WHERE t.parentSlug IS NULL AND a.slug IS NULL LIMIT 1;', [], (err, row) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(row);
//       }
//     });
//   });
// };

const getTopicWithoutTopicCityArticle = (db) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT t.* 
FROM topics t
LEFT JOIN topicCity tc ON t.slug = tc.slug
LEFT JOIN articles a ON t.parentSlug = a.slug
WHERE tc.slug IS NULL
  AND (t.parentSlug IS NULL OR a.slug IS NULL)
ORDER BY RANDOM()
LIMIT 1;
    `;
    db.get(query, [], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const insertTopicCity = (article) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO topicCity (slug, path, topic, title, description, content) VALUES (?, ?, ?, ?, ?, ?);`;

    db.run(query, [article.slug, article.path, article.topic, article.title, article.description, article.content], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, ...article });
      }
    });
  });
};

// // Example usage
// const newArticle = {
//   slug: 'example-slug',
//   title: 'Example Title',
//   description: 'This is an example description.',
//   content: 'This is the example content of the article.'
// };


const main = async() => {
  // Create an article based on a topic 
	// var topic = await getParentTopicWithoutArticle(db);
	// var topic = await getSubtopicWithParentArticle(db);
// var topic = await getTopicWithoutTopicCityArticle(db)
  // console.log(topic);



	var slug = "Marketing-and-Advertising"
	var path = "/Business-and-Professional-Services/Marketing-and-Advertising"
	var title = "The Role of Marketing and Advertising in ${city}, ${state}, ${country}"
  var blurb = "In the vibrant business landscape of ${city}, effective marketing and advertising are pivotal to achieving success and growth. This article delves into the crucial role these elements play in creating brand awareness, engaging customers, and driving sales. By exploring various strategies—from digital marketing technologies like social media, SEO, and AI-driven tools to traditional advertising and event marketing—we uncover how local businesses can tailor their efforts to stand out in a competitive market.\n\nDiscover the benefits of collaborating with ${city}'s leading marketing agencies, which offer a range of specialized services, including public relations, market research, and comprehensive advertising solutions. Learn how to measure the return on investment (ROI) of your campaigns, navigate regulatory compliance, and leverage data analytics to refine your strategies for maximum impact.\n\nThrough practical tips, actionable checklists, and real success stories, this article provides a comprehensive guide for local business owners eager to elevate their marketing game. Don't miss the opportunity to unlock new avenues for business growth and establish a strong market presence in ${city}. Download our free marketing guide, subscribe to our newsletter, or join our upcoming local marketing workshop to kickstart your journey to success!"
	var description = "Explore essential marketing and advertising strategies for success in ${city}. Discover benefits, practical tips, and local agency insights to boost brand awareness, customer engagement, and sales growth. Unlock your business potential!"
	var content = "In the dynamic business landscape of ${city}, marketing and advertising serve as crucial engines driving business visibility and success. These functions encompass a range of activities from promoting products and services to strategic communication designed to engage potential customers. Effective marketing builds brand recognition, stimulates customer engagement, and ultimately boosts sales and revenue. Understanding these aspects is vital for businesses in ${city}, ${state}, ${country}, aiming to create a robust market presence.\n\nThis article aims to shine a spotlight on the vital role marketing and advertising play in the business ecosystem of ${city}. Whether you're running a cozy café downtown, a tech startup, or a large corporation, effective marketing strategies can propel your business forward. We'll explore the significance of these services, examine their benefits, and offer insights into current trends shaping the industry.\n\nIn today's competitive market, creating a recognizable brand is essential. For businesses in ${city}, marketing and advertising are pivotal in establishing and strengthening brand identity. Whether through innovative social media campaigns or local events, businesses can enhance their visibility among local consumers.\n\nBuilding meaningful connections with the target audience is critical. An engaging marketing strategy can foster customer loyalty and encourage repeat business. Techniques like personalized email campaigns, social media interactions, and content marketing can be particularly effective in ${city}, helping businesses to connect on a deeper level with their customers.\n\nA well-executed advertising campaign can significantly impact sales and revenue. For instance, a targeted social media ad can draw in new customers, while an enticing promotional offer can boost immediate sales. By understanding the local market dynamics in ${city}, businesses can tailor their advertising efforts to maximize conversions and revenue growth.\n\nDigital marketing has become a cornerstone for businesses, offering tools like social media, SEO, email marketing, and pay-per-click advertising. For businesses in ${city}, digital marketing provides a cost-effective way to reach a broader audience, engage with potential customers in real-time, and measure the effectiveness of campaigns through analytics.\n\nDespite the rise of digital media, traditional advertising methods still hold value. Print media, billboards, radio, and TV ads can effectively reach local audiences. For instance, a local restaurant in ${city} might benefit from a well-placed billboard or a radio ad during peak commute times, enhancing brand visibility.\n\nParticipating in or sponsoring local events is a powerful way to build brand awareness and engage with the community. Events offer businesses in ${city} a platform to showcase their products, interact with potential customers, and build relationships. Success stories from past events highlight the potential impact of this strategy.\n\n${city} boasts a variety of marketing and advertising agencies, each offering specialized services. Some agencies excel in digital marketing while others provide comprehensive traditional advertising solutions. Understanding each agency's strengths can help businesses choose the right partner for their needs.\n\nLocal agencies in ${city} offer a range of services including digital marketing, traditional advertising, public relations, and market research. Collaborating with these agencies can provide businesses with tailored marketing solutions, leveraging local market knowledge and expertise.\n\nSelecting the right marketing agency involves evaluating their expertise, track record, and service offerings. Business owners in ${city} should look for agencies that understand their specific industry and can provide customized solutions to meet their marketing goals.\n\nThe integration of automation and AI in marketing is transforming how campaigns are executed. AI-driven tools can analyze consumer behavior, personalize marketing messages, and optimize ad spend. Businesses in ${city} leveraging these technologies can gain a competitive edge by improving efficiency and targeting accuracy.\n\nData-driven marketing strategies are crucial for understanding campaign performance and making informed decisions. Using analytics tools, businesses in ${city} can track customer interactions, measure ROI, and fine-tune their strategies for better results. This data-driven approach ensures that marketing efforts are both effective and efficient.\n\nAdhering to local, state, and national advertising regulations is critical for legal compliance and maintaining consumer trust. These regulations may cover aspects such as truth in advertising, data privacy, and consumer protection. Businesses in ${city} must stay informed about these requirements to avoid legal repercussions.\n\nProfessional marketers play a vital role in ensuring that advertising efforts comply with legal guidelines. By staying updated on regulatory changes and implementing best practices, marketers help businesses avoid penalties and build a trustworthy brand image.\n\nNon-compliance with advertising regulations can lead to significant consequences, including fines, legal challenges, and damage to reputation. For businesses in ${city}, ensuring compliance is not only about avoiding penalties but also about establishing credibility and building long-term customer trust.\n\nMarketing and advertising are essential to the growth and success of businesses in ${city}. These activities enhance brand awareness, engage customers, drive sales, and ensure regulatory compliance. Leveraging the services of professional agencies and adopting innovative technologies can significantly enhance marketing efforts.\n\nIn the ever-evolving market of ${city}, investing in effective marketing and advertising strategies is crucial for business growth. Businesses that prioritize their marketing efforts can unlock new opportunities, foster customer loyalty, and achieve long-term success. By staying ahead of trends and leveraging professional expertise, businesses can secure their place in the competitive landscape of ${country}."

	var ret = {
        slug: slug,
        path: path,
        title: title,
        description: description,
        blurb: blurb,
        content: content
    }



 // var title = "Marketing and Advertising"

// DONT FORGET to get the 'path' from the DB

 // var topic = {
 //   title: title,
 //   slug: title.replaceAll(" ", "-"),
 //   path: `/${title.replaceAll(" ", "-")}`
 // }

	// var ret = await createArticleGPT(topic)
	// ret.slug = topic.slug;
	// ret.path = topic.path;

	console.log(ret)

	insertTopicCity(ret)
	  .then((result) => {
	    console.log('Article inserted successfully:', result);
	    db.close((err) => {
	      if (err) {
	        console.error('Error closing database:', err.message);
	      } else {
	        console.log('Database connection closed.');
	      }
	    });
	  })
	  .catch((err) => {
	    console.error('Error inserting article:', err.message);
	    db.close((err) => {
	      if (err) {
	        console.error('Error closing database:', err.message);
	      } else {
	        console.log('Database connection closed.');
	      }
	    });
	  });
}

main();
// db.close()
