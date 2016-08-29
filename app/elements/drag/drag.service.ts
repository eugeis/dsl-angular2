import { Injectable } from '@angular/core';

import { DragInfo } from './draginfo.model';

@Injectable()
export class DragService {
	private info: DragInfo;

	setDragInfo(i) {
		this.info = i;
	}

	getNode() {
		if (!this.info) {
			throw "Tried 'getNode' while draginfo is not set.";
		}

		return this.info.node;
	}

	close() {
		if (!this.info) {
			throw "Tried 'close' while draginfo is not set.";
		}

		if (!this.info.closeEmitter) {
			return;
		}

		this.info.closeEmitter.emit();
	}

	hasDragObject(type: string) {
		if (!this.info) {
			return false;
		}

		return this.info.type === type;
	}

	constructor() { }
}
