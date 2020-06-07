import * as React from "react";
import * as ReactDOM from "react-dom";

import { InfoRow } from "./InfoRow";

function clearExistingNotes() {
    document.querySelectorAll("._customNotes").forEach((existing: Element) => existing.remove());
}

function addNotesToSearchResult() {
    const allResults = document.querySelectorAll(".search-result");

    allResults.forEach((result: Element) => addCustomNote(result));
}

function addNoteToProductPage() {
    const header = document.querySelector(".object-media");

    addCustomNote(header);
}

function addCustomNote(element: Element) {
    const div = document.createElement("div");
    div.className = "_customNotes";

    element.appendChild(div);

    ReactDOM.render(React.createElement(InfoRow, { element: element }), div);
}

clearExistingNotes();

addNotesToSearchResult();
addNoteToProductPage();

let lastLocation = document.location.pathname;

setInterval(() => {
    const currentLocation = document.location.pathname;

    if (currentLocation !== lastLocation) {
        addNotesToSearchResult();
    }

    lastLocation = currentLocation;
}, 1000);
