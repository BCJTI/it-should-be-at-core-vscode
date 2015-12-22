import {Disposable, TextEditor, TextDocument, window, workspace} from 'vscode';

/**
 * Controls the behaviour of remembering the order of viewed files.
 * @remarks Uses the configuration 'bcjti.itShould.enableFileReopener'.
 */
export class SmartFileReopener {
	/** List of viewed documents */
	private documents: Array<TextDocument>;
	/** When openning a file and closing it, we do not want that file oppened again... so jump first in this case... */
	private jumpFirst: boolean;
	/** Disposable to handle the release of used resources */
	private disposable: Disposable;

	constructor() {
		this.documents = [];
		let textEditors = window.visibleTextEditors;
		for (let i = 0; i < textEditors.length; i++) {
			this.documents.push(textEditors[i].document);
		}
		let subscriptions: Disposable[] = [];
		window.onDidChangeActiveTextEditor(this.onTextEditorChange, this, subscriptions);
		this.jumpFirst = true;
		this.disposable = Disposable.from(...subscriptions);
	}

	/** Free resources */
	dispose() : void {
		this.disposable.dispose();
	}

	/**
	 * Receive the event of openning or closing files...
	 * Process according to the desired behaviour.
	 * @param textEditor null When closing an editor, otherwise has the TextEditor with the document that was oppened.
	 * @remarks We always keep the documents list updated. The 'bcjti.itShould.enableFileReopener' setting just enable or disable the action of opening the file.
	 */
	private onTextEditorChange(textEditor: TextEditor): void {
		if (textEditor === null) {
			let document = this.documents.pop();
			if (this.jumpFirst) {
				document = this.documents.pop();
			}
			this.jumpFirst = false;

			let cfg = workspace.getConfiguration('bcjti.itShould');
			if (cfg.get<boolean>('enableFileReopener', true)) {
				window.showTextDocument(document);
			}
		} else {
			let lastDocument = this.documents.length > 0 ? this.documents[this.documents.length - 1] : null;
			if (textEditor.document !== lastDocument) {
				this.documents.push(textEditor.document);
				this.jumpFirst = true;
			}
		}
	}
}