import * as React from "react";
import * as ReactDOM from "react-dom";

import { ConfigPage } from "./ConfigPage";
import { ConfigStore } from "../ConfigStore";

const configStore = new ConfigStore();

configStore.load();

ReactDOM.render(<ConfigPage store={configStore} />, document.getElementById("root"));
