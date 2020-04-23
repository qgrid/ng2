export function escapeRegExp(s: string): string {
	return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
