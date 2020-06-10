import * as React from "react";

import { ConfigStore, StorageType } from "../ConfigStore";
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
        const { storageType } = this.props.store;

        return (
            <>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="storage_type"
                            checked={storageType === StorageType.LocalStorage}
                            onChange={this.onLocalStorageCheck}
                        />
                        Local storage
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="storage_type"
                            checked={storageType === StorageType.Server}
                            onChange={this.onServerCheck}
                        />
                        Server
                    </label>
                    {storageType === StorageType.Server && this.renderStorageServerConfig()}
                </div>
                <div>
                    <button onClick={this.buttonClicked}>Save</button>
                </div>
            </>
        );
    }

    renderStorageServerConfig() {
        const { url, username, password } = this.props.store;

        return (
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
        );
    }

    private onLocalStorageCheck = () => {
        this.props.store.storageType = StorageType.LocalStorage;
    };

    private onServerCheck = () => {
        this.props.store.storageType = StorageType.Server;
    };
}
