// components/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating form submission with a timeout
    setTimeout(() => {
      // Clear form fields
      setName('');
      setEmail('');
      setMessage('');
      // Display success message
      setIsSubmitted(true);
    }, 1000); // Adjust timeout as needed

    // Reset success message after some time (optional)
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000); // Clear success message after 5 seconds
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, please feel free to reach out to us.</p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="success-message">
          <p>Your message was successfully submitted!</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
