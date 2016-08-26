import { Directive, Input, ElementRef, HostListener } from '@angular/core';

import { DragService } from './drag.service';
//import { Node } from './node.interface';

@Directive({
	selector: '[dragStart]'
})
export class DragStart {
	@Input() node: any;	//Node
	@Input("close") closeEmitter: any;

	constructor(private er: ElementRef, private dragService: DragService) {
		er.nativeElement.draggable = true;
	}

	@HostListener('dragstart') onDragStart() {
		console.log(">>>>>>");
		console.log("DragStart");
		this.dragService.setDragInfo({
			closeEmitter: this.closeEmitter,
			node: this.node
		});
	}

	@HostListener('dragend') onDragEnd() {
		console.log("DragEnd");
		this.dragService.setDragInfo(undefined);
	}
}
