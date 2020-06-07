import * as React from "react";
import * as ReactDOM from "react-dom";

import { InfoRow } from "./InfoRow";

function addCustomNotes() {
    const allResults = document.querySelectorAll(".search-result");

    document.querySelectorAll("._customNotes").forEach((existing: Element) => existing.remove());

    allResults.forEach((result: Element) => {
        const div = document.createElement("div");
        div.className = "_customNotes";

        result.appendChild(div);

        ReactDOM.render(React.createElement(InfoRow, { element: result }), div);
    });
}

addCustomNotes();

let lastLocation = document.location.pathname;

setInterval(() => {
    const currentLocation = document.location.pathname;

    if (currentLocation !== lastLocation) {
        addCustomNotes();
    }

    lastLocation = currentLocation;
}, 1000);
