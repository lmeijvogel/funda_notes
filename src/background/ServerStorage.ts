import { ConfigStore } from "../ConfigStore";
import { IStorage } from "./IStorage";

export class ServerStorage implements IStorage {
    constructor(private readonly store: ConfigStore) {}

    async loadNotes(): Promise<any> {
        return fetch(`${this.store.url}/objects`, {
            method: "GET",
            headers: this.authorizationHeader
        }).then(response => response.json());
    }

    async saveNote(id: number, description: string) {
        return fetch(`${this.store.url}/objects/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...this.authorizationHeader
            },
            body: JSON.stringify({ id: id, description: description })
        });
    }

    private get authorizationHeader() {
        const { store } = this;

        return {
            Authorization: "Basic " + btoa(store.username + ":" + store.password)
        };
    }
}
