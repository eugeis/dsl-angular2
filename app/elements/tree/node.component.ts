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
import { Component, Input } from '@angular/core';

import { PanelComponent } from './panel.component';
import { SeparatorComponent } from './separator.component';
import { NodeOrientation, inv, getClass } from './nodeorientation.enum';

export interface Node {
	branches: Node[],
	data?: any
}

@Component({
	selector: 'ee-node',
	template: `
		<div *ngIf="node && orientation" class="ee-node" [ngClass]="nodeClass(orientation)">
			<div *ngIf="node.branches && node.branches.length > 0 ">
				<div *ngFor="let branch of node.branches">
					<ee-node [node]="branch" [orientation]="nodeInv(orientation)"></ee-node>
					<ee-separator [orientation]="orientation"></ee-separator>
				</div>
			</div>
			<div *ngIf="!node.branches || node.branches.length == 0">
				<ee-panel [data]="node.data"></ee-panel>
			</div>
		</div>
	`,
	directives: [NodeComponent, PanelComponent, SeparatorComponent]
})

export class NodeComponent {
	@Input() node: Node;
	@Input() orientation: NodeOrientation;

	nodeClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	nodeInv(orientation: NodeOrientation) {
		return inv(orientation);
	}

	constructor() {  }
}
