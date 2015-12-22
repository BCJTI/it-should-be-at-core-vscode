// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {SmartFileReopener} from './SmartFileReopener';

export function activate(context: vscode.ExtensionContext) {
	// SmartFileReopener is Disposable... so we pass it to the context subscriptions to manage when it should be disposed.
	context.subscriptions.push(new SmartFileReopener());
}

// this method is called when your extension is deactivated
export function deactivate() {
}