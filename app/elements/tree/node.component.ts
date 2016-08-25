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
import { Node } from './node.interface';
import { CardinalDirection } from './cardinaldirection.enum';

@Component({
	selector: 'ee-node',
	template: `
		<div *ngIf="node && orientation" class="ee-node flex" [ngClass]="nodeClass(orientation)">
			<div *ngIf="node.branches && node.branches.length > 0 " class="flex">
				<div *ngFor="let branch of node.branches" class="flex">
					<ee-node [node]="branch" [orientation]="nodeInv(orientation)" (addPanel)="addPanel($event)" (promotePanel)="promotePanel($event)" (closePanel)="deletePanel($event)"></ee-node>
					<ee-separator [orientation]="orientation"></ee-separator>
				</div>
			</div>
			<div *ngIf="!node.branches || node.branches.length == 0" class="ee-panel-container flex">
				<ee-panel-header [node]="node" (close)="closePanel()"></ee-panel-header>
				<ee-panel [data]="node.data" (add)="add($event)"></ee-panel>
			</div>
		</div>
	`,
	directives: [NodeComponent, PanelComponent, SeparatorComponent, PanelHeaderComponent]
})

export class NodeComponent {
	@Input() node: any;	//Node
	@Input() orientation: NodeOrientation;

	@Output("addPanel") addEmitter = new EventEmitter();
	@Output("promotePanel") promoteEmitter = new EventEmitter();
	@Output("closePanel") closeEmitter = new EventEmitter();

	nodeClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	nodeInv(orientation: NodeOrientation) {
		return inv(orientation);
	}

	add(e) {
		e.targetNode = this.node;
		this.addEmitter.emit(e);
	}

	addPanel(e) {
		console.log(e);

		switch(e.dropInfo.direction) {
			case CardinalDirection.Center:
			console.log("Drop Center");
			break;

			case CardinalDirection.North:
			case CardinalDirection.Northwestnorth:
			case CardinalDirection.Northeastnorth:
			console.log("Drop North");
			break;

			case CardinalDirection.South:
			case CardinalDirection.Southwestsouth:
			case CardinalDirection.Southeastsouth:
			console.log("Drop South");
			break;

			case CardinalDirection.West:
			case CardinalDirection.Westnorthwest:
			case CardinalDirection.Westsouthwest:
			this.addLeft(e);
			break;

			case CardinalDirection.East:
			case CardinalDirection.Eastnortheast:
			case CardinalDirection.Eastsoutheast:
			console.log("Drop East");
			break;

			default: break;
		}
	}

	addLeft(e) {
		let i = this.node.branches.indexOf(e.targetNode);
		this.node.branches.splice.apply(this.node.branches, [i, 0].concat([e.sourceNode]));
	}

	closePanel() {
		this.closeEmitter.emit(this.node);
	}

	deletePanel($event) {
		let i = this.node.branches.indexOf($event);
		if (0 <= i && i < this.node.branches.length) {
			this.node.branches.splice(i, 1);
		}

		if (this.node.branches.length == 1) {
			this.promoteEmitter.emit(this.node);
		}
	}

	promotePanel($event) {
		let i = this.node.branches.indexOf($event);
		if (0 <= i && i < this.node.branches.length && $event.branches.length == 1) {
			if ($event.branches[0].branches.length <= 1) {
				this.node.branches[i] = $event.branches[0];
			} else {
				this.node.branches.splice(i, 1);
				this.node.branches.splice.apply(this.node.branches, [i, 0].concat($event.branches[0].branches));
			}
		}
	}

	constructor() {  }
}
