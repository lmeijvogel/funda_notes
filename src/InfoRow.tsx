import * as React from "react";

type InfoRowProps = {
    element: Element;
    notes: { [key: number]: string };
};

type InfoRowState = {
    editing: boolean;
};

export class InfoRow extends React.Component<InfoRowProps, InfoRowState> {
    constructor(props: InfoRowProps) {
        super(props);

        this.state = {
            editing: false
        };
    }

    get text() {
        return this.props.notes[this.fundaGlobalId];
    }

    render() {
        const { editing } = this.state;

        return (
            <div className="infoRow">
                {editing ? (
                    <textarea onKeyDown={this.onTextAreaKeyDown} value={this.text || ""}></textarea>
                ) : (
                    <p className="infoRow--text">{this.text}</p>
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

        if (!!this.text) {
            return "Bewerk";
        } else {
            return "Voeg notitie toe";
        }
    }

    onTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const ctrlEnterPressed = e.ctrlKey && e.keyCode == 13;

        if (ctrlEnterPressed) {
            this.saveText();

            this.setState({ editing: false });
        }
    };

    private saveText(): void {
    }

    private get fundaGlobalId(): number {
        const idKeyOnCurrentElement = this.props.element.attributes.getNamedItem("data-global-id");

        if (idKeyOnCurrentElement !== null) {
            // On search results page: key is on the same element, we don't want to search globally
            return parseInt(idKeyOnCurrentElement.value, 10);
        } else {
            // On object page, we can be a bit more lax with searching
            return parseInt(
                document.querySelector("*[data-global-id]").attributes.getNamedItem("data-global-id").value,
                10
            );
        }
    }

    editButtonClicked = (e: React.MouseEvent) => {
    };
}
