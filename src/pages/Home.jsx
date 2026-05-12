import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card"; // Asegúrate de que la ruta sea correcta

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    const getItems = async (endpoint) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
            const data = await response.json();
            
            // Guardamos en el store global según el tipo
            dispatch({
                type: `set_${endpoint}`, 
                payload: data.results
            });
        } catch (error) {
            console.error(`Error cargando ${endpoint}:`, error);
        }
    };

    useEffect(() => {
        // Pedimos los datos solo si no los tenemos ya en el store
        if (store.people.length === 0) getItems("people");
        if (store.planets.length === 0) getItems("planets");
        if (store.vehicles.length === 0) getItems("vehicles");
    }, []);

    return (
        <div className="container mt-5">
            {/* Sección Personajes */}
            <h2 className="text-danger mb-4">Characters</h2>
            <div className="scroll-container d-flex flex-nowrap overflow-auto mb-5 pb-2">
                {store.people.map((person) => (
                    <Card key={person.uid} item={person} endpoint="people" />
                ))}
            </div>

            {/* Sección Planetas */}
            <h2 className="text-danger mb-4">Planets</h2>
            <div className="scroll-container d-flex flex-nowrap overflow-auto mb-5 pb-2">
                {store.planets.map((planet) => (
                    <Card key={planet.uid} item={planet} endpoint="planets" />
                ))}
            </div>

            {/* Sección Vehículos */}
            <h2 className="text-danger mb-4">Vehicles</h2>
            <div className="scroll-container d-flex flex-nowrap overflow-auto mb-5 pb-2">
                {store.vehicles.map((vehicle) => (
                    <Card key={vehicle.uid} item={vehicle} endpoint="vehicles" />
                ))}
            </div>
        </div>
    );
};