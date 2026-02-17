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
		const regex = /x-data\s*=\s*["']([a-zA-Z_$][\w$]*)/g;

		for (let i = 0; i < document.lineCount; i++) {
			const line = document.lineAt(i).text;
			let match: RegExpExecArray | null;

			while ((match = regex.exec(line)) !== null) {
				const fullMatch = match[0];
				const name = match[1];
				const nameStart = match.index + fullMatch.indexOf(name);
				const nameEnd = nameStart + name.length;

				const range = new vscode.Range(i, nameStart, i, nameEnd);
				const link: AlpineComponentLink = Object.assign(
					new vscode.DocumentLink(range),
					{ componentName: name }
				);
				link.tooltip = `Open ${name} component`;
				links.push(link);
			}
			regex.lastIndex = 0;
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
