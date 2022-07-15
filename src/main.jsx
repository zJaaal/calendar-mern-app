import React from "react";
import ReactDOM from "react-dom/client";
import CalendarApp from "./CalendarApp";
import "./index.css";

console.log(import.meta.env.VITE_API_URL);

ReactDOM.createRoot(document.getElementById("root")).render(<CalendarApp />);
