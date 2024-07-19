const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.db')

var topics = [
  {
    "topic": "Business and Professional Services",
    "subTopics": [
      "Accounting and Bookkeeping",
      "Marketing and Advertising",
      "Management Consulting",
      "Human Resources",
      "Translation Services",
      "Business Coaching",
      "Office Supplies",
      "Virtual Assistant Services",
      "Office Space Rentals",
      "Secretarial Services"
    ]
  },
  {
    "topic": "Education and Training",
    "subTopics": [
      "Tutoring Services",
      "Online Courses",
      "Vocational Training",
      "Language Learning",
      "Test Preparation",
      "Corporate Training",
      "Special Education",
      "Art and Music Schools",
      "Continuing Education",
      "Professional Certification"
    ]
  },
  {
    "topic": "Healthcare and Medical Services",
    "subTopics": [
      "General Practitioners",
      "Dental Services",
      "Mental Health Services",
      "Physiotherapy",
      "Alternative Medicine",
      "Medical Labs",
      "Eye Care Services",
      "Nutritional Counseling",
      "Hospices",
      "Medical Clinics"
    ]
  },
  {
    "topic": "Restaurants and Dining",
    "subTopics": [
      "Fast Food",
      "Fine Dining",
      "Cafes and Coffee Shops",
      "Bakeries",
      "Food Delivery Services",
      "Catering Services",
      "Food Trucks",
      "Ethnic Restaurants",
      "Seafood Restaurants",
      "Vegan and Vegetarian"
    ]
  },
  {
    "topic": "Entertainment and Recreation",
    "subTopics": [
      "Movie Theaters",
      "Sports Facilities",
      "Amusement Parks",
      "Museums and Galleries",
      "Music Venues",
      "Nightclubs",
      "Bowling Alleys",
      "Arcades",
      "Outdoor Adventure Parks",
      "Theaters and Plays"
    ]
  },
  {
    "topic": "Shopping and Retail",
    "subTopics": [
      "Department Stores",
      "Grocery Stores",
      "Clothing and Apparel",
      "Electronics and Gadgets",
      "Bookstores",
      "Home and Garden Stores",
      "Toy Stores",
      "Jewelry Shops",
      "Specialty Boutiques",
      "Online Retailers"
    ]
  },
  {
    "topic": "Travel and Tourism",
    "subTopics": [
      "Hotels and Resorts",
      "Travel Agencies",
      "Tourist Attractions",
      "Tour Operators",
      "Car Rentals",
      "Cruise Lines",
      "Vacation Rentals",
      "Travel Insurance",
      "Guide Services",
      "Cultural Sites"
    ]
  },
  {
    "topic": "Automotive Services",
    "subTopics": [
      "Car Dealerships",
      "Auto Repair Shops",
      "Car Washes",
      "Towing Services",
      "Auto Parts Stores",
      "Vehicle Inspections",
      "Motorcycle Services",
      "Auto Upholstery",
      "Tire Services",
      "Detailing Services"
    ]
  },
  {
    "topic": "Home Improvement and Repair",
    "subTopics": [
      "Plumbing Services",
      "Electricians",
      "Roofing Services",
      "Flooring Contractors",
      "Painters",
      "Handyman Services",
      "HVAC Services",
      "Kitchen Remodeling",
      "Bathroom Renovations",
      "Window Installers"
    ]
  },
  {
    "topic": "Legal Services",
    "subTopics": [
      "Divorce Lawyers",
      "Real Estate Attorneys",
      "Personal Injury Attorneys",
      "Criminal Defense",
      "Immigration Lawyers",
      "Corporate Lawyers",
      "Patent and Trademark Attorneys",
      "Estate Planning",
      "Family Law",
      "Legal Aid Services"
    ]
  },
  {
    "topic": "Finance and Insurance",
    "subTopics": [
      "Banks and Credit Unions",
      "Financial Planning",
      "Mortgage Brokers",
      "Tax Services",
      "Investment Services",
      "Insurance Agencies",
      "Credit Counseling",
      "Personal Loans",
      "Debt Management",
      "Accounting Firms"
    ]
  },
  {
    "topic": "Real Estate and Property",
    "subTopics": [
      "Residential Real Estate",
      "Commercial Real Estate",
      "Property Management",
      "Real Estate Agents",
      "Moving Services",
      "Home Inspectors",
      "Real Estate Appraisers",
      "Real Estate Investment",
      "Mortgage Services",
      "Title Companies"
    ]
  },
  {
    "topic": "Technology and Electronics",
    "subTopics": [
      "Computer Repair",
      "Smartphone Services",
      "IT Consulting",
      "Software Development",
      "Networking Services",
      "Tech Support",
      "Home Automation",
      "Electronic Stores",
      "App Developers",
      "Cybersecurity Services"
    ]
  },
  {
    "topic": "Fitness and Wellness",
    "subTopics": [
      "Gyms and Fitness Centers",
      "Yoga Studios",
      "Personal Trainers",
      "Nutritional Consultants",
      "Weight Loss Centers",
      "Wellness Retreats",
      "Physical Therapists",
      "Massage Therapists",
      "Spa Services",
      "Athletic Clubs"
    ]
  },
  {
    "topic": "Beauty and Personal Care",
    "subTopics": [
      "Hair Salons",
      "Nail Salons",
      "Skincare Clinics",
      "Makeup Artists",
      "Barber Shops",
      "Cosmetic Surgeons",
      "Tattoo and Piercing Studios",
      "Beauty Products Stores",
      "Day Spas",
      "Aromatherapy"
    ]
  },
  {
    "topic": "Pets and Animal Services",
    "subTopics": [
      "Veterinary Clinics",
      "Pet Grooming",
      "Pet Boarding",
      "Pet Training",
      "Pet Adoption Centers",
      "Pet Supplies Stores",
      "Animal Hospitals",
      "Pet Sitting Services",
      "Dog Walkers",
      "Pet Insurance"
    ]
  },
  {
    "topic": "Events and Event Planning",
    "subTopics": [
      "Wedding Planners",
      "Event Venues",
      "Party Supplies",
      "Catering Services",
      "DJ Services",
      "Photographers",
      "Event Rentals",
      "Florists",
      "Event Coordinators",
      "Lighting and Sound"
    ]
  },
  {
    "topic": "Children and Family Services",
    "subTopics": [
      "Daycare Centers",
      "Children's Activities",
      "Family Counseling",
      "Pediatricians",
      "Child Fashion",
      "Birthday Party Services",
      "Family Restaurants",
      "Parenting Classes",
      "Toy Stores",
      "Summer Camps"
    ]
  },
  {
    "topic": "Non-Profit Organizations",
    "subTopics": [
      "Charitable Organizations",
      "Foundations",
      "Community Service",
      "Environmental Groups",
      "Advocacy Organizations",
      "Grantmaking Organizations",
      "Animal Welfare Organizations",
      "Health Charities",
      "Educational Non-Profits",
      "Religious Organizations"
    ]
  },
  {
    "topic": "Community and Government Services",
    "subTopics": [
      "Social Services",
      "Libraries",
      "Community Centers",
      "Police Services",
      "Fire Departments",
      "Public Parks",
      "Waste Management",
      "Public Transportation",
      "City Halls",
      "Public Housing"
    ]
  },
  {
    "topic": "Employment and Staffing Services",
    "subTopics": [
      "Job Agencies",
      "Temporary Staffing",
      "Executive Search Firms",
      "Resume Writing Services",
      "Career Counseling",
      "Employee Training",
      "Part-Time Job Listings",
      "Talent Acquisition",
      "Job Fairs",
      "Internships"
    ]
  },
  {
    "topic": "Media and Communication",
    "subTopics": [
      "Public Relations Firms",
      "Advertising Agencies",
      "Printing Services",
      "Broadcasting Networks",
      "Social Media Managers",
      "Publishing Houses",
      "Graphic Design",
      "Video Production",
      "Copywriters",
      "Web Content Creators"
    ]
  },
  {
    "topic": "Transport and Logistics",
    "subTopics": [
      "Freight Services",
      "Courier Services",
      "Taxi Services",
      "Limousine Services",
      "Moving and Storage",
      "Shipping Companies",
      "Logistics Planning",
      "Warehousing",
      "Air Transport",
      "Public Transport"
    ]
  },
  {
    "topic": "Agriculture and Farming",
    "subTopics": [
      "Crop Cultivation",
      "Livestock Farming",
      "Agricultural Equipment",
      "Farming Supplies",
      "Organic Farming",
      "Fisheries",
      "Agritourism",
      "Forestry Services",
      "Hydroponics",
      "Farm Labor Services"
    ]
  },
  {
    "topic": "Environmental Services",
    "subTopics": [
      "Recycling Centers",
      "Environmental Consulting",
      "Waste Management",
      "Renewable Energy",
      "Water Treatment",
      "Environmental Advocacy",
      "Green Building Services",
      "Conservation Services",
      "Pollution Control",
      "Environmental Testing"
    ]
  },
  {
    "topic": "Arts and Culture",
    "subTopics": [
      "Art Galleries",
      "Museums",
      "Theater Companies",
      "Dance Studios",
      "Music Schools",
      "Cultural Festivals",
      "Historical Sites",
      "Artist Communities",
      "Literary Societies",
      "Film Societies"
    ]
  },
  {
    "topic": "Food and Beverage",
    "subTopics": [
      "Grocery Stores",
      "Wine Shops",
      "Specialty Food Stores",
      "Farmers Markets",
      "Organic Food Stores",
      "Butcher Shops",
      "Seafood Markets",
      "Bakery Supply Stores",
      "Beverage Distributors",
      "Food Trucks"
    ]
  },
  {
    "topic": "Fashion and Apparel",
    "subTopics": [
      "Clothing Stores",
      "Shoe Stores",
      "Accessories Boutiques",
      "Tailoring Services",
      "Fashion Designers",
      "Bridal Shops",
      "Vintage Stores",
      "Lingerie Stores",
      "Workwear Shops",
      "Sportswear Stores"
    ]
  },
  {
    "topic": "Hobbies and Crafts",
    "subTopics": [
      "Craft Supply Stores",
      "Art Supply Stores",
      "Hobby Shops",
      "Model Building Supplies",
      "Pottery Studios",
      "Sewing and Knitting Shops",
      "Scrapbooking Stores",
      "Woodworking Supplies",
      "Bead Stores",
      "Candle Making Supplies"
    ]
  },
  {
    "topic": "Sports and Fitness",
    "subTopics": [
      "Sports Clubs",
      "Gyms and Fitness Centers",
      "Dance Studios",
      "Martial Arts Schools",
      "Sports Equipment Stores",
      "Outdoor Adventure Clubs",
      "Personal Trainers",
      "Running Clubs",
      "Yoga Studios",
      "Swimming Pools"
    ]
  },
  {
    "topic": "Spiritual and Religious Organizations",
    "subTopics": [
      "Churches",
      "Temples",
      "Mosques",
      "Synagogues",
      "Retreat Centers",
      "Faith-Based Nonprofits",
      "Religious Bookstores",
      "Spiritual Counseling",
      "Meditation Centers",
      "Religious Education Centers"
    ]
  },
  {
    "topic": "Senior Services",
    "subTopics": [
      "Assisted Living",
      "Retirement Communities",
      "Home Care Services",
      "Elder Law Attorneys",
      "Geriatric Care Managers",
      "Senior Transportation",
      "Adult Day Care",
      "Senior Fitness Programs",
      "Meals on Wheels",
      "Social Activities Programs"
    ]
  },
  {
    "topic": "Educational Institutions",
    "subTopics": [
      "Elementary Schools",
      "Secondary Schools",
      "Colleges and Universities",
      "Technical Schools",
      "Private Schools",
      "Online Schools",
      "Language Schools",
      "Music Schools",
      "Art and Design Schools",
      "Special Education Schools"
    ]
  },
  {
    "topic": "Professional Associations",
    "subTopics": [
      "Trade Associations",
      "Business Associations",
      "Professional Societies",
      "Industry Groups",
      "Alumni Associations",
      "Labor Unions",
      "Chambers of Commerce",
      "Networking Groups",
      "Certification Bodies",
      "Advocacy Groups"
    ]
  },
  {
    "topic": "Construction and Contractors",
    "subTopics": [
      "General Contractors",
      "Building Construction",
      "Concrete Contractors",
      "Masonry Services",
      "Carpentry Services",
      "Excavation Services",
      "Roofing Contractors",
      "Siding Contractors",
      "Home Builders",
      "Pool Construction"
    ]
  },
  {
    "topic": "Maintenance Services",
    "subTopics": [
      "Janitorial Services",
      "Landscaping Services",
      "Lawn Care Services",
      "Pest Control",
      "HVAC Maintenance",
      "Window Cleaning",
      "Pressure Washing",
      "Pool Maintenance",
      "Appliance Repair",
      "Locksmith Services"
    ]
  },
  {
    "topic": "Medical Equipment and Supplies",
    "subTopics": [
      "Diagnostic Equipment",
      "Surgical Instruments",
      "Mobility Aids",
      "Medical Consumables",
      "Hospital Furniture",
      "Rehabilitation Equipment",
      "Home Healthcare Supplies",
      "Medical Apparel",
      "Dentistry Supplies",
      "Diagnostic Labs"
    ]
  },
  {
    "topic": "Industrial Services",
    "subTopics": [
      "Manufacturing Services",
      "Metal Fabrication",
      "Industrial Cleaning",
      "Machine Shops",
      "Welding Services",
      "Industrial Supplies",
      "Industrial Equipment Rentals",
      "Calibration Services",
      "Plant Maintenance",
      "Industrial Automation"
    ]
  },
  {
    "topic": "Advertising and Marketing",
    "subTopics": [
      "Digital Marketing",
      "SEO Services",
      "Social Media Marketing",
      "Content Marketing",
      "Branding Services",
      "Media Buying",
      "Public Relations",
      "Email Marketing",
      "Market Research",
      "Advertising Agencies"
    ]
  },
  {
    "topic": "Web Design and Development",
    "subTopics": [
      "Web Designers",
      "Web Developers",
      "UX/UI Designers",
      "E-commerce Development",
      "WordPress Developers",
      "Graphic Designers",
      "SEO Services",
      "Web Hosting",
      "Mobile App Development",
      "Web Maintenance"
    ]
  },
  {
    "topic": "Consulting Services",
    "subTopics": [
      "Management Consulting",
      "IT Consulting",
      "Financial Consulting",
      "HR Consulting",
      "Environmental Consulting",
      "Marketing Consulting",
      "Legal Consulting",
      "Healthcare Consulting",
      "Operations Consulting",
      "Business Strategy Consulting"
    ]
  },
  {
    "topic": "Rental Services",
    "subTopics": [
      "Car Rentals",
      "Equipment Rentals",
      "Party Supplies Rentals",
      "Furniture Rentals",
      "Real Estate Rentals",
      "Vacation Rentals",
      "Tool Rentals",
      "Costume Rentals",
      "Storage Unit Rentals",
      "Bicycle Rentals"
    ]
  },
  {
    "topic": "Energy and Utilities",
    "subTopics": [
      "Electric Companies",
      "Gas Companies",
      "Water Companies",
      "Renewable Energy Providers",
      "Energy Consulting",
      "Solar Energy Services",
      "Energy Efficiency Services",
      "Utility Billing Services",
      "Waste Water Treatment",
      "Utility Installation Services"
    ]
  },
  {
    "topic": "Manufacturing and Production",
    "subTopics": [
      "Food Manufacturing",
      "Textile Manufacturing",
      "Chemical Manufacturing",
      "Electronics Manufacturing",
      "Automotive Manufacturing",
      "Packaging Manufacturing",
      "Metal Fabrication",
      "Pharmaceuticals Manufacturing",
      "Plastic Manufacturing",
      "Machinery Manufacturing"
    ]
  },
  {
    "topic": "Security Services",
    "subTopics": [
      "Private Security Firms",
      "Alarm Services",
      "CCTV Installation",
      "Cybersecurity Services",
      "Event Security",
      "Security Consultants",
      "Locksmith Services",
      "Security Guard Services",
      "Home Security",
      "Surveillance Services"
    ]
  },
  {
    "topic": "Cleaning Services",
    "subTopics": [
      "Residential Cleaning",
      "Commercial Cleaning",
      "Carpet Cleaners",
      "Window Cleaners",
      "Pressure Washing",
      "Janitorial Services",
      "Laundry Services",
      "Gutter Cleaning",
      "Maid Services",
      "Industrial Cleaning"
    ]
  },
  {
    "topic": "Courier and Delivery Services",
    "subTopics": [
      "Same-Day Delivery",
      "International Shipping",
      "Package Tracking",
      "Freight Services",
      "Postal Services",
      "Food Delivery Services",
      "Medical Delivery Services",
      "Document Couriers",
      "Express Delivery",
      "Bicycle Couriers"
    ]
  },
  {
    "topic": "Photography and Videography",
    "subTopics": [
      "Wedding Photographers",
      "Event Videographers",
      "Product Photography",
      "Portrait Photographers",
      "Aerial Photography",
      "Real Estate Photography",
      "Videography for Events",
      "Photo Booth Rentals",
      "Fashion Photography",
      "Corporate Videography"
    ]
  },
  {
    "topic": "Gardening and Landscaping",
    "subTopics": [
      "Landscaping Design",
      "Lawn Maintenance",
      "Garden Centers",
      "Arborist Services",
      "Irrigation Services",
      "Hardscaping Services",
      "Tree Removal",
      "Garden Decor",
      "Landscaping Materials",
      "Greenhouses"
    ]
  },
  {
    "topic": "Libraries and Archives",
    "subTopics": [
      "Public Libraries",
      "University Libraries",
      "Digital Archives",
      "Historical Archives",
      "Special Collections",
      "Research Libraries",
      "School Libraries",
      "Local History Archives",
      "Law Libraries",
      "Document Preservation"
    ]
  }
]

