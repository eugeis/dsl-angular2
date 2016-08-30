/*
 * Copyright 2015-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * @author Jonas Möller
 */
import { Directive, ElementRef, Input, Output, HostListener, OnInit, EventEmitter } from '@angular/core';

import { DropInfo } from './dropinfo.model';
import { CardinalDirection } from './cardinaldirection.enum';
import { DragService } from './drag.service';
import NodeInterface = require('../windowmanager/node/ee-treenode.interface');

@Directive({
	selector: '[dropZone]'
})

export class DropZone implements OnInit {
	@Input("dropZone") type: string;
	@Input() dropInfo: DropInfo;
	@Output() rearrange: EventEmitter<NodeInterface.TreeNode> = new EventEmitter<NodeInterface.TreeNode>();

	el: any;
	width: number;
	height: number;

	firstX: number;
	secondX: number;

	firstY: number;
	secondY: number;

	constructor(er: ElementRef, private dragService: DragService) {
		this.el = er.nativeElement;
		this.dragService = dragService;
	}

	ngOnInit() {
		let goldenRatio = 1.618;

		this.width = this.el.clientWidth;
		this.height = this.el.clientHeight;

		this.firstX = this.width / (1 + goldenRatio + 1);
		this.secondX = this.width / (1 + goldenRatio + 1) * (goldenRatio + 1);

		this.firstY = this.height / (1 + goldenRatio + 1);
		this.secondY = this.height / (1 + goldenRatio + 1) * (goldenRatio + 1);
	}

	getCardinalDirection(x,y): CardinalDirection {
		if (this.firstX <= x && x <= this.secondX) {
			if (this.firstY <= y && y <= this.secondY) {
				return CardinalDirection.Center;
			}
		}

		if (y < this.firstY) {
			if (this.firstX <= x && x <= this.secondX) {
				return CardinalDirection.North;
			}
		}

		if (this.secondY < y) {
			if (this.firstX <= x && x <= this.secondX) {
				return CardinalDirection.South;
			}
		}

		if (x < this.firstX) {
			if (this.firstY <= y && y <= this.secondY) {
				return CardinalDirection.West;
			}
		}

		if (this.secondX < x) {
			if (this.firstY <= y && y <= this.secondY) {
				return CardinalDirection.East;
			}
		}

		if (x < this.firstX && y < this.firstY) {
			if (y / x < this.firstY / this.firstX) {
				return CardinalDirection.Northwestnorth;
			} else {
				return CardinalDirection.Westnorthwest;
			}
		}

		if (this.secondX < x && y < this.firstY) {
			if (y / (this.width - x) < this.firstY / (this.width - this.secondX)) {
				return CardinalDirection.Northeastnorth;
			} else {
				return CardinalDirection.Eastnortheast;
			}
		}

		if (this.secondX < x && this.secondY < y) {
			if ((this.height - y) / (this.width - x) < (this.height - this.secondY) / (this.width - this.secondX)) {
				return CardinalDirection.Southeastsouth;
			} else {
				return CardinalDirection.Eastsoutheast;
			}
		}

		if (x < this.firstX && this.secondY < y) {
			if ((this.height - y) / x < (this.height - this.secondY) / this.firstX) {
				return CardinalDirection.Southwestsouth;
			} else {
				return CardinalDirection.Westsouthwest;
			}
		}

		throw "up";
	}

	@HostListener('dragover', ['$event']) onDragOver(e) {
		if (this.dragService.hasDragObject(this.type)) {
			this.dropInfo.direction = this.getCardinalDirection(e.offsetX,e.offsetY);
			this.dropInfo.display = true;
			e.preventDefault();
		}
	}

	@HostListener('dragleave', ['$event']) onDragLeave(e) {
		this.dropInfo.display = false;
	}

	@HostListener('drop') onDrop() {
		this.dropInfo.display = false;
		this.rearrange.emit(this.dragService.getNode());

		//TODO: Only close, when promise is received
		this.dragService.close();
	}

	@HostListener('window:resize', ['$event']) onResize(event) {
		this.ngOnInit();
	}
}
