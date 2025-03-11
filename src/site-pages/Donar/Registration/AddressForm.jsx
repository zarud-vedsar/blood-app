import React, { useState, useActionState, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDonar } from "../../../site-components/Donor/ContextApi/DonarContext";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const LocationSearch = ({ setFormData }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default: India
  const [searchDisabled, setSearchDisabled] = useState(false);

  const fetchLocationSuggestions = async (searchTerm) => {
    if (!searchTerm || searchDisabled) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}&countrycodes=IN`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleSelectLocation = async (lat, lon, displayName) => {
    setQuery(displayName);
    setSuggestions([]);
    setPosition([parseFloat(lat), parseFloat(lon)]);

    setSearchDisabled(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data.address) {
        const { state, county, city, postcode, suburb, village, road } =
          data.address;

        setFormData((prev) => ({
          ...prev,
          state: state || "N/A",
          city: city || suburb || village || "N/A",
          pincode: postcode || "N/A",
          address: data.display_name,
          latitude: lat,
          longitude: lon,
        }));
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        handleSelectLocation(e.latlng.lat, e.latlng.lng, "Selected Location");
      },
    });
    return (
      <Marker position={position}>
        <Popup>{query}</Popup>
      </Marker>
    );
  };

  const handleClearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setSearchDisabled(false);
  };

  return (
    <div>
      <div
        className="form-group basic "
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "0px",
          paddingBottom: "0px",
        }}
      >
        <label className="label">
          Search for a Location <span className="text-danger">*</span>{" "}
        </label>
        <input
          type="text"
          value={query}
          className="form-control"
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchDisabled(false); // Enable search when typing
            fetchLocationSuggestions(e.target.value);
          }}
          placeholder="Enter location"
        />
        {query && (
          <button
            onClick={handleClearSearch}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✖
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            width: "80%",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "white",
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1000,
            marginLeft: "35px",
          }}
        >
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() =>
                handleSelectLocation(place.lat, place.lon, place.display_name)
              }
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
      <MapContainer
        center={position}
        zoom={5}
        style={{ height: "200px", width: "100%", marginTop: "20px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

const AddressForm = () => {
  const [formData, setFormData] = useState({
    state: null,
    city: null,
    pincode: null,
    address: null,
    latitude: null,
    longitude: null,
  });

  useEffect(() => console.log(formData), [formData]);
  const navigate = useNavigate();
  const { donar, setDonar } = useDonar();
  console.log(donar);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [state, formAction] = useActionState(async (prevState, formData) => {},
  {});

  return (
    <>
      <HeaderWithBack title={"Address"} />
      <div className="am-content">
        <form>
          <div className="card">
            <div className="card-body">
              <LocationSearch setFormData={setFormData}></LocationSearch>

              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-dark btn-block btn-lg">
                  <span className="fontsize-normal" disabled={state.pending}>
                    Submit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .leaflet-touch .leaflet-control-layers,
        .leaflet-touch .leaflet-bar {
          margin: 0px;
        }
      `}</style>
    </>
  );
};

export default AddressForm;
