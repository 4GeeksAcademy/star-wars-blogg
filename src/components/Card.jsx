import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, endpoint }) => {
  const { store, dispatch } = useGlobalReducer();

  // 1. Mapeo de categorías para Visual Guide
  const category = endpoint === "people" ? "characters" : endpoint;
  
  // 2. URL principal (Intentando la oficial o el mirror de GitHub)
  const imageUrl = `https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`;

  // 3. URL de Robohash (Plan de respaldo funcional)
  const roboFallback = `https://robohash.org/${item.name.replace(/\s+/g, "")}.png?set=set2&size=400x250`;

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
          {/* Nota: Aquí se mantienen los "..." porque la API swapi.tech 
              solo entrega estos detalles en la vista individual (fetch por ID).
          */}
          <p className="m-0 small text-muted"><strong>Gender:</strong> ...</p>
          <p className="m-0 small text-muted"><strong>Hair Color:</strong> ...</p>
          <p className="m-0 small text-muted"><strong>Eye Color:</strong> ...</p>
        </div>

        <div className="d-flex justify-content-between mt-auto">
          {/* CORRECCIÓN AQUÍ: 
              La ruta ahora envía el endpoint (people/planets) y el uid.
              Esto coincide con: path="/single/:type/:id" en routes.jsx
          */}
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