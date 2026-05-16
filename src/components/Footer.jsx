import React from "react";

export const Footer = () => (
    <footer 
        className="footer mt-auto py-4 text-center bg-dark text-white border-top border-warning" 
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9) !important" }}
    >
        <div className="container">
            <p className="m-0 small opacity-75">
                Made with <i className="fa fa-heart text-danger mx-1" /> by{" "}
                <a 
                    href="http://www.4geeksacademy.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-warning text-decoration-none fw-bold"
                >
                    4Geeks Academy
                </a>
            </p>
        </div>
    </footer>
);