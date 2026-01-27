import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const rootNode = document.querySelector("#root");
if (!rootNode) throw new Error("cannot find root element");

createRoot(rootNode).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
