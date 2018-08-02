export class Node {
	constructor(key, level = 0, type = 'group') {
		this.key = key;
		this.level = level;
		this.rows = [];
		this.children = [];
		this.type = type;
		this.source = null;
		this.value = null;
		
		this.state = {
			expand: false
		};
	}
}