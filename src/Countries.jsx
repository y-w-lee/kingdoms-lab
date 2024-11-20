import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/name/kingdom");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Handle dropdown selection
  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(
      (country) => country.cca2 === e.target.value
    );
    if (selectedCountry) {
      navigate(`/countries/${selectedCountry.cca2}`, { state: { data: selectedCountry } });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>World Kingdoms</h1>
      {/* <label htmlFor="countries-dropdown">Select a country:</label> */}
      <select id="countries-dropdown" onChange={handleCountryChange}>
        <option value="">Select a Country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      {/* Render child route content */}
      <Outlet />
    </div>
  );
};

export default Countries;
