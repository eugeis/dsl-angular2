import { Injectable } from '@angular/core';

@Injectable()
export class DragService {
	private info: any;

	setDragInfo(i) {
		this.info = i;
	}

	getNode() {
		return this.info.node;
	}

	close() {
		this.info.closeEmitter.emit();
	}

	constructor() { }
}
