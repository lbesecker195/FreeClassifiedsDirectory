const sqlite3 = require('sqlite3').verbose();

// Open the database connection
const db = new sqlite3.Database('db.db');


var topicBlurb = [
 {
    "topic": "Legal Services",
    "slug": "Legal-Services",
    "blurb": "Legal Services in ${city} provide expert advice and representation across various legal matters, ensuring that residents receive the support they need. Whether you require assistance with family law, real estate transactions, or corporate law, the legal professionals in ${city} are equipped to handle your needs. From consultations and mediation to court representation, these services help navigate the complexities of the legal system.\n\nIn addition to traditional legal services, many firms in ${city} offer specialized services such as immigration law, patent law, and personal injury claims. By providing tailored solutions and personalized attention, legal services in ${city} strive to protect your rights and achieve the best possible outcomes. Residents can rely on experienced attorneys to guide them through challenging situations and safeguard their interests."
  },
  {
    "topic": "Finance and Insurance",
    "slug": "Finance-and-Insurance",
    "blurb": "Finance and Insurance services in ${city} offer a comprehensive range of solutions to manage and protect your financial well-being. From banking and investment services to insurance policies and tax planning, professionals in ${city} help individuals and businesses secure their financial future. With expert guidance and personalized strategies, you can confidently navigate complex financial landscapes.\n\nIn addition to investment and savings plans, Finance and Insurance services in ${city} provide essential coverage options such as health, auto, home, and life insurance. These services ensure that residents are protected against unexpected risks and can recover from financial setbacks. By offering reliable and customized financial solutions, finance and insurance providers in ${city} support your long-term financial stability and peace of mind."
  },
  {
    "topic": "Real Estate and Property",
    "slug": "Real-Estate-and-Property",
    "blurb": "Real Estate and Property services in ${city} provide expert assistance in buying, selling, and managing properties. From residential homes and apartments to commercial real estate and investment properties, real estate agents in ${city} offer comprehensive support to meet your property needs. With deep knowledge of the local market, they help clients make informed decisions and navigate the complexities of real estate transactions.\n\nIn addition to buying and selling, Real Estate and Property services in ${city} include property management, home inspections, and appraisal services. These professionals ensure that your investments are well-maintained and compliant with regulations. Whether you're a first-time homebuyer or an experienced investor, real estate services in ${city} offer the expertise and resources needed to achieve your property goals."
  },
  {
    "topic": "Technology and Electronics",
    "slug": "Technology-and-Electronics",
    "blurb": "Technology and Electronics services in ${city} provide cutting-edge solutions for all your tech needs. From computer repair and IT consulting to smart home installations and cybersecurity, the tech professionals in ${city} ensure that your devices and systems operate seamlessly. These services help residents stay connected, productive, and secure in an ever-evolving digital landscape.\n\nIn addition to technical support, Technology and Electronics stores in ${city} offer a wide range of products, including smartphones, laptops, and home entertainment systems. Knowledgeable staff can assist with product selection, setup, and troubleshooting, ensuring a hassle-free experience. By providing innovative tech solutions and quality products, technology services in ${city} enhance your digital lifestyle."
  },
  {
    "topic": "Fitness and Wellness",
    "slug": "Fitness-and-Wellness",
    "blurb": "Fitness and Wellness services in ${city} promote a healthy and active lifestyle through a variety of programs and facilities. From gyms and fitness centers to yoga studios and wellness retreats, residents in ${city} have access to top-notch resources to support their physical and mental well-being. These services cater to all fitness levels and goals, providing personalized training and group classes.\n\nIn addition to physical fitness, Wellness services in ${city} include nutritional counseling, massage therapy, and holistic health practices. These services focus on overall well-being, addressing both body and mind. Whether you're looking to lose weight, manage stress, or improve your overall health, fitness and wellness professionals in ${city} provide the guidance and support needed to achieve your wellness goals."
  },
  {
    "topic": "Beauty and Personal Care",
    "slug": "Beauty-and-Personal-Care",
    "blurb": "Beauty and Personal Care services in ${city} offer a wide range of treatments and products to enhance your appearance and well-being. From hair and nail salons to skincare clinics and spas, beauty professionals in ${city} provide personalized services to help you look and feel your best. These services cater to various beauty needs, ensuring a pampering and rejuvenating experience.\n\nIn addition to traditional beauty treatments, many Beauty and Personal Care businesses in ${city} offer advanced services such as cosmetic procedures, aromatherapy, and wellness therapies. Knowledgeable practitioners use high-quality products and techniques to deliver exceptional results. By providing expert care and indulgent treatments, beauty services in ${city} help boost your confidence and enhance your natural beauty."
  },
  {
    "topic": "Pets and Animal Services",
    "slug": "Pets-and-Animal-Services",
    "blurb": "Pets and Animal Services in ${city} offer comprehensive care and support for your beloved pets. From veterinary clinics and pet grooming to training and boarding facilities, these services ensure that your pets receive the best care possible. Residents of ${city} can rely on experienced professionals to keep their pets healthy, happy, and well-behaved.\n\nIn addition to medical and grooming services, Pets and Animal Services in ${city} also include pet adoption centers, pet supplies stores, and pet sitting services. These services cater to the diverse needs of pet owners, providing everything from daily essentials to specialized care. By offering reliable and compassionate services, pet care providers in ${city} contribute to the well-being of pets and their owners."
  },
  {
    "topic": "Events and Event Planning",
    "slug": "Events-and-Event-Planning",
    "blurb": "Events and Event Planning services in ${city} provide professional assistance to make your special occasions memorable and stress-free. From weddings and corporate events to birthday parties and community gatherings, event planners in ${city} handle every detail, ensuring a seamless and enjoyable experience for hosts and guests alike. These services include venue selection, catering, decor, entertainment, and logistics management.\n\nIn addition to planning, many Events and Event Planning services in ${city} offer rentals and supplies, such as tents, lighting, and audio-visual equipment. Whether you're hosting a large-scale event or an intimate gathering, event planners customize their services to meet your specific needs and preferences. By providing expert coordination and creative solutions, event planning services in ${city} help bring your vision to life."
  },
  {
    "topic": "Children and Family Services",
    "slug": "Children-and-Family-Services",
    "blurb": "Children and Family Services in ${city} offer support and resources to help families thrive. From daycare centers and educational programs to family counseling and pediatric healthcare, these services cater to the diverse needs of children and parents. Residents of ${city} can rely on professional caregivers and specialists to provide quality care and guidance for their families.\n\nIn addition to care and education, many Children and Family Services in ${city} offer recreational activities and family-oriented events. These services promote bonding, learning, and the overall well-being of families. By providing comprehensive support and enriching experiences, children and family services in ${city} contribute to a nurturing and supportive community for all."
  }
]




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
const updateTopicsWithBlurb = () => {
  return new Promise((resolve, reject) => {
    const updatePromises = topicBlurb.map(topic => {
      return new Promise((updateResolve, updateReject) => {
        db.run('UPDATE topics SET blurb = ? WHERE slug = ?', [topic.blurb, topic.slug], function(err) {
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
};

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
    db.run('ALTER TABLE topics ADD COLUMN blurb TEXT', (err) => {
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
    // await addPathColumn();
    await updateTopicsWithBlurb();
    // await updateTopicsWithPath();
    console.log('All topics updated with path.');
  } catch (error) {
    console.error('Error updating topics with path:', error);
  } finally {
    db.close();
  }
})();