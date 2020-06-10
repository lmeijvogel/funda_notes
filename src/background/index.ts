import { ConfigStore, StorageType } from "../ConfigStore";
import { IStorage } from "./IStorage";
import { LocalStorage } from "./LocalStorage";
import { ServerStorage } from "./ServerStorage";

// @ts-ignore
browser.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
    const configStore = new ConfigStore();
    configStore.load();

    const storage = createStorage(configStore);

    // Note: Do not make this function async, according to the docs, that will break it.
    switch (message.title) {
        case "loadNotes":
            storage.loadNotes().then(json => sendResponse(json));

            return true;
        case "saveNote":
            storage
                .saveNote(message.id, message.description)
                .then(() => sendResponse(true))
                .catch(() => sendResponse(false));

            // Return true to make it wait for the sendResponse result after this function returns
            return true;
    }
});

function createStorage(configStore: ConfigStore): IStorage {
    switch (configStore.storageType) {
        case StorageType.Server:
            return new ServerStorage(configStore);
        case StorageType.LocalStorage:
            return new LocalStorage();
    }
}
