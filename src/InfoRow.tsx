import * as React from "react";

type InfoRowProps = {
    element: Element;
};

type InfoRowState = {
    text: string;
    editing: boolean;
};

export class InfoRow extends React.Component<InfoRowProps, InfoRowState> {
    constructor(props: InfoRowProps) {
        super(props);

        this.state = {
            text: "",
            editing: false
        };
    }

    componentDidMount() {
        this.setState({
            text: this.retrieveText()
        });
    }

    render() {
        const { editing, text } = this.state;

        return (
            <div className="infoRow">
                {editing ? (
                    <textarea
                        onKeyDown={this.onTextAreaKeyDown}
                        onChange={this.onTextChange}
                        value={text || ""}
                    ></textarea>
                ) : (
                    <p>{text}</p>
                )}

                <button onClick={this.editButtonClicked}>{this.editButtonLabel}</button>
            </div>
        );
    }

    private get editButtonLabel(): string {
        const { editing, text } = this.state;

        if (editing) {
            return "Bewaar";
        }

        if (text === null) {
            return "Voeg notitie toe";
        } else {
            return "Bewerk";
        }
    }

    onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ text: e.target.value });
    };

    onTextAreaKeyDown = (e: React.KeyboardEvent) => {
        const ctrlEnterPressed = e.ctrlKey && e.keyCode == 13;

        if (ctrlEnterPressed) {
            this.saveText();

            this.setState({ editing: false });
        }
    };

    private retrieveText(): string | null {
        return window.localStorage.getItem(this.localStorageKey);
    }

    private saveText(): void {
        window.localStorage.setItem(this.localStorageKey, this.state.text);
    }

    get localStorageKey(): string {
        const fundaGlobalId = this.props.element.attributes.getNamedItem("data-global-id").value;

        return `house_info_${fundaGlobalId}`;
    }

    editButtonClicked = (e: React.MouseEvent) => {
        e.preventDefault();

        if (this.state.editing) {
            this.saveText();
        }

        this.setState({ editing: !this.state.editing });
    };
}
