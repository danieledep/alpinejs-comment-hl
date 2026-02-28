import * as vscode from "vscode";

export const XDATA_REGEX = /x-data\s*=\s*["'][\s\r\n]*([a-zA-Z_$][\w$]*)/g;

export async function findComponentFiles(name: string): Promise<vscode.Uri[]> {
	const kebab = name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
	const variants = [...new Set([name, kebab])];
	const extensions = ["js", "ts"];

	const results: vscode.Uri[] = [];

	for (const variant of variants) {
		for (const ext of extensions) {
			const pattern = `**/${variant}.${ext}`;
			const files = await vscode.workspace.findFiles(
				pattern,
				"**/node_modules/**",
				5,
			);
			results.push(...files);
		}
	}

	return results;
}
