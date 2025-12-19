import { Link } from "react-router-dom";
import "../Styles/VehicleCard.css";

const VehicleCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="card">
      <div className="imageWrapper">
        <img src={item.image} alt={item.model} />
      </div>

      <h3>
        {item.brand} {item.model}
      </h3>

      <p>
        {item.category} • {item.type}
      </p>

      {item.seatingCapacity && <p>Seats: {item.seatingCapacity}</p>}

      {item.engineCC && <p>Engine: {item.engineCC} CC</p>}

      <p className="price">₹{item.rentPerDay}/day</p>

      <p className="rating">⭐ {item.rating}</p>

      <Link to={`/booking/${item.vehicleId}`}>
        <button disabled={!item.availability}>
          {item.availability ? "Book Now" : "Unavailable"}
        </button>
      </Link>
    </div>
  );
};

export default VehicleCard;
