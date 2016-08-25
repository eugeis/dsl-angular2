import { Injectable } from '@angular/core';

import { Node } from './node.interface';

@Injectable()
export class DragService {
	private node: Node;

	setNode(n: Node) {
		this.node = n;
	}

	getNode() {
		return this.node;
	}

	constructor() { }
}
