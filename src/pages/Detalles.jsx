import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Detalles = () => {
    const { type, id } = useParams(); 
    const [detail, setDetail] = useState(null);

    
    const fondosPorCategoria = {
        people: "https://lumiere-a.akamaihd.net/v1/images/6082e3b460819c0001d12a9b-image_9d704d62.jpeg", 
        characters: "https://lumiere-a.akamaihd.net/v1/images/6082e3b460819c0001d12a9b-image_9d704d62.jpeg", 
        planets: "https://wallpapercave.com/wp/wp8959989.jpg", 
        starships: "https://cdna.artstation.com/p/assets/images/images/022/879/238/large/ruben-orellana-final.jpg?1577063640", 
        vehicles: "https://cdna.artstation.com/p/assets/images/images/022/879/238/large/ruben-orellana-final.jpg?1577063640"
    };

    
    const categoriaLimpia = type ? type.toLowerCase() : "people";
    const fondoActual = fondosPorCategoria[categoriaLimpia] || fondosPorCategoria.people;

    
    useEffect(() => {        
        const originalBodyBackground = document.body.style.backgroundImage;

        
        document.body.style.backgroundImage = `url("${fondoActual}")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";

        
        return () => {
            document.body.style.backgroundImage = originalBodyBackground;
        };
    }, [type, fondoActual]); 

    
    useEffect(() => {
        setDetail(null); 
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
        <div className="container text-center mt-5 text-white">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Cargando datos de la Fuerza...</p>
        </div>
    );

    
    const imgCategory = type === "people" ? "characters" : type;

    return (
        <div className="container mt-5">            
            <div className="p-4 rounded shadow" style={{ backgroundColor: "rgba(0, 0, 0, 0.78)", backdropFilter: "blur(6px)" }}>
                <div className="row d-flex align-items-center">
                    <div className="col-md-6 text-center">
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/${imgCategory}/${id}.jpg`} 
                            className="img-fluid rounded shadow border border-secondary"
                            style={{ maxHeight: "400px" }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://robohash.org/${id}?set=set2&size=400x400`;
                            }}
                            alt={detail.name} 
                        />
                    </div>
                    <div className="col-md-6 text-center text-white">
                        <h1 className="display-4 fw-bold text-warning">{detail.name}</h1>
                        <p className="mt-4 fs-5 opacity-75">
                            {type === "people" && "Star Wars, known as La Guerra de las Galaxias in Spanish, is an epic space opera multimedia franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop-culture phenomenon."}
                            {type === "planets" && "An ancient and unique celestial world mapped within the archives of the Jedi Order, presenting planetary structures and resources vital to local star systems."}
                            {type === "starships" && "A pinnacle of galactic engineering capable of hyperspace travel, heavily utilized by factions to secure planetary blockades or reinforce fleets."}
                        </p>
                    </div>
                </div>

                <hr className="my-4 border-warning border-2" />
                
                <div className="row text-warning text-center fw-bold">
                    <div className="col-2">
                        <p className="mb-1 text-warning">Name</p>
                        <p className="text-white small text-truncate">{detail.name}</p>
                    </div>
                    
                    <div className="col-2">
                        <p className="mb-1 text-warning">
                            {type === "people" ? "Birth Year" : type === "planets" ? "Climate" : "Model"}
                        </p>
                        <p className="text-white small text-truncate">
                            {type === "people" ? detail.birth_year : type === "planets" ? detail.climate : detail.model}
                        </p>
                    </div>

                    <div className="col-2">
                        <p className="mb-1 text-warning">
                            {type === "people" ? "Gender" : type === "planets" ? "Population" : "Manufacturer"}
                        </p>
                        <p className="text-white small text-truncate">
                            {type === "people" ? detail.gender : type === "planets" ? detail.population : detail.manufacturer}
                        </p>
                    </div>

                    <div className="col-2">
                        <p className="mb-1 text-warning">
                            {type === "people" ? "Height" : type === "planets" ? "Orbital Period" : "Cost (Credits)"}
                        </p>
                        <p className="text-white small text-truncate">
                            {type === "people" ? detail.height : type === "planets" ? detail.orbital_period : detail.cost_in_credits}
                        </p>
                    </div>

                    <div className="col-2">
                        <p className="mb-1 text-warning">
                            {type === "people" ? "Skin Color" : type === "planets" ? "Rotation Period" : "Passengers"}
                        </p>
                        <p className="text-white small text-truncate">
                            {type === "people" ? detail.skin_color : type === "planets" ? detail.rotation_period : detail.passengers}
                        </p>
                    </div>

                    <div className="col-2">
                        <p className="mb-1 text-warning">
                            {type === "people" ? "Eye Color" : type === "planets" ? "Diameter" : "Class"}
                        </p>
                        <p className="text-white small text-truncate">
                            {type === "people" ? detail.eye_color : type === "planets" ? detail.diameter : detail.starship_class}
                        </p>
                    </div>
                </div>

                
                <div className="text-center mt-4">
                    <Link to="/" className="btn btn-outline-warning px-4">
                        Regresar a la Galaxia
                    </Link>
                </div>
            </div>
        </div>
    );
};