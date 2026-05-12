import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// 1. CORRECCIÓN: El nombre debe ser Detalles para que coincida con la importación en routes.jsx
export const Detalles = () => {
    const { type, id } = useParams(); 
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        // Hacemos el fetch específico usando los parámetros de la URL
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    setDetail(data.result.properties);
                }
            })
            .catch(err => console.error("Error al traer detalles:", err));
    }, [type, id]);

    if (!detail) return (
        <div className="container text-center mt-5">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Cargando datos de la Fuerza...</p>
        </div>
    );

    // Ajustamos la categoría para las imágenes
    const imgCategory = type === "people" ? "characters" : type;

    return (
        <div className="container mt-5">
            <div className="row d-flex align-items-center">
                <div className="col-md-6 text-center">
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/${imgCategory}/${id}.jpg`} 
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "400px" }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://robohash.org/${id}?set=set2&size=400x400`;
                        }}
                        alt={detail.name} 
                    />
                </div>
                <div className="col-md-6 text-center">
                    <h1 className="display-4 fw-bold">{detail.name}</h1>
                    <p className="mt-4 fs-5 text-muted">
                        Star Wars, known as La Guerra de las Galaxias in Spanish, is an epic space opera multimedia franchise 
                        created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide 
                        pop-culture phenomenon.
                    </p>
                </div>
            </div>

            <hr className="my-4 border-danger border-2" />

            {/* TABLA DE ATRIBUTOS DINÁMICA */}
            <div className="row text-danger text-center fw-bold">
                <div className="col-2">
                    <p className="mb-1">Name</p>
                    <p className="text-dark small">{detail.name}</p>
                </div>
                <div className="col-2">
                    <p className="mb-1">{type === "people" ? "Birth Year" : "Climate"}</p>
                    <p className="text-dark small">{type === "people" ? detail.birth_year : detail.climate}</p>
                </div>
                <div className="col-2">
                    <p className="mb-1">{type === "people" ? "Gender" : "Population"}</p>
                    <p className="text-dark small">{type === "people" ? detail.gender : detail.population}</p>
                </div>
                <div className="col-2">
                    <p className="mb-1">{type === "people" ? "Height" : "Orbital Period"}</p>
                    <p className="text-dark small">{type === "people" ? detail.height : detail.orbital_period}</p>
                </div>
                <div className="col-2">
                    <p className="mb-1">{type === "people" ? "Skin Color" : "Rotation Period"}</p>
                    <p className="text-dark small">{type === "people" ? detail.skin_color : detail.rotation_period}</p>
                </div>
                <div className="col-2">
                    <p className="mb-1">{type === "people" ? "Eye Color" : "Diameter"}</p>
                    <p className="text-dark small">{type === "people" ? detail.eye_color : detail.diameter}</p>
                </div>
            </div>
        </div>
    );
};