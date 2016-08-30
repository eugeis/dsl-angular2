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
import { Directive, Input, ElementRef, HostListener, EventEmitter } from '@angular/core';

import { DragService } from './drag.service';
import NodeInterface = require('../windowmanager/node/ee-treenode.interface');

@Directive({
	selector: '[dragStart]'
})
export class DragStart {
	@Input("dragStart") type: string;
	@Input() node: NodeInterface.TreeNode;
	@Input("close") closeEmitter: EventEmitter<void>;

	constructor(private er: ElementRef, private dragService: DragService) {
		er.nativeElement.draggable = true;
	}

	@HostListener('dragstart') onDragStart() {
		this.dragService.setDragInfo({
			closeEmitter: this.closeEmitter,
			node: this.node,
			type: this.type
		});
	}

	@HostListener('dragend') onDragEnd() {
		this.dragService.setDragInfo(undefined);
	}
}
