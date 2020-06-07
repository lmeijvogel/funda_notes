import * as React from "react";
import * as ReactDOM from "react-dom";

import { InfoRow } from "./InfoRow"

const allResults = document.querySelectorAll(".search-result");

allResults.forEach(result => {
    const div = document.createElement("div");

    result.appendChild(div);

    ReactDOM.render(React.createElement(InfoRow, { element: result }), div);
});
