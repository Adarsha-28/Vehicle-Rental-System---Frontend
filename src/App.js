import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);       // Vehicle details
  const [newBooking, setNewBooking] = useState(null); // Newly added booking

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch("/VehicleDetails.json");
        const v = await response.json();
        setData(v);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicleDetails();
  }, []);

  return (
    <div className="App">
      <Header />
      <Outlet context={{ data, newBooking, setNewBooking }} />
    </div>
  );
}

export default App;
