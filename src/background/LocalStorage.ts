import { IStorage } from "./IStorage";

export class LocalStorage implements IStorage {
    async loadNotes(): Promise<any> {
        const storedNotes = window.localStorage.getItem("house_info_notes");

        if (!storedNotes) {
            return Promise.resolve({});
        }

        return Promise.resolve(JSON.parse(storedNotes));
    }

    async saveNote(id: number, description: string): Promise<any> {
        const notes = await this.loadNotes();

        notes[id] = description;

        window.localStorage.setItem("house_info_notes", JSON.stringify(notes));

        return Promise.resolve(true);
    }
}
