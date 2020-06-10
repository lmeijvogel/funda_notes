import { ConfigStore } from "./ConfigStore";

function authorizationHeader(configStore: ConfigStore) {
    return {
        Authorization: "Basic " + btoa(configStore.username + ":" + configStore.password)
    };
}

// @ts-ignore
browser.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
    const configStore = new ConfigStore();
    configStore.load();

    // Note: Do not make this function async, according to the docs, that will break it.
    switch (message.title) {
        case "loadNotes":
            fetch(`${configStore.url}/objects`, {
                method: "GET",
                headers: authorizationHeader(configStore)
            })
                .then(response => response.json())
                .then(json => sendResponse(json));
            return true;
        case "loadNote":
            fetch(`${configStore.url}/objects/${message.id}`, {
                method: "GET",
                headers: authorizationHeader(configStore)
            })
                .then(response => response.json())
                .then(json => sendResponse(json));

            // Return true to make it wait for the sendResponse result after this function returns
            return true;

        case "saveNote":
            fetch(`${configStore.url}/objects/${message.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    ...authorizationHeader(configStore)
                },
                body: JSON.stringify({ id: message.id, description: message.description })
            })
                .then(() => sendResponse(true))
                .catch(() => sendResponse(false));

            // Return true to make it wait for the sendResponse result after this function returns
            return true;
    }
});
