import * as vscode from "vscode";
import { findComponentFiles, XDATA_REGEX } from "./alpineUtils";

export class AlpineDataHoverProvider implements vscode.HoverProvider {
	async provideHover(
		document: vscode.TextDocument,
		position: vscode.Position,
		_token: vscode.CancellationToken,
	): Promise<vscode.Hover | undefined> {
		const fullText = document.getText();
		const regex = new RegExp(XDATA_REGEX.source, XDATA_REGEX.flags);

		let match: RegExpExecArray | null;
		while ((match = regex.exec(fullText)) !== null) {
			const name = match[1];
			const nameOffset = match.index + match[0].indexOf(name);
			const nameStart = document.positionAt(nameOffset);
			const nameEnd = document.positionAt(nameOffset + name.length);
			const range = new vscode.Range(nameStart, nameEnd);

			if (!range.contains(position)) continue;

			const files = await findComponentFiles(name);
			if (files.length === 0) return undefined;

			const fileUri = files[0];
			const md = new vscode.MarkdownString();
			md.isTrusted = true;
			md.appendMarkdown(`**${name}**\n\n`);
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
			const relativePath = workspaceFolder
				? vscode.workspace.asRelativePath(fileUri)
				: fileUri.path;
			md.appendMarkdown(`${relativePath}`);

			return new vscode.Hover(md, range);
		}

		return undefined;
	}
}
