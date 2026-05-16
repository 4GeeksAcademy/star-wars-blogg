import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {    
    const { store, dispatch } = useGlobalReducer();

    const removeFavorite = (name) => {
        dispatch({ type: "remove_favorite", payload: name });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning sticky-top" style={{ backgroundColor: "rgba(0, 0, 0, 0.9) !important" }}>
            <div className="container">                
                <Link to="/" style={{ cursor: "default" }}>
                    <img 
                        src="https://download.logo.wine/logo/Star_Wars/Star_Wars-Logo.wine.png" 
                        alt="Star Wars Logo" 
                        style={{ height: "50px", objectFit: "contain" }}
                    />
                </Link>

               
                <div className="ms-auto dropdown">
                    <button 
                        className="btn btn-warning dropdown-toggle fw-bold d-flex align-items-center gap-2" 
                        type="button" 
                        id="dropdownFavorites" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Favorites 
                        <span className="badge bg-dark text-warning rounded-pill">
                            {store.favorites.length}
                        </span>
                    </button>
                    
                    
                    <ul className="dropdown-menu dropdown-menu-end bg-dark border border-warning p-2 text-white" aria-labelledby="dropdownFavorites" style={{ minWidth: "220px" }}>
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-center text-muted small py-2">(Empty)</li>
                        ) : (
                            store.favorites.map((favName, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center py-1 px-2 border-bottom border-secondary last-border-0">
                                    <span className="text-white text-truncate me-2 small" style={{ maxWidth: "150px" }}>
                                        {favName}
                                    </span>
                                    <i 
                                        className="fas fa-trash-alt text-danger cursor-pointer p-1" 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeFavorite(favName)}
                                        title="Eliminar de favoritos"
                                    ></i>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};