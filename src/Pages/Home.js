import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./../Styles/Home.css";
import VehicleCard from "../Components/VehicleCard";

const Home = () => {
  const { data } = useOutletContext();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredVehicles = data.filter(
    (v) =>
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <section className="hero">
        <h1>QuickRent Rental Service</h1>
        <p>Fast • Affordable • Reliable Vehicle Rentals</p>
        <button onClick={() => navigate("/vehiclelisting")}>
          Browse Vehicles
        </button>
      </section>

      <input
        className="search"
        type="text"
        placeholder="🔎 Search a vehicle"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <section className="offers">
        <h2>🔥 Special Offers</h2>
        <div className="offerCards">
          <div className="offer">💸 20% OFF on first booking</div>
          <div className="offer">🛵 Weekend Bike Rentals @ ₹499</div>
          <div className="offer">🚗 3 Days + 1 Day Free</div>
        </div>
      </section>

      <h2>Top Vehicles</h2>
      <div className="cardContainer">
        {filteredVehicles.slice(0, 4).map((item) => (
          <VehicleCard key={item.vehicleId} item={item} />
        ))}
      </div>

      <section className="whyUs">
        <h2>Why Choose QuickRent?</h2>

        <ul className="whyGrid">
          <li>✅ Verified Vehicles</li>
          <li>⚡ Instant Booking</li>
          <li>💰 Affordable Pricing</li>
          <li>📞 24/7 Support</li>
        </ul>
      </section>

      <footer>&copy; 2025 QuickRent. All rights reserved.</footer>
    </div>
  );
};

export default Home;
