import createArticleGPT from '../controllers/misc/createArticleGPT.mjs';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('db.db')

// Function to retrieve a parent topic that doesn't have an associated article
const getParentTopicWithoutArticle = (db) => {
  return new Promise((resolve, reject) => {
    // db.get('SELECT * FROM topics LIMIT 1;', [], (err, row) => {
    db.get('SELECT t.* FROM topics t LEFT JOIN articles a ON t.slug = a.slug WHERE t.parentSlug IS NULL AND a.slug IS NULL LIMIT 1;', [], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const getSubtopicWithParentArticle = (db) => {
  return new Promise((resolve, reject) => {
//     const query = `
// SELECT subtopics.*, parents.rowid
// FROM topics subtopics
// JOIN topics parents ON subtopics.parentSlug = parents.slug
// JOIN articles parentArticles ON parents.slug = parentArticles.slug
// LEFT JOIN articles childArticles ON subtopics.slug = childArticles.slug
// WHERE subtopics.parentSlug IS NOT NULL 
// AND childArticles.slug IS NULL
// ORDER BY parents.rowid DESC
// LIMIT 1;
//     `;
    const query = `
SELECT subtopics.*, parents.rowid
FROM topics subtopics
JOIN topics parents ON subtopics.parentSlug = parents.slug
JOIN articles parentArticles ON parents.slug = parentArticles.slug
LEFT JOIN articles childArticles ON subtopics.slug = childArticles.slug
WHERE subtopics.parentSlug IS NOT NULL 
AND childArticles.slug IS NULL
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

const insertArticle = (article) => {
  return new Promise((resolve, reject) => {
    // const { slug, path, title, description, content } = article;

    const query = `INSERT INTO articles (slug, path, content, title, description) VALUES (?, ?, ?, ?, ?);`;

    db.run(query, [article.slug, article.path, article.content, article.title, article.description], function (err) {
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
	// console.log(topic);




	// var slug = `Birthday-Party-Services`
	// var path = `/Children-and-Family-Services/Birthday-Party-Services`
	// var title = `Unforgettable Birthday Parties 2024`
	// var description = `The 2024 birthday party services industry offers diverse options and emerging trends for memorable celebrations, while also providing numerous job opportunities in event planning, catering, entertainment, and multimedia.`
	// var content = `Birthday parties are significant milestones that people deeply cherish. These celebrations are a unique blend of joy, nostalgia, and the excitement of bringing loved ones together. Each birthday marks not just another year of life but an opportunity to create lasting memories. Therefore, organizing a memorable birthday party often involves meticulous planning, an array of specialized services, and attention to detail to ensure the event is perfect.\n\nThe birthday party services industry has seen tremendous evolution over the years. From simple gatherings with homemade cakes to extravagant themed parties with professional planning, the possibilities are endless. Various services such as catering, entertainment, decorations, and photography have become essential components that elevate the experience of celebrating a special day. These services are tailored to meet diverse needs, preferences, and budgets, making it easier for hosts to create a unique and unforgettable celebration.\n\nIn 2024, the birthday party services industry is poised for further innovation and growth. Emerging trends, driven by technological advancements and changing consumer preferences, are set to redefine how we celebrate birthdays. Additionally, the industry continues to offer numerous job opportunities, making it an exciting field for those interested in event planning and related professions.\n\n\nThe first component to consider when organizing a birthday party is the venue. The choice of location sets the tone for the entire event. Luxurious banquet halls can provide an opulent ambiance, ideal for grand celebrations, while intimate backyard settings offer a cozy and personal touch. Some venues come with in-house services that can simplify planning, while others allow for more customization through external service providers.\n\nCatering is another crucial element of any birthday celebration. The quality and variety of food can significantly enhance the party experience. Many catering services offer customizable menus to suit different tastes and dietary requirements, from gourmet meals to simple buffet spreads. Specialty catering services, such as those offering vegan or gluten-free options, are also becoming increasingly popular.\n\nEntertainment is often the highlight of a birthday party, especially for younger guests. The options are limitless, ranging from traditional entertainers like magicians and clowns to modern attractions like virtual reality experiences and interactive games. The choice of entertainment can be tailored according to the age group and preferences of the attendees, ensuring that everyone has a good time. Decorations play a pivotal role in transforming any space into a festive environment. From balloons and banners to elaborate floral arrangements and thematic décor, decorations help create the desired atmosphere for the party. Specialist decoration services offer various packages and themes, making it easier for hosts to achieve a cohesive look that matches their vision.\n\nDecorations play a pivotal role in transforming any space into a festive environment. From balloons and banners to elaborate floral arrangements and thematic décor, decorations help create the desired atmosphere for the party. Specialist decoration services offer various packages and themes, making it easier for hosts to achieve a cohesive look that matches their vision. Photography and videography are essential for capturing the memories of the day. Professional photographers and videographers can ensure that every special moment is documented beautifully. High-quality photos and videos provide lasting memories and allow guests and hosts to relive the joyous moments of the celebration for years to come.\n\nPhotography and videography are essential for capturing the memories of the day. Professional photographers and videographers can ensure that every special moment is documented beautifully. High-quality photos and videos provide lasting memories and allow guests and hosts to relive the joyous moments of the celebration for years to come.\n\n\nSelecting the appropriate services for a birthday party requires careful consideration of various factors, with budget considerations being paramount. Allocating funds wisely across different aspects of the event can ensure that all necessary elements are covered. It's important to get quotes from multiple service providers to compare prices and find the best value for money.\n\nThe theme and style of the party significantly influence the choice of services. A well-defined theme can guide decisions regarding venue, decorations, entertainment, and even the menu. Whether it's a whimsical fairy-tale theme for a child's birthday or a sophisticated black-tie event for an adult, ensuring that all services align with the chosen theme can create a more cohesive and enjoyable experience for guests.\n\nChecking reviews and recommendations is instrumental in making an informed decision. Previous customers' experiences can provide valuable insights into the reliability and quality of service providers. Online review platforms and word-of-mouth recommendations from friends and family can serve as useful resources in identifying reputable vendors.\n\nThe availability and reliability of service providers are crucial for a smooth, stress-free event. Key aspects include confirming that the vendors are available on the desired date and ensuring that they can deliver what they promise. Detailed contracts and clear communication can help set expectations and reduce the risk of misunderstandings.\n\nCustomization options offered by service providers are another important consideration. Many vendors are willing to tailor their offerings to meet specific needs and preferences. Whether it's a customized menu from a caterer or personalized decorations from a décor service, these bespoke touches can make the event feel more special and unique.\n\n\nEco-friendly parties are gaining popularity as more people become environmentally conscious. From biodegradable decorations to sustainable catering options, the industry is seeing a shift towards greener celebrations. These eco-friendly choices not only reduce the environmental impact but also add a unique and meaningful element to the party.\n\nVirtual and hybrid parties have become more prevalent, especially in the era of social distancing. These types of parties allow guests from different locations to join in the celebration, making it inclusive and far-reaching. Virtual reality experiences and online games add an interactive element, making these celebrations engaging and fun even from a distance.\n\nTechnology integration is revolutionizing how birthday parties are organized and enjoyed. Augmented reality experiences, interactive games, and smart invitations are just a few examples of how technology is being used to enhance celebrations. These tech-driven elements provide guests with unique experiences that are both entertaining and memorable.\n\nPersonalization continues to be a significant trend in 2024. Hosts are increasingly seeking ways to make their parties unique and reflective of the guest of honor's personality. Custom cakes, personalized party favors, and bespoke entertainment options are just a few ways to achieve a highly individualized celebration.\n\nExperiential celebrations are also on the rise. Instead of traditional parties, some hosts are opting for unique experiences such as adventure outings, cooking classes, or art workshops. These experiential parties offer guests an opportunity to create memories through shared activities, making the celebration even more special. \nThe birthday party services industry offers numerous job opportunities, catering to a wide range of skills and interests. Event planners play a pivotal role in organizing and executing the event to perfection. Their expertise in logistics, time management, and creative problem-solving is essential for coordinating all aspects of the party.\n\n\nThe birthday party services industry offers numerous job opportunities, catering to a wide range of skills and interests. Event planners play a pivotal role in organizing and executing the event to perfection. Their expertise in logistics, time management, and creative problem-solving is essential for coordinating all aspects of the party. Catering and bartending professionals are crucial for any successful celebration. Culinary experts ensure that the food is not only delicious but also presented beautifully. Bartenders add a touch of flair with their cocktail-making skills, providing both alcoholic and non-alcoholic beverages that cater to guests' tastes.\n\nCatering and bartending professionals are crucial for any successful celebration. Culinary experts ensure that the food is not only delicious but also presented beautifully. Bartenders add a touch of flair with their cocktail-making skills, providing both alcoholic and non-alcoholic beverages that cater to guests' tastes. Entertainers, such as magicians, clowns, and musicians, add life and excitement to the party. Their performance skills keep guests engaged and entertained, creating memorable moments that are often the highlight of the event. Opportunities for entertainers can vary widely, from performing at small private parties to large corporate events. Set-up and clean-up crews are indispensable for the seamless execution of the event. These behind-the-scenes workers ensure that everything is in place before the guests arrive and handle the clean-up afterward, allowing the hosts to relax and enjoy the celebration. These roles require physical endurance and attention to detail.\n\nEntertainers, such as magicians, clowns, and musicians, add life and excitement to the party. Their performance skills keep guests engaged and entertained, creating memorable moments that are often the highlight of the event. Opportunities for entertainers can vary widely, from performing at small private parties to large corporate events. Set-up and clean-up crews are indispensable for the seamless execution of the event. These behind-the-scenes workers ensure that everything is in place before the guests arrive and handle the clean-up afterward, allowing the hosts to relax and enjoy the celebration. These roles require physical endurance and attention to detail.\n\nSet-up and clean-up crews are indispensable for the seamless execution of the event. These behind-the-scenes workers ensure that everything is in place before the guests arrive and handle the clean-up afterward, allowing the hosts to relax and enjoy the celebration. These roles require physical endurance and attention to detail.\n\nMultimedia specialists, including photographers and videographers, capture the essence of the celebration. Their technical skills and artistic eye are crucial for documenting the special moments of the event. High-quality photos and videos provide lasting memories that guests and hosts can cherish for years to come. \nIn summary, birthday party services play a vital role in making celebrations unforgettable. With various services available, choosing the right ones involves careful consideration of budget, theme, and reliability. The industry continues to evolve with emerging trends that offer new ways to celebrate. From eco-friendly options and virtual parties to technology integration and personalized experiences, the possibilities are endless. \nIn summary, birthday party services play a vital role in making celebrations unforgettable. With various services available, choosing the right ones involves careful consideration of budget, theme, and reliability. The industry continues to evolve with emerging trends that offer new ways to celebrate. From eco-friendly options and virtual parties to technology integration and personalized experiences, the possibilities are endless.\n\n\nIn summary, birthday party services play a vital role in making celebrations unforgettable. With various services available, choosing the right ones involves careful consideration of budget, theme, and reliability. The industry continues to evolve with emerging trends that offer new ways to celebrate. From eco-friendly options and virtual parties to technology integration and personalized experiences, the possibilities are endless.\n\nFurthermore, the birthday party services industry provides numerous job opportunities for those interested in event planning and related fields. Whether it's coordinating the event, preparing delicious food, entertaining guests, or capturing memories, there is a role for everyone. Exploring these services and job opportunities can make your next birthday celebration a notable event.\n\nIn conclusion, the birthday party services industry in 2024 is set to offer even more innovative and exciting ways to celebrate. By staying informed about the latest trends and choosing the right services, hosts can create memorable and enjoyable experiences for their guests. And for those looking for careers in the industry, there are ample opportunities to make a mark and contribute to the joy and celebration of birthdays.`

	// var ret = {
 //        slug: slug,
 //        path: path,
 //        title: title,
 //        description: description,
 //        content: content
 //    }



 var title = "Auto Upholstery"

 var topic = {
   title: title,
   slug: title.replaceAll(" ", "-"),
   path: `/${title.replaceAll(" ", "-")}`
 }

	var ret = await createArticleGPT(topic)
	ret.slug = topic.slug;
	ret.path = topic.path;

	console.log(ret)

	insertArticle(ret)
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
