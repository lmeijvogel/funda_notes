import { observer } from "mobx-react";
import * as React from "react";

import { Note } from "./Note";

type InfoRowProps = {
    note: Note;
    onTextSave: (note: Note) => Promise<boolean>;
};

type InfoRowState = {
    editing: boolean;
};

@observer
export class InfoRow extends React.Component<InfoRowProps, InfoRowState> {
    constructor(props: InfoRowProps) {
        super(props);

        this.state = {
            editing: false
        };
    }

    render() {
        const { note } = this.props;
        const { editing } = this.state;

        return (
            <div className="infoRow">
                {editing ? (
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
        const { editing } = this.state;

        if (editing) {
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

            this.setState({ editing: false });
        }
    };

    private async saveText(): Promise<boolean> {
        return await this.props.onTextSave(this.props.note);
    }

    editButtonClicked = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (this.state.editing) {
            const success = await this.saveText();

            if (!success) {
                return;
            }
        }
        this.setState({ editing: !this.state.editing });
    };
}
