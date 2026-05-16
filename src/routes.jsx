import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Detalles } from "./pages/Detalles"; 
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        <Route path="/" element={<Home />} />

        
        <Route path="/single/:type/:id" element={<Detalles />} />
        
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);