import "../Styles/Contact.css";

const Contact = () => {
  return (
    <div className="contactPage">
      <h2>Contact Us</h2>
      <p className="subtitle">
        Have questions or need help? Reach out to QuickRent.
      </p>

      <div className="contactContainer">
        <div className="contactInfo">
          <h3>Get in Touch</h3>
          <p>📍 Coimbatore, Tamil Nadu</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ support@quickrent.com</p>
        </div>

        <div className="contactForm">
          <h3>Send a Message</h3>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
