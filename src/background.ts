// @ts-ignore
browser.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
    // Note: Do not make this function async, according to the docs, that will break it.
    switch (message.title) {
        case "loadNotes":
            fetch("http://localhost:4567/objects")
                .then(response => response.json())
                .then(r => {
                    return r;
                })
                .then(json => sendResponse(json));
            return true;
        case "loadNote":
            fetch(`http://localhost:4567/objects/${message.id}`)
                .then(response => response.json())
                .then(json => {
                    sendResponse(json);
                });

            // Return true to make it wait for the sendResponse result after this function returns
            return true;

        case "saveNote":
            fetch(`http://localhost:4567/objects/${message.id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: message.id, description: message.description })
            }).then(() => {
                sendResponse(true);
            });

            // Return true to make it wait for the sendResponse result after this function returns
            return true;
    }
});
