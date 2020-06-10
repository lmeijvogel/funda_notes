import * as React from "react";

import { ConfigStore } from "../ConfigStore";
import { observer } from "mobx-react";

type Props = {
    store: ConfigStore;
};

@observer
export class ConfigPage extends React.Component<Props> {
    buttonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        this.props.store.save();
    };

    urlChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.store.url = event.target.value;
    };

    usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.store.username = event.target.value;
    };

    passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.store.password = event.target.value;
    };

    render() {
        const { url, username, password } = this.props.store;

        return (
            <div>
                <dl>
                    <dd>Url</dd>
                    <dt>
                        <input type="text" defaultValue={url || ""} onChange={this.urlChanged} />
                    </dt>
                    <dd>Username</dd>
                    <dt>
                        <input type="text" value={username || ""} onChange={this.usernameChanged} />
                    </dt>
                    <dd>Password</dd>
                    <dt>
                        <input type="text" defaultValue={password || ""} onChange={this.passwordChanged} />
                    </dt>
                </dl>

                <button onClick={this.buttonClicked}>Save</button>
            </div>
        );
    }
}
