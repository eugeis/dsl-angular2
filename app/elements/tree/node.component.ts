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
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PanelComponent } from './panel.component';
import { PanelHeaderComponent } from './ee-panel-header.component';
import { SeparatorComponent } from './separator.component';
import { NodeOrientation, inv, getClass } from './nodeorientation.enum';

export interface Node {
	branches: Node[],
	data?: any;
}

@Component({
	selector: 'ee-node',
	template: `
		<div *ngIf="node && orientation" class="ee-node" [ngClass]="nodeClass(orientation)">
			<div *ngIf="node.branches && node.branches.length > 0 ">
				<div *ngFor="let branch of node.branches">
					<ee-node [node]="branch" [orientation]="nodeInv(orientation)" (closePanel)="deletePanel($event)"></ee-node>
					<ee-separator [orientation]="orientation"></ee-separator>
				</div>
			</div>
			<div *ngIf="!node.branches || node.branches.length == 0" class="ee-panel-container">
				<ee-panel-header (close)="closePanel()"></ee-panel-header>
				<ee-panel [data]="node.data"></ee-panel>
			</div>
		</div>
	`,
	directives: [NodeComponent, PanelComponent, SeparatorComponent, PanelHeaderComponent]
})

export class NodeComponent {
	@Input() node: Node;
	@Input() orientation: NodeOrientation;

	@Output("closePanel") closeEmitter = new EventEmitter();

	nodeClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	nodeInv(orientation: NodeOrientation) {
		return inv(orientation);
	}

	closePanel() {
		this.closeEmitter.emit(this.node);
	}

	deletePanel($event) {
		let i = this.node.branches.indexOf($event);
		if (0 <= i && i < this.node.branches.length) {
			this.node.branches.splice(i, 1);
		}

		if (this.node.branches.length == 0) {
			this.closeEmitter.emit(this.node);
		}
	}

	constructor() {  }
}
