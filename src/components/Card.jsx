import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, endpoint }) => {
  const { store, dispatch } = useGlobalReducer();  
  const [properties, setProperties] = useState(null);

  const category = endpoint === "people" ? "characters" : endpoint;
  const imageUrl = `https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`;
  const roboFallback = `https://robohash.org/${item.name.replace(/\s+/g, "")}.png?set=set2&size=400x250`;

  
  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${endpoint}/${item.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.result.properties) {
          setProperties(data.result.properties);
        }
      })
      .catch((err) => console.error(`Error en tarjeta ${item.name}:`, err));
  }, [endpoint, item.uid]);

  const toggleFavorite = () => {
    if (store.favorites.includes(item.name)) {
      dispatch({ type: "remove_favorite", payload: item.name });
    } else {
      dispatch({ type: "add_favorite", payload: item.name });
    }
  };

  return (
    <div className="card m-2 shadow-sm" style={{ minWidth: "18rem", maxWidth: "18rem", border: "1px solid #ddd" }}>
      <img
        src={imageUrl}
        className="card-img-top bg-dark"
        alt={item.name}
        style={{ height: "250px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = roboFallback; 
        }}
      />
      <div className="card-body d-flex flex-column bg-white">
        <h5 className="card-title text-start fw-bold">{item.name}</h5>
        
        <div className="card-text mb-4 text-start">
          
          {!properties ? (
            <p className="m-0 small text-muted">Cargando transmisión...</p>
          ) : (
            <>
              
              {endpoint === "people" && (
                <>
                  <p className="m-0 small text-muted"><strong>Gender:</strong> {properties.gender || "n/a"}</p>
                  <p className="m-0 small text-muted"><strong>Hair Color:</strong> {properties.hair_color || "n/a"}</p>
                  <p className="m-0 small text-muted"><strong>Eye Color:</strong> {properties.eye_color || "n/a"}</p>
                </>
              )}
              {endpoint === "planets" && (
                <>
                  <p className="m-0 small text-muted"><strong>Climate:</strong> {properties.climate || "n/a"}</p>
                  <p className="m-0 small text-muted"><strong>Population:</strong> {properties.population || "n/a"}</p>
                  <p className="m-0 small text-muted"><strong>Terrain:</strong> {properties.terrain || "n/a"}</p>
                </>
              )}
              {endpoint === "vehicles" && (
                <>
                  <p className="m-0 small text-muted"><strong>Model:</strong> {properties.model || "n/a"}</p>
                  <p className="m-0 small text-muted"><strong>Class:</strong> {properties.vehicle_class || "n/a"}</p>
                  <p className="m-0 small text-muted"><strong>Cost:</strong> {properties.cost_in_credits || "n/a"}</p>
                </>
              )}
            </>
          )}
        </div>

        <div className="d-flex justify-content-between mt-auto">
          
          <Link to={`/single/${endpoint}/${item.uid}`} className="btn btn-outline-primary px-3">
            Learn more!
          </Link>
          
          <button
            className={`btn ${
              store.favorites.includes(item.name)
                ? "btn-warning text-white"
                : "btn-outline-warning"
            }`}
            onClick={toggleFavorite}
          >
            <i className={`${store.favorites.includes(item.name) ? "fas" : "far"} fa-heart`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};