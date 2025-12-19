import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/Booking.css";

const Booking = () => {
  const { bid } = useParams();
  const { data: vehicleData, setNewBooking } = useOutletContext(); // get vehicle data + setter
  const navigate = useNavigate();

  const vehicle = vehicleData.find((v) => v.vehicleId === bid);

  const [customerName, setCustomerName] = useState(localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");

  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(1);
  const [members, setMembers] = useState(1);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  if (!vehicle) return <h2>Vehicle not found</h2>;

  const confirmBooking = async () => {
    if (!customerName || !email || !contact || !startDate || !location) {
      alert("Please fill all required fields");
      return;
    }

    const bookingData = {
      userName: customerName,
      userEmail: email,
      contactNumber: contact,
      vehicleId: vehicle.vehicleId,
      brand: vehicle.brand,
      model: vehicle.model,
      type: vehicle.type,
      rentPerDay: vehicle.rentPerDay,
      startDate,
      days,
      members,
      location,
      notes,
      totalPrice: days * vehicle.rentPerDay,
      image: vehicle.image
    };

    try {
      const response = await fetch("http://localhost:9000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      // Update App state to display immediately
      setNewBooking(result.data.booking);

      alert("Booking Successful!");
      navigate("/bookinghistory");
    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="bookingPage">
      <h2>Booking Details</h2>

      <img src={vehicle.image} alt={vehicle.model} />
      <h3>{vehicle.brand} {vehicle.model}</h3>
      <p className="price">₹{vehicle.rentPerDay}/day</p>

      <label>Name *</label>
      <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter your name" />

      <label>Email *</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

      <label>Contact Number *</label>
      <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter mobile number" />

      <label>Travel Start Date *</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>Number of Days</label>
      <input type="number" min="1" value={days} onChange={(e) => setDays(Number(e.target.value))} />

      <label>Number of Members</label>
      <input type="number" min="1" value={members} onChange={(e) => setMembers(Number(e.target.value))} />

      <label>Pickup Location *</label>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">-- Select Location --</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Kochi">Kochi</option>
      </select>

      <label>Additional Notes</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

      <h3>Total: ₹{days * vehicle.rentPerDay}</h3>
      <button onClick={confirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default Booking;
