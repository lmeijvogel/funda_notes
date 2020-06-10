import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { Note } from "./Note";

type InfoRowProps = {
    note: Note;
    onTextSave: (note: Note) => Promise<boolean>;
};

@observer
export class InfoRow extends React.Component<InfoRowProps> {
    @observable editing = false;

    render() {
        const { note } = this.props;

        return (
            <div className="infoRow">
                {this.editing ? (
                    <textarea
                        onKeyDown={this.onTextAreaKeyDown}
                        onChange={this.onTextAreaChange}
                        defaultValue={note.note}
                    ></textarea>
                ) : (
                    <p className="infoRow--text">{note.note}</p>
                )}

                <button onClick={this.editButtonClicked}>{this.editButtonLabel}</button>
            </div>
        );
    }

    private get editButtonLabel(): string {
        if (this.editing) {
            return "Bewaar";
        }

        if (!!this.props.note.note) {
            return "Bewerk";
        } else {
            return "Voeg notitie toe";
        }
    }

    onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.note.note = event.target.value;
    };

    onTextAreaKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const ctrlEnterPressed = e.ctrlKey && e.keyCode == 13;

        if (ctrlEnterPressed) {
            const success = await this.saveText();

            if (!success) {
                return;
            }

            this.editing = false;
        }
    };

    private async saveText(): Promise<boolean> {
        return await this.props.onTextSave(this.props.note);
    }

    editButtonClicked = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (this.editing) {
            const success = await this.saveText();

            if (!success) {
                return;
            }
        }

        this.editing = !this.editing;
    };
}
