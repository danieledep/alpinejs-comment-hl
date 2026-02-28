import * as vscode from 'vscode';
import { AlpineDataDocumentLinkProvider } from './documentLinkProvider';
import { AlpineDataHoverProvider } from './hoverProvider';
import { setupAlpineDiagnostics } from './diagnosticProvider';

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

	setupAlpineDiagnostics(context, SUPPORTED_LANGUAGES);
}

export function deactivate() {}
