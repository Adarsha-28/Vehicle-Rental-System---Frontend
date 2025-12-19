import "../Styles/About.css";

const About = () => {
  return (
    <div className="aboutPage">
      <center> <h1>About QuickRent</h1></center>

      <p className="intro">
        QuickRent is a vehicle rental application designed to make booking
        vehicles easy, fast, and reliable for everyday users.
      </p>

      <section className="aboutSection">
        <h2>🚗 What is QuickRent?</h2>
        <p>
          QuickRent allows customers to browse a wide range of vehicles including
          cars, bikes, and vans, compare rental prices, and book their preferred
          vehicle with just a few clicks.
        </p>
      </section>

      <section className="aboutSection">
        <h2>⭐ Why Choose QuickRent?</h2>
        <ul>
          <li>Simple and easy-to-use interface</li>
          <li>Wide variety of vehicles</li>
          <li>Clear pricing with no hidden charges</li>
          <li>Instant booking confirmation</li>
          <li>Suitable for short trips and long journeys</li>
        </ul>
      </section>

      <section className="aboutSection">
        <h2>🎯 Our Goal</h2>
        <p>
          Our goal is to provide a smooth and hassle-free vehicle rental
          experience by offering reliable vehicles, affordable pricing, and
          quick booking options for all customers.
        </p>
      </section>
      <footer>&copy; 2025 QuickRent. All rights reserved.</footer>
    </div>
  );
};

export default About;
