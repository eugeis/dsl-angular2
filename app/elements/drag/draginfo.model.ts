import { EventEmitter } from '@angular/core';

export interface DragInfo {
	node: Node,
	closeEmitter: EventEmitter<void>,
	type: string
}
