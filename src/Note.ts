import { observable } from "mobx";

export class Note {
    @observable note: string;

    constructor(readonly fundaGlobalId: number, note: string) {
        this.note = note;
    }
}
