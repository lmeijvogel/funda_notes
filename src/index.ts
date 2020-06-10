import * as React from "react";
import * as ReactDOM from "react-dom";

import { InfoRow } from "./InfoRow";

export type NotesCollection = { [key: number]: string };

async function loadNotesFromStorage(): Promise<NotesCollection> {
    // @ts-ignore
    const json = await browser.runtime.sendMessage({ title: "loadNotes" });

    return json;
}

function clearExistingNotes() {
    document.querySelectorAll("._customNotes").forEach((existing: Element) => existing.remove());
}

function isSearchResultsPage() {
    return document.querySelectorAll(".search-result").length > 0;
}

async function addNotesToSearchResult() {
    const notes = await loadNotesFromStorage();

    const allResults = document.querySelectorAll(".search-result");

    allResults.forEach((result: Element) => addCustomNote(result, notes));
}

async function addNoteToProductPage() {
    const notes = await loadNotesFromStorage();

    const header = document.querySelector(".object-media");

    addCustomNote(header, notes);
}

function addCustomNote(element: Element, notes: NotesCollection) {
    const div = document.createElement("div");
    div.className = "_customNotes";

    element.appendChild(div);

    ReactDOM.render(React.createElement(InfoRow, { element: element, notes: notes, onTextSave: saveNote }), div);
}

function saveNote(text: string, fundaGlobalId: number): void {
    // @ts-ignore
    browser.runtime.sendMessage({ title: "saveNote", id: fundaGlobalId, description: text });
}

async function main() {
    clearExistingNotes();

    if (isSearchResultsPage()) {
        addNotesToSearchResult();
        let lastLocation = document.location.pathname;

        setInterval(async () => {
            const currentLocation = document.location.pathname;

            if (currentLocation !== lastLocation) {
                addNotesToSearchResult();
            }

            lastLocation = currentLocation;
        }, 1000);
    }

    addNoteToProductPage();
}
main();
