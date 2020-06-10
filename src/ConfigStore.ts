import { observable } from "mobx";

export enum StorageType {
    LocalStorage,
    Server
}

export class ConfigStore {
    @observable storageType: StorageType;

    @observable url: string | null = null;
    @observable username: string | null = null;
    @observable password: string | null = null;

    load() {
        this.storageType =
            window.localStorage.getItem("house_info_storage_type") === "server"
                ? StorageType.Server
                : StorageType.LocalStorage;

        this.url = window.localStorage.getItem("house_info_url");
        this.username = window.localStorage.getItem("house_info_username");
        this.password = window.localStorage.getItem("house_info_password");
    }

    save() {
        window.localStorage.setItem(
            "house_info_storage_type",
            this.storageType === StorageType.LocalStorage ? "local_storage" : "server"
        );
        window.localStorage.setItem("house_info_url", this.url);
        window.localStorage.setItem("house_info_username", this.username);
        window.localStorage.setItem("house_info_password", this.password);
    }
}
