import * as vscode from 'vscode';
import { AlpineDataDocumentLinkProvider } from './documentLinkProvider';
import { AlpineDataHoverProvider } from './hoverProvider';

const SUPPORTED_LANGUAGES = [
	'html', 'php', 'blade', 'jinja-html', 'liquid', 'nunjucks', 'twig'
];

export function activate(context: vscode.ExtensionContext) {
	const selector = SUPPORTED_LANGUAGES.map(lang => ({
		language: lang,
		scheme: 'file'
	}));

	context.subscriptions.push(
		vscode.languages.registerDocumentLinkProvider(
			selector,
			new AlpineDataDocumentLinkProvider()
		),
		vscode.languages.registerHoverProvider(
			selector,
			new AlpineDataHoverProvider()
		)
	);
}

export function deactivate() {}
