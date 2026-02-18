import * as vscode from 'vscode';

interface AlpineComponentLink extends vscode.DocumentLink {
	componentName: string;
}

export class AlpineDataDocumentLinkProvider implements vscode.DocumentLinkProvider<AlpineComponentLink> {

	provideDocumentLinks(
		document: vscode.TextDocument,
		_token: vscode.CancellationToken
	): AlpineComponentLink[] {
		const links: AlpineComponentLink[] = [];
		const fullText = document.getText();
		const regex = /x-data\s*=\s*["'][\s\r\n]*([a-zA-Z_$][\w$]*)/g;

		let match: RegExpExecArray | null;
		while ((match = regex.exec(fullText)) !== null) {
			const name = match[1];
			const nameOffset = match.index + match[0].indexOf(name);
			const nameStart = document.positionAt(nameOffset);
			const nameEnd = document.positionAt(nameOffset + name.length);

			const range = new vscode.Range(nameStart, nameEnd);
			const link: AlpineComponentLink = Object.assign(
				new vscode.DocumentLink(range),
				{ componentName: name }
			);
			link.tooltip = `Open ${name} component`;
			links.push(link);
		}

		return links;
	}

	async resolveDocumentLink(
		link: AlpineComponentLink,
		_token: vscode.CancellationToken
	): Promise<AlpineComponentLink | undefined> {
		const files = await this.findComponentFiles(link.componentName);
		if (files.length === 0) return undefined;

		link.target = files[0];
		return link;
	}

	private async findComponentFiles(name: string): Promise<vscode.Uri[]> {
		const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
		const variants = [...new Set([name, kebab])];
		const extensions = ['js', 'ts'];

		const results: vscode.Uri[] = [];

		for (const variant of variants) {
			for (const ext of extensions) {
				const pattern = `**/${variant}.${ext}`;
				const files = await vscode.workspace.findFiles(pattern, '**/node_modules/**', 5);
				results.push(...files);
			}
		}

		return results;
	}
}
