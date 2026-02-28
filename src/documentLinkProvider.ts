import * as vscode from "vscode";
import { findComponentFiles, findXDataComponentNames } from "./alpineUtils";

interface AlpineComponentLink extends vscode.DocumentLink {
	componentName: string;
}

export class AlpineDataDocumentLinkProvider implements vscode.DocumentLinkProvider<AlpineComponentLink> {
	provideDocumentLinks(
		document: vscode.TextDocument,
		_token: vscode.CancellationToken,
	): AlpineComponentLink[] {
		const links: AlpineComponentLink[] = [];
		const fullText = document.getText();
		const matches = findXDataComponentNames(fullText);

		for (const m of matches) {
			const nameStart = document.positionAt(m.offset);
			const nameEnd = document.positionAt(m.offset + m.length);

			const range = new vscode.Range(nameStart, nameEnd);
			const link: AlpineComponentLink = Object.assign(
				new vscode.DocumentLink(range),
				{ componentName: m.name },
			);
			links.push(link);
		}

		return links;
	}

	async resolveDocumentLink(
		link: AlpineComponentLink,
		_token: vscode.CancellationToken,
	): Promise<AlpineComponentLink | undefined> {
		const files = await findComponentFiles(link.componentName);
		if (files.length === 0) return undefined;

		link.target = files[0];
		return link;
	}
}
