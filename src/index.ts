import { observable } from "mobx";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { InfoRow } from "./InfoRow";
import { Note } from "./Note";

export type NotesCollection = Map<number, string>;

class NotesStore {
    @observable notes: Map<number, Note> = new Map<number, Note>();

    async load() {
        // @ts-ignore
        const notesOnServer = await browser.runtime.sendMessage({ title: "loadNotes" });

        this.notes.clear();

        Object.keys(notesOnServer)
            .map(k => parseInt(k, 10))
            .forEach(key => {
                const note = notesOnServer[key];

                this.notes.set(key, new Note(key, note));
            });
    }

    noteFor(fundaGlobalId: number): Note {
        if (!this.notes.has(fundaGlobalId)) {
            this.notes.set(fundaGlobalId, new Note(fundaGlobalId, ""));
        }

        return this.notes.get(fundaGlobalId);
    }

    async saveNote(note: Note): Promise<boolean> {
        this.notes.get(note.fundaGlobalId).note = note.note;

        // @ts-ignore
        const result = await browser.runtime.sendMessage({
            title: "saveNote",
            id: note.fundaGlobalId,
            description: note.note
        });

        return result;
    }
}

function clearExistingNotes() {
    document.querySelectorAll("._customNotes").forEach((existing: Element) => existing.remove());
}

function isSearchResultsPage() {
    return document.querySelectorAll(".search-result").length > 0;
}

async function addNotesToSearchResult(store: NotesStore) {
    const allResults = document.querySelectorAll(".search-result");

    allResults.forEach((result: Element) => addCustomNote(result, store));
}

async function addNoteToProductPage(store: NotesStore) {
    const header = document.querySelector(".object-media");

    addCustomNote(header, store);
}

function addCustomNote(element: Element, store: NotesStore) {
    const note = store.noteFor(findGlobalId(element));

    const div = document.createElement("div");
    div.className = "_customNotes";

    element.appendChild(div);

    const saveNote = (note: Note) => {
        return store.saveNote(note);
    };

    ReactDOM.render(React.createElement(InfoRow, { note: note, onTextSave: saveNote }), div);
}

function findGlobalId(element: Element): number {
    const idKeyOnCurrentElement = element.attributes.getNamedItem("data-global-id");

    if (idKeyOnCurrentElement !== null) {
        // On search results page: key is on the same element, we don't want to search globally
        return parseInt(idKeyOnCurrentElement.value, 10);
    } else {
        // On object page, we can be a bit more lax with searching
        return parseInt(
            document.querySelector("*[data-global-id]").attributes.getNamedItem("data-global-id").value,
            10
        );
    }
}

async function main() {
    const store = new NotesStore();

    await store.load();

    clearExistingNotes();

    if (isSearchResultsPage()) {
        addNotesToSearchResult(store);

        let lastLocation = document.location.pathname;

        setInterval(async () => {
            const currentLocation = document.location.pathname;

            if (currentLocation !== lastLocation) {
                addNotesToSearchResult(store);
            }

            lastLocation = currentLocation;
        }, 1000);
    }

    addNoteToProductPage(store);
}
main();
