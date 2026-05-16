import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card"; 

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    const getItems = async (endpoint) => {
        try {
            const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
            const data = await response.json();
            
            dispatch({
                type: `set_${endpoint}`, 
                payload: data.results
            });
        } catch (error) {
            console.error(`Error cargando ${endpoint}:`, error);
        }
    };

    useEffect(() => {
        if (store.people.length === 0) getItems("people");
        if (store.planets.length === 0) getItems("planets");
        if (store.vehicles.length === 0) getItems("vehicles");
    }, []);

    return (
        <div className="container mt-5">            
            <h2 className="text-warning mb-4 fw-bold">Characters</h2>
            <div className="scroll-container d-flex flex-nowrap overflow-auto mb-5 pb-2">
                {store.people.map((person) => (
                    <Card key={person.uid} item={person} endpoint="people" />
                ))}
            </div>

            
            <h2 className="text-warning mb-4 fw-bold">Planets</h2>
            <div className="scroll-container d-flex flex-nowrap overflow-auto mb-5 pb-2">
                {store.planets.map((planet) => (
                    <Card key={planet.uid} item={planet} endpoint="planets" />
                ))}
            </div>

            
            <h2 className="text-warning mb-4 fw-bold">Vehicles</h2>
            <div className="scroll-container d-flex flex-nowrap overflow-auto mb-5 pb-2">
                {store.vehicles.map((vehicle) => (
                    <Card key={vehicle.uid} item={vehicle} endpoint="vehicles" />
                ))}
            </div>
        </div>
    );
};