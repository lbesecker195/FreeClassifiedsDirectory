// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('db.db')
// const createArticleGPT = require('../controllers/misc/createArticleGPT.mjs')

import createArticleGPT from '../controllers/misc/createArticleGPT.mjs';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('db.db')

// // Function to insert articles into the database
// const insertArticles = (db, article) => {
//   return new Promise((resolve, reject) => {
//     db.run(
//       'INSERT INTO articles (slug, content, title, description) VALUES (?, ?, ?, ?);',
//       [article.slug, article.content, article.title, article.description],
//       function(err) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       }
//     );
//   });
// };

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
    const query = `
      SELECT subtopics.*
      FROM topics subtopics
      JOIN topics parents ON subtopics.parentSlug = parents.slug
      JOIN articles parentArticles ON parents.slug = parentArticles.slug
      WHERE subtopics.parentSlug IS NOT NULL 
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
    const { slug, title, description, content } = article;

    const query = `INSERT INTO articles (slug, content, title, description) VALUES (?, ?, ?, ?);`;

    db.run(query, [slug, content, title, description], function (err) {
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
	var topic = await getParentTopicWithoutArticle(db);
	// var topic = await getSubtopicWithParentArticle(db);
	console.log(topic);

	// var slug = `Education-and-Training`
	// var title = `Unlocking Career Success in 2024`
	// var description = `A comprehensive guide to education and training directories for 2024, detailing trends, types of programs, and strategies to align training with job opportunities, enhancing career prospects in an evolving job market.`
	// var content = `Education and training have always been integral to individual and societal growth. In today’s fast-paced and ever-evolving world, staying abreast of the latest educational opportunities and training programs is crucial. This article delves into the education and training directories for 2024, examining how they can help individuals navigate their educational journeys and career pathways more effectively.\n\nWith advancements in technology and shifts in job market demands, the landscape of education and training is continuously changing. This creates a need for up-to-date resources that can guide learners toward achieving their goals. Education and training directories are among those critical resources, providing comprehensive lists of programs and institutions.\n\nThis article will explore the structure and features of education and training directories, emerging trends in the education sector, the current job market landscape, and strategies to align training programs with career opportunities. By understanding these facets, learners and job seekers can make informed decisions to enhance their skills and advance their careers.\n\n\nAn education directory is a meticulous compilation of various educational programs and institutions. Its primary purpose is to serve as a robust guide for students, educators, and professionals seeking educational advancement. The key features of a comprehensive education directory include detailed information on courses, faculty qualifications, accreditation status, and alumni success stories. In 2024, education directories are expected to leverage advanced technologies such as AI to provide personalized recommendations and real-time updates, keeping pace with the dynamic educational landscape.\n\nA well-designed education directory provides not only listings of educational institutions but also detailed insights into programs offered, faculty expertise, campus facilities, and student support services. This level of detail helps prospective students make informed decisions about where to study and what programs to pursue. Additionally, directories may include student reviews and ratings, offering a first-hand perspective on the quality of education provided.\n\nThe incorporation of technology, particularly artificial intelligence, has revolutionized how education directories function. AI can personalize recommendations based on user profiles, learning goals, and career aspirations. Real-time updates ensure that users have access to the latest information, which is crucial given the rapid changes in educational offerings. Furthermore, some directories now include virtual tours and interactive features, providing an immersive experience that traditional directories could not offer.\n\n\nThe landscape of education is broadly divided into various types catering to distinct needs. The battle between online and traditional education continues, with each offering unique benefits. Online education provides flexibility and accessibility, enabling learners to study from anywhere at any time. It is particularly beneficial for working professionals and those with geographic constraints. Traditional education, on the other hand, offers a more structured environment, face-to-face interaction, and access to campus facilities, which some learners may prefer. Vocational training and certification programs are becoming increasingly popular as they provide specialized skills for specific industries. These programs are typically shorter than degree programs and focus on practical, hands-on training. They are ideal for individuals looking to enter the workforce quickly or those seeking to upskill in their current profession. Courses might cover areas like healthcare, IT, culinary arts, or automotive repair, aligning closely with market demands. Higher educational institutions, such as colleges and universities, remain the cornerstone of advanced education. They offer a broad array of programs, from undergraduate to doctoral levels, across various disciplines. However, they face competition from emerging alternatives like micro-credentialing and boot camps. Continuing education and adult learning programs also play a significant role, offering courses and certifications tailored for adult learners looking to advance their careers or transition into new fields. These programs provide flexibility and are often designed to accommodate busy schedules.\n\nVocational training and certification programs are becoming increasingly popular as they provide specialized skills for specific industries. These programs are typically shorter than degree programs and focus on practical, hands-on training. They are ideal for individuals looking to enter the workforce quickly or those seeking to upskill in their current profession. Courses might cover areas like healthcare, IT, culinary arts, or automotive repair, aligning closely with market demands. Higher educational institutions, such as colleges and universities, remain the cornerstone of advanced education. They offer a broad array of programs, from undergraduate to doctoral levels, across various disciplines. However, they face competition from emerging alternatives like micro-credentialing and boot camps. Continuing education and adult learning programs also play a significant role, offering courses and certifications tailored for adult learners looking to advance their careers or transition into new fields. These programs provide flexibility and are often designed to accommodate busy schedules.\n\nHigher educational institutions, such as colleges and universities, remain the cornerstone of advanced education. They offer a broad array of programs, from undergraduate to doctoral levels, across various disciplines. However, they face competition from emerging alternatives like micro-credentialing and boot camps. Continuing education and adult learning programs also play a significant role, offering courses and certifications tailored for adult learners looking to advance their careers or transition into new fields. These programs provide flexibility and are often designed to accommodate busy schedules.\n\n\nMuch like the education directory, a training directory compiles diverse training programs and providers. It serves employees and job seekers aiming to improve their skillsets. A comprehensive training directory features detailed course descriptions, trainer profiles, and reviews from previous participants. In 2024, training directories are expected to focus more on niche skills and competencies, reflecting the growing trend towards specialized and targeted learning.\n\nTraining directories are invaluable for professionals seeking to stay competitive in their fields. They typically include a range of programs, from short workshops and seminars to extensive certification courses. Detailed descriptions help users understand course content, learning outcomes, and prerequisites, ensuring they can find programs that best meet their needs. Reviews and ratings from past participants provide additional insights into the effectiveness and quality of the training offered. The trend towards niche skills is driven by the need for specialized knowledge in the modern job market. As industries evolve, the demand for specific skills that can meet new challenges and opportunities increases. Training directories that focus on these niche areas help professionals identify and acquire the exact competencies needed to advance their careers. By keeping pace with industry trends and incorporating feedback from the workforce, training directories ensure that their offerings remain relevant and valuable. The trend towards niche skills is driven by the need for specialized knowledge in the modern job market. As industries evolve, the demand for specific skills that can meet new challenges and opportunities increases. Training directories that focus on these niche areas help professionals identify and acquire the exact competencies needed to advance their careers. By keeping pace with industry trends and incorporating feedback from the workforce, training directories ensure that their offerings remain relevant and valuable.\n\nThe trend towards niche skills is driven by the need for specialized knowledge in the modern job market. As industries evolve, the demand for specific skills that can meet new challenges and opportunities increases. Training directories that focus on these niche areas help professionals identify and acquire the exact competencies needed to advance their careers. By keeping pace with industry trends and incorporating feedback from the workforce, training directories ensure that their offerings remain relevant and valuable.\n\n\nSeveral emerging trends are reshaping the education and training landscape. With rapid technological advancements, online learning platforms and virtual classrooms have gained prominence, making education more accessible. Platforms such as Coursera, edX, and Udemy offer a vast array of courses, from basic skills to advanced degrees, available to anyone with an internet connection. These platforms often provide flexible learning schedules, enabling learners to balance education with other responsibilities.\n\nThe growth of micro-credentials and certifications signals a shift towards recognizing short-term, targeted learning achievements. Programs offering badges or certificates for completing specific modules or skill sets are becoming more common. These micro-credentials are attractive because they allow learners to quickly demonstrate their competencies to employers. They are especially useful in fast-paced industries like technology, where the ability to learn and apply new skills rapidly is highly valued. Additionally, there is a rising emphasis on soft skills training, as employers increasingly recognize the importance of attributes like communication, teamwork, and problem-solving. Soft skills are critical for workplace success but are often overlooked in traditional education. Training programs focused on these skills can help individuals improve their employability and effectiveness in various professional contexts. This trend reflects a broader understanding that technical skills alone are not sufficient; a well-rounded skill set is necessary for success. Additionally, there is a rising emphasis on soft skills training, as employers increasingly recognize the importance of attributes like communication, teamwork, and problem-solving. Soft skills are critical for workplace success but are often overlooked in traditional education. Training programs focused on these skills can help individuals improve their employability and effectiveness in various professional contexts. This trend reflects a broader understanding that technical skills alone are not sufficient; a well-rounded skill set is necessary for success.\n\nAdditionally, there is a rising emphasis on soft skills training, as employers increasingly recognize the importance of attributes like communication, teamwork, and problem-solving. Soft skills are critical for workplace success but are often overlooked in traditional education. Training programs focused on these skills can help individuals improve their employability and effectiveness in various professional contexts. This trend reflects a broader understanding that technical skills alone are not sufficient; a well-rounded skill set is necessary for success.\n\n\nUnderstanding the job market is crucial for aligning education and training efforts with career goals. The job market in 2024 is expected to be dynamic, with certain sectors experiencing higher demand for skilled workers. Industries such as technology, healthcare, and renewable energy are seeing significant growth, presenting numerous opportunities for job seekers. Education and training play a pivotal role in preparing individuals for these opportunities, ensuring they have the skills needed to succeed.\n\nThe technology sector continues to expand, driven by innovations in areas like artificial intelligence, cybersecurity, and cloud computing. Jobs in these fields often require specialized training and certification. Healthcare remains a robust sector, with growing needs for professionals across various roles, from nursing to medical technology. Renewable energy is also on the rise, spurred by increasing environmental awareness and policy shifts towards sustainable practices. Each of these sectors offers a range of career paths that require different levels of education and training.\n\nTo meet the demands of these growing industries, education and training programs must evolve. They need to incorporate the latest knowledge and skills that employers seek. This dynamic interplay between job market trends and educational offerings requires continuous adaptation and flexibility. Learners and job seekers who stay informed about these trends and pursue relevant education and training are better positioned to take advantage of emerging job opportunities. \nAligning education and training with career aspirations is essential for maximizing employability. Strategies for matching training programs to specific jobs include thorough research and leveraging resources such as career counseling and professional networks. Online resources, such as job boards, industry reports, and career development websites, provide valuable information about the skills and qualifications required for various roles. Career counselors can offer personalized advice, helping individuals identify the best training programs to meet their goals.\n\n\nAligning education and training with career aspirations is essential for maximizing employability. Strategies for matching training programs to specific jobs include thorough research and leveraging resources such as career counseling and professional networks. Online resources, such as job boards, industry reports, and career development websites, provide valuable information about the skills and qualifications required for various roles. Career counselors can offer personalized advice, helping individuals identify the best training programs to meet their goals.\n\nSuccessful case studies demonstrate the benefits of targeted training in securing desirable positions. For instance, an individual may complete a coding boot camp and quickly find employment as a software developer. Another might pursue a certification in project management and advance to a leadership role within their organization. These examples illustrate how strategic education and training choices can lead to significant career advancements.\n\nResources like education and training directories play a crucial role in this process. They provide comprehensive information about available programs, helping individuals align their training with job market demands. By using these tools effectively, learners can make informed decisions that enhance their employability and career prospects. In a competitive job market, having the right skills and credentials can be the key to standing out and achieving professional success.\n\n\nNavigating the vast landscape of education and training can be overwhelming, but a well-structured directory can be an invaluable tool. By keeping abreast of the latest offerings and trends, individuals can make informed decisions that enhance their career prospects. In 2024, leveraging the resources provided by education and training directories is more important than ever, empowering learners to achieve their goals and adapt to the evolving job market.\n\nEducation and training directories are not just about finding programs; they are about finding the right programs that align with individual career aspirations. They provide a bridge between educational opportunities and job market demands, ensuring that learners can acquire the skills needed in their desired fields. As the job market continues to evolve, staying informed and proactive in educational pursuits is crucial.\n\nUltimately, the goal is to use these directories and other resources to their fullest potential. By doing so, individuals can navigate their educational journeys with confidence, knowing they are making choices that will lead to personal and professional growth. The ever-changing landscape of education and training presents challenges, but with the right tools and information, these challenges can be transformed into opportunities for success.`

	// var ret = {
 //        slug: slug,
 //        title: title,
 //        description: description,
 //        content: content
 //    }




	var ret = await createArticleGPT(topic.title)
	ret.slug = topic.slug;

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
