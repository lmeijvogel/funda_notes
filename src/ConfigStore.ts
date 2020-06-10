import { observable } from "mobx";

export class ConfigStore {
    @observable url: string | null = null;
    @observable username: string | null = null;
    @observable password: string | null = null;

    load() {
        this.url = window.localStorage.getItem("house_info_url");
        this.username = window.localStorage.getItem("house_info_username");
        this.password = window.localStorage.getItem("house_info_password");
    }

    save() {
        window.localStorage.setItem("house_info_url", this.url);
        window.localStorage.setItem("house_info_username", this.username);
        window.localStorage.setItem("house_info_password", this.password);
    }
}
