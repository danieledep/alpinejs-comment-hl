import * as vscode from "vscode";
import { findComponentFiles, XDATA_REGEX } from "./alpineUtils";

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
		const regex = new RegExp(XDATA_REGEX.source, XDATA_REGEX.flags);

		let match: RegExpExecArray | null;
		while ((match = regex.exec(fullText)) !== null) {
			const name = match[1];
			const nameOffset = match.index + match[0].indexOf(name);
			const nameStart = document.positionAt(nameOffset);
			const nameEnd = document.positionAt(nameOffset + name.length);

			const range = new vscode.Range(nameStart, nameEnd);
			const link: AlpineComponentLink = Object.assign(
				new vscode.DocumentLink(range),
				{ componentName: name },
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
