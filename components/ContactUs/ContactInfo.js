import React from 'react'

const ContactInfo = () => {
  return (
    <>
      <div className="contact-info">
        <span className="sub-title">Contact Details</span>
        <h2>Get in Touch</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra.
        </p>

        <ul>
          <li>
            <div className="icon">
              <i className="bx bx-map"></i>
            </div>
            <h3>Our Address</h3>
            <p>2750 Quadra Street Victoria Road, New York, Canada</p>
          </li>
          <li>
            <div className="icon">
              <i className="bx bx-phone-call"></i>
            </div>
            <h3>Contact</h3>
            <p>
              Mobile: <a href="tel:+44457895789">(+44) - 45789 - 5789</a>
            </p>
            <p>
              Mail: <a href="mailto:hello@Anova.com">hello@Anova.com</a>
            </p>
          </li>
          <li>
            <div className="icon">
              <i className="bx bx-time-five"></i>
            </div>
            <h3>Hours of Operation</h3>
            <p>Monday - Friday: 09:00 - 20:00</p>
            <p>Sunday & Saturday: 10:30 - 22:00</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ContactInfo
