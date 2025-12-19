import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../Styles/BookingHistory.css";

const BookingHistory = () => {
  const { newBooking } = useOutletContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null); // selected booking for popup

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("https://vehicle-rental-system-backend-qtkj.onrender.com/api/bookings");
        const result = await response.json();
        setBookings(Array.isArray(result.data.bookings) ? result.data.bookings : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Add new booking immediately
  useEffect(() => {
    if (newBooking) setBookings(prev => [newBooking, ...prev]);
  }, [newBooking]);

  // Cancel booking
  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`http://localhost:9000/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete booking");
      setBookings(prev => prev.filter(b => b._id !== id));
      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  // Handle save in popup
  const saveEdit = async (updatedData) => {
    try {
      const res = await fetch(`http://localhost:9000/api/bookings/${editingBooking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }
      setBookings(prev => prev.map(b => (b._id === editingBooking._id ? result.data.booking : b)));
      setEditingBooking(null);
      alert("Booking updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update booking");
    }
  };

  if (loading) return <h3>Loading bookings...</h3>;

  return (
    <div className="booking-history-page">
      <h2>Your Booking History</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <img src={b.image} alt={`${b.brand} ${b.model}`} className="booking-image" />
            <div className="booking-info">
              <h3>{b.brand} {b.model}</h3>
              <p><b>Name:</b> {b.userName}</p>
              <p><b>Email:</b> {b.userEmail}</p>
              <p><b>Contact:</b> {b.contactNumber}</p>
              <p><b>Pickup Location:</b> {b.location}</p>
              <p><b>Start Date:</b> {b.startDate}</p>
              <p><b>Days:</b> {b.days}</p>
              <p><b>Total:</b> ₹{b.totalPrice}</p>
              <p><b>Booked On:</b> {new Date(b.bookedAt).toLocaleString()}</p>
              <div className="booking-buttons">
                <button className="edit-btn" onClick={() => setEditingBooking(b)}>Edit</button>
                <button className="cancel-btn" onClick={() => cancelBooking(b._id)}>Cancel</button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Edit Booking Popup */}
      {editingBooking && (
        <div className="edit-popup">
          <div className="edit-content">
            <h2>Edit Booking</h2>
            <label>Name *</label>
            <input
              type="text"
              value={editingBooking.userName}
              onChange={e => setEditingBooking({...editingBooking, userName: e.target.value})}
            />

            <label>Email *</label>
            <input
              type="email"
              value={editingBooking.userEmail}
              onChange={e => setEditingBooking({...editingBooking, userEmail: e.target.value})}
            />

            <label>Contact Number *</label>
            <input
              type="tel"
              value={editingBooking.contactNumber}
              onChange={e => setEditingBooking({...editingBooking, contactNumber: e.target.value})}
            />

            <label>Pickup Location *</label>
            <select
              value={editingBooking.location}
              onChange={e => setEditingBooking({...editingBooking, location: e.target.value})}
            >
              <option value="">-- Select Location --</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kochi">Kochi</option>
            </select>

            <label>Number of Days</label>
            <input
              type="number"
              min="1"
              value={editingBooking.days}
              onChange={e => setEditingBooking({...editingBooking, days: Number(e.target.value)})}
            />

            <label>Additional Notes</label>
            <textarea
              value={editingBooking.notes}
              onChange={e => setEditingBooking({...editingBooking, notes: e.target.value})}
            />

            <div className="popup-buttons">
              <button className="save-btn" onClick={() => saveEdit(editingBooking)}>Save</button>
              <button className="cancel-btn" onClick={() => setEditingBooking(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
