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
import { SeperatorComponent } from './seperator.component';

export interface Node {
	branches: Node[],
	data?: any
}

export enum NodeOrientation {
	Horizontal = 1,
	Vertical = 2
}

@Component({
	selector: 'node',
	template: `
		<div *ngIf="node && orientation" class="node" [ngClass]="getClass()">
			<div *ngIf="node.branches && node.branches.length > 0 ">
				<div *ngFor="let branch of node.branches">
					<node [node]="branch" [orientation]="inv(orientation)"></node>
					<seperator></seperator>
				</div>
			</div>
			<div *ngIf="!node.branches || node.branches.length == 0">
				<panel [data]="node.data"></panel>
			</div>
		</div>
	`,
	directives: [NodeComponent, PanelComponent, SeperatorComponent]
})

export class NodeComponent {
	@Input() node: Node;
	@Input() orientation: NodeOrientation;

	inv(orientation: NodeOrientation) {
		return (orientation == NodeOrientation.Horizontal) ? NodeOrientation.Vertical : NodeOrientation.Horizontal;
	}

	getClass() {
		return (this.orientation == NodeOrientation.Horizontal) ? "hor" : "vert";
	}

	constructor() {  }
}