db.serialize(() => {
	db.run('DROP TABLE topics;');
	// db.run('CREATE TABLE IF NOT EXISTS topics (keyword TEXT, slug TEXT, parentSlug TEXT, title TEXT, description TEXT)');
	db.run('CREATE TABLE IF NOT EXISTS topics (slug TEXT, parentSlug TEXT, title TEXT, description TEXT)');
})


// const createKeyword = (title) => {
// 	return `${title} Directory 2024`
// }

// Function to create a URL-friendly slug from a topic title
const createSlug = (title) => {
	return title.replace(/ /g, '-'); // Replace spaces with hyphens
};

// 
const createTitle = (title) => {
	return `${title} Directory and Jobs 2024`
}

const createDescription = (title) => {
	return `Explore our ${title} Directory 2024 for ${title.toLowerCase()} business classifieds, expert connections, job listings, ${title.toLowerCase()} news 2024, ${title.toLowerCase()} articles, and ${title.toLowerCase()} service promotions. Your essential hub for all things ${title}.`
}

// Function to insert topics and subtopics into the database
const insertTopics = (db, topic, parentSlug = null) => {
  return new Promise((resolve, reject) => {
    const topicSlug = createSlug(topic.topic); 
    const topicTitle = createTitle(topic.topic);
    const topicDescription = createDescription(topic.topic);

    db.run(
      'INSERT INTO topics (slug, parentSlug, title, description) VALUES (?, ?, ?, ?)',
      [topicSlug, parentSlug, topicTitle, topicDescription], // Insert topic with no description
      function(err) {
        if (err) {
          reject(err);
        } else {
          if (topic.subTopics && topic.subTopics.length > 0) {
            // Insert subtopics
            Promise.all(topic.subTopics.map(subTopic => {
              const subTopicObj = {
                "topic": subTopic,
                "subTopics": []
              };
              return insertTopics(db, subTopicObj, topicSlug);
            }))
              .then(() => resolve())
              .catch(reject);
          } else {
            resolve();
          }
        }
      }
    );
  });
};

// Insert data
db.serialize(() => {
    // Insert the main topics
    Promise.all(topics.map(topic => insertTopics(db, topic)))
	.then(() => {
		console.log('All topics and subtopics inserted successfully');

		db.each('SELECT * FROM topics', (err, row) => {
			if (err) {
				console.error('Error fetching data:', err.message);
			} else {
				console.log(row);
			}
		});

		db.close()
	})
	.catch((err) => {
		console.error('Error inserting data:', err.message);
	});
});

