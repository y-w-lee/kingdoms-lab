import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const country = state?.data;

  if (!country) {
    return <div>No country selected.</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Country Name */}
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
        {country.name.official}
      </h2>

      {/* Country Flag */}
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "200px", margin: "20px 0" }}
      />

      {/* Capital and Subregion */}
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Located in:</strong> {country.subregion || "N/A"}
      </p>
    </div>
  );
};

export default Details;
