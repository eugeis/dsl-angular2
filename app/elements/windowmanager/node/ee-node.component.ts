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
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Node, cloneNodeShallow } from './ee-node.interface';
import { NodeOrientation, inv, getClass } from './ee-nodeorientation.enum';
import { SeparatorComponent } from './ee-separator.component';
import { CardinalDirection } from '../../drag/cardinaldirection.enum';
import { PanelComponent } from '../panel/ee-panel.component';
import { PanelHeaderComponent } from '../panel/ee-panel-header.component';

@Component({
	selector: 'ee-node',
	template: `
		<div *ngIf="node && orientation" class="ee-node flex" [ngClass]="nodeClass(orientation)">
			<div *ngIf="node.branches && node.branches.length > 0 " class="flex" >
				<div *ngFor="let branch of node.branches; let i = index" class="flex" [style.flex-grow]="branch.size">
					<ee-node [node]="branch" [orientation]="nodeInv(orientation)" (addPanel)="addPanel($event)" (promotePanel)="promotePanel($event)" (closePanel)="deletePanel($event)"></ee-node>
					<ee-separator *ngIf="node.branches[i+1]" [left]="branch" [right]="node.branches[i+1]" [orientation]="orientation"></ee-separator>
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

export class NodeComponent implements OnInit {
	@Input() node: any;	//Node
	@Input() orientation: NodeOrientation;

	@Output("addPanel") addEmitter = new EventEmitter();
	@Output("promotePanel") promoteEmitter = new EventEmitter();
	@Output("closePanel") closeEmitter = new EventEmitter();

	ngOnInit() {
		this.node.branches.forEach(function(d) {
			d.size = d.size || 1;
		});
	}

	nodeClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	nodeInv(orientation: NodeOrientation) {
		return inv(orientation);
	}

	add(e) {
		e.targetNode = this.node;
		if (e.targetNode !== e.sourceNode) {
			e.sourceNode = cloneNodeShallow(e.sourceNode);

			this.addEmitter.emit(e);
		}
	}

	addPanel(e) {
		let i = this.node.branches.indexOf(e.targetNode);
		let dir = e.dropInfo.direction;

		if (dir === CardinalDirection.North && this.orientation === NodeOrientation.Horizontal
		 || dir === CardinalDirection.West && this.orientation === NodeOrientation.Vertical) {
			this.node.branches.splice(i, 0, e.sourceNode);
		} else if (dir === CardinalDirection.South && this.orientation === NodeOrientation.Horizontal
		 || dir === CardinalDirection.East && this.orientation === NodeOrientation.Vertical) {
			this.node.branches.splice(i+1, 0, e.sourceNode);
		} else {
			let n: Node = {
				branches: []
			};

			let removed: Node = this.node.branches.splice(i, 1, n)[0];

			if (dir === CardinalDirection.North || dir === CardinalDirection.West) {
				n.branches = [e.sourceNode, removed];
			} else {
				n.branches = [removed, e.sourceNode];
			}
		}
	}

	closePanel() {
		this.closeEmitter.emit(this.node);
	}

	deletePanel(childNode) {
		let i = this.node.branches.indexOf(childNode);
		if (0 <= i && i < this.node.branches.length) {
			this.node.branches.splice(i, 1);
		}

		if (this.node.branches.length == 1) {
			this.promoteEmitter.emit(this.node);
		}
	}

	promotePanel(childNode) {
		let i = this.node.branches.indexOf(childNode);
		if (0 <= i && i < this.node.branches.length && childNode.branches.length == 1) {
			if (childNode.branches[0].branches.length <= 1) {
				childNode.branches[0].size = this.node.branches[i].size;
				this.node.branches[i] = childNode.branches[0];
			} else {
				let removed = this.node.branches.splice(i, 1)[0];
				childNode.branches[0].branches.forEach(function(d) {
					d.size = removed.size / childNode.branches[0].branches.length;
				});
				this.node.branches.splice.apply(this.node.branches, [i, 0].concat(childNode.branches[0].branches));
			}
		}
	}

	constructor() { }
}
