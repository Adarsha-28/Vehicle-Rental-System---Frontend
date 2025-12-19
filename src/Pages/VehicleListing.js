import { useOutletContext, Link } from "react-router-dom";
import "../Styles/VehicleListing.css";

const VehicleListing = () => {
  const { data } = useOutletContext();

  return (
    <div className="page grid">
      {data.map(v => (
        <div key={v.vehicleId} className="card">
          <img src={v.image} alt={v.model} />

          <h3>{v.brand} {v.model}</h3>

          <p>{v.category} • {v.type}</p>

          <p>⭐ {v.rating}</p>

          <p className="price">₹{v.rentPerDay}/day</p>

          <Link to={`/booking/${v.vehicleId}`}>
            <button disabled={!v.availability}>
              {v.availability ? "Book Now" : "Unavailable"}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VehicleListing;
