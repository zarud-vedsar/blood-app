import React, { useState, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDonar } from "../../../site-components/Donor/ContextApi/DonarContext";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
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
  const [loading , setLoading] = useState();
  const { donar, setDonar } = useDonar();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    if (!formData?.pincode) {
      console.log("Please pick valid location")
      return setLoading(false);
    }
    try {
      const bformData = new FormData();
      bformData.append("data", "setlocation");

      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));
      
      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      console.log(response)
      if (response?.data?.status === 200) {

        setDonar((prev)=>({...prev,...formData}));
        setTimeout(() => {
          navigate("/dashboard");
        }, 300);

      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log(error);
      const status = error.response?.data?.status;
      if (status === 400 || status === 500 || status === 401) {
        toast.error(error.response.data.msg || "A server error occurred.");
      } else {
        toast.error(
          "An error occurred. Please check your connection or try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <HeaderWithBack title={"Address"} />
      <div className="am-content">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <LocationSearch setFormData={setFormData}></LocationSearch>


              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-dark btn-block btn-lg"
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <span className="fontsize-normal"> Submit</span>
              )}
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
