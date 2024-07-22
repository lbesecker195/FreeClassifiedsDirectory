const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.db')

// Generic text for the path: /main-topic/sub-topic/in/CITY/STATE/COUNTRY


	// db.run('drop table topicCity;');

  db.run('CREATE TABLE topicCity (topic TEXT, parentTopic TEXT, title TEXT, description TEXT, content TEXT)');

const insertArticle = () => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO articles (topic, parentTopic, title, description, content) VALUES (?, ?, ?, ?, ?);`;

    var topic = "Business and Professional Services"
    var parentTopic = ""
    var title = "Top Business and Professional Services in ${city}, ${state}"
    var description = "Discover ${city}'s top business and professional services in one place. Connect with experts in consulting, finance, HR, and marketing to elevate your enterprise. Explore our directory today!"
    var content = "**Welcome to ${city}, ${state}'s Premier Business and Professional Services Directory!**\n\nAre you an ambitious entrepreneur, a seasoned business owner, or a corporate leader seeking the best services to elevate your enterprise? Your search ends here. Our directory is designed to connect you with top-tier business and professional services that drive growth, enhance efficiency, and streamline operations.\n\n## Why Use Our Directory?\n\n- **Comprehensive Listings:** Explore a wide array of professional services from financial planning to marketing strategies, all in one place. Our directory is your one-stop-shop for all business needs.\n- **Verified Experts:** We feature only the most reputable and experienced professionals across various industries, ensuring quality and reliability.\n- **Tailored Solutions:** Find services that align perfectly with your specific business needs and objectives, from HR solutions to strategic consulting and innovative technology.\n- **Community Connections:** Engage with a vibrant network of local professionals and businesses. Collaborate, share insights, and thrive together.\n- **User-Friendly Interface:** Our intuitive directory makes it easy to search, filter, and find exactly what you need within minutes. Enjoy features like user ratings, reviews, and interactive tools like maps and live chat support.\n- **Success Metrics:** Join the thousands of businesses that have found success through our directory. With plenty of connections made and a great satisfaction rate, our platform is proven to deliver results.\n\n## Featured Service Categories\n\n**Consulting & Advisory:**\n\n- Strategic Planning: Partner with experts to chart your business’s future course.\n- Market Analysis: Gain insights into market trends and consumer behavior to stay ahead of competitors.\n- Business Development: Uncover new opportunities for growth and expansion.\n  \n**Financial Services:**\n\n- Accounting: Keep your accounts accurate and up-to-date with professional accounting services.\n- Budgeting: Create robust budgets to optimize resource allocation.\n- Financial Planning: Plan for the future with comprehensive financial advice and services.\n\n**Human Resources:**\n\n- Recruitment: Find the best talent with streamlined hiring processes.\n- Employee Training: Enhance your team's skills with targeted training programs.\n- HR Management: Simplify HR tasks with effective management solutions.\n\n**Marketing & Branding:**\n\n- Digital Marketing: Optimize your online presence with targeted campaigns.\n- Brand Development: Build a strong, recognizable brand.\n- Customer Engagement: Engage with your audience to foster loyalty and growth.\n\n## Why We Stand Out\n\n- **Localized Expertise:** Our directory features professionals who understand the unique market conditions and business landscape of ${city}. Benefit from local expertise and personalized service.\n- **Special Offers:** Take advantage of exclusive incentives like discounts, free consultations, and trial periods available through our platform.\n- **Interactive Tools:** Utilize our advanced features like interactive maps, video introductions, and live chat support to ease your search and connect instantly with service providers.\n\n## Join the ${city} Business Revolution in ${state}!\n\nTransform your business landscape by leveraging the top business and professional services our directory has to offer. Don't miss out on the opportunity to connect with local experts who understand the unique needs of ${city}. Whether you need expert advice, financial planning, or innovative marketing strategies, find the perfect match for your business right here.\n\n**Contact Us Today:** Take the next step in securing your business’s success by exploring our directory now! Connect with the best in ${city} and watch your business thrive.\n\n---\n\n**Discover. Connect. Succeed. With ${city} Business and Professional Services Directory.**"

    db.run(query, [topic, parentTopic, path, title, description, city, state, country, content], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, ...article });
      }
    });
  });
};


runIt = async () => {
	await insertArticle();
}