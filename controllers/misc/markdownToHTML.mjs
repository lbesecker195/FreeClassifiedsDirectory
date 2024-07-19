import { marked } from 'marked';


// Function to convert Markdown to HTML
const convertMarkdownToHtml = (markdown) => {
  return marked(markdown);
};

// Example usage
const markdownContent = `
## Benefits of Using FreeClassifiedsDirectory.com

### For Users
- **Convenience:** Find multiple services and job opportunities in one place.
- **Up-to-Date Information:** Stay informed with the latest listings and opportunities.
- **Personalized Experience:** Get recommendations tailored to your needs and preferences.

### For Businesses
- **Enhanced Exposure:** Reach a wide audience actively searching for services.
- **Easy Management:** List and manage your services effortlessly.
- **Job Postings:** Post job openings to attract potential employees quickly.

_Real-Life Example: A local bakery increased its customer base by 150% in six months by listing on our platform._

---

## FAQs

**Search and Listings**

- **How do I search for a service?**
  Use the search bar at the top of the homepage or explore our categories to find the services you need.

- **How do I list my business or service?**
  Sign up for an account, navigate to the "List Your Service" section, and follow the prompts to add your listing.

**Account and Personalization**

- **What are the benefits of creating an account?**
  Creating an account provides personalized recommendations, allows you to save your searches, and manage your listings more efficiently.

- **How do I reset my password?**
  Click on the "Forgot Password" link on the login page and follow the instructions to reset your password.

**Jobs and Applications**

- **How do I apply for a job?**
  Browse the job listings in the category of your choice and follow the application instructions provided in the job posting.

- **Can businesses post job openings?**
  Yes, businesses can post job openings. Simply create an account and navigate to the "Post a Job" section to get started.

---

## Conclusion

Thank you for choosing FreeClassifiedsDirectory.com. We're dedicated to being your trusted resource for finding services and job opportunities. Start exploring today and make the most out of what we have to offer.
`;

const htmlContent = convertMarkdownToHtml(markdownContent);
console.log(htmlContent);