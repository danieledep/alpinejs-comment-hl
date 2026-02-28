import * as vscode from "vscode";

export const XDATA_REGEX = /x-data\s*=\s*["'][\s\r\n]*([a-zA-Z_$][\w$]*)/g;

const SPREAD_REGEX = /\.\.\.([a-zA-Z_$][\w$]*)\s*\(/g;

export interface XDataMatch {
	name: string;
	offset: number;
	length: number;
}

export function findXDataComponentNames(text: string): XDataMatch[] {
	const attrRegex = /x-data\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
	const results: XDataMatch[] = [];

	let attrMatch;
	while ((attrMatch = attrRegex.exec(text)) !== null) {
		const value = attrMatch[1] ?? attrMatch[2];
		const valueOffset = attrMatch.index + attrMatch[0].indexOf(value);

		const trimmed = value.trimStart();
		const leadingWhitespace = value.length - trimmed.length;
		const simpleMatch = trimmed.match(/^([a-zA-Z_$][\w$]*)/);
		if (simpleMatch) {
			results.push({
				name: simpleMatch[1],
				offset: valueOffset + leadingWhitespace,
				length: simpleMatch[1].length,
			});
			continue;
		}

		const spreadRegex = new RegExp(SPREAD_REGEX.source, SPREAD_REGEX.flags);
		let spreadMatch;
		while ((spreadMatch = spreadRegex.exec(value)) !== null) {
			const name = spreadMatch[1];
			const nameOffsetInValue = spreadMatch.index + 3; // "...".length
			results.push({
				name,
				offset: valueOffset + nameOffsetInValue,
				length: name.length,
			});
		}
	}

	return results;
}

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
