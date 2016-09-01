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

import { DropInfo } from '../../drag/dropinfo.model';
import { NodeOrientation, inv, getClass } from './ee-nodeorientation.enum';
import { SeparatorComponent } from './ee-separator.component';
import { CardinalDirection } from '../../drag/cardinaldirection.enum';
import { PanelComponent } from '../panel/ee-panel.component';
import { PanelHeaderComponent } from '../panel/ee-panel-header.component';

import NodeInterface = require('./ee-treenode.interface');

@Component({
	selector: 'ee-node',
	template: `
		<div *ngIf="node && orientation" class="ee-node">
			<div *ngIf="node.branches && node.branches.length > 0" [ngClass]="nodeClass(orientation)" class="ee-node-direction">
				<div *ngFor="let branch of node.branches; let i = index" class="ee-node-resizer" [style.flex-grow]="branch.size">
					<ee-node [node]="branch" [orientation]="nodeInv(orientation)" (addPanel)="addPanel($event)" (promotePanel)="promotePanel($event)" (closePanel)="deletePanel($event)"></ee-node>
					<ee-separator *ngIf="node.branches[i+1]" [left]="branch" [right]="node.branches[i+1]" [orientation]="orientation"></ee-separator>
				</div>
			</div>
			<div *ngIf="!node.branches || node.branches.length == 0" class="ee-panel-container">
				<ee-panel-header [node]="node" (close)="closePanel()"></ee-panel-header>
				<ee-panel [data]="node.data" (add)="add($event)"></ee-panel>
			</div>
		</div>
	`,
	directives: [NodeComponent, PanelComponent, SeparatorComponent, PanelHeaderComponent]
})

export class NodeComponent implements OnInit {
	@Input() node: NodeInterface.TreeNode;
	@Input() orientation: NodeOrientation;

	@Output("addPanel") addEmitter: EventEmitter<DropInfo> = new EventEmitter<DropInfo>();
	@Output("promotePanel") promoteEmitter: EventEmitter<NodeInterface.TreeNode> = new EventEmitter<NodeInterface.TreeNode>();
	@Output("closePanel") closeEmitter: EventEmitter<NodeInterface.TreeNode> = new EventEmitter<NodeInterface.TreeNode>();

	ngOnInit() {
		this.node.branches.forEach(function(d) {
			d.size = d.size || 1;
		});
	}

	nodeClass(orientation: NodeOrientation): string {
		return getClass(orientation);
	}

	nodeInv(orientation: NodeOrientation): NodeOrientation {
		return inv(orientation);
	}

	add(dropInfo: DropInfo): void {
		dropInfo.targetNode = this.node;
		if (dropInfo.targetNode !== dropInfo.sourceNode) {
			dropInfo.sourceNode = NodeInterface.cloneNodeShallow(dropInfo.sourceNode);

			this.addEmitter.emit(dropInfo);
		}
	}

	addPanel(d: DropInfo): void {
		let i = this.node.branches.indexOf(d.targetNode);
		let dir: CardinalDirection = d.direction;
		let orientation: NodeOrientation = this.orientation;
		let branches: NodeInterface.TreeNode[] = this.node.branches;

		if (dir === CardinalDirection.North && orientation === NodeOrientation.Horizontal
		 || dir === CardinalDirection.West && orientation === NodeOrientation.Vertical) {
			branches.splice(i, 0, d.sourceNode);
		} else if (dir === CardinalDirection.South && orientation === NodeOrientation.Horizontal
		 || dir === CardinalDirection.East && orientation === NodeOrientation.Vertical) {
			branches.splice(i+1, 0, d.sourceNode);
		} else {
			let n: NodeInterface.TreeNode = {
				branches: []
			};

			let removed: NodeInterface.TreeNode = branches.splice(i, 1, n)[0];

			if (dir === CardinalDirection.North || dir === CardinalDirection.West) {
				n.branches = [d.sourceNode, removed];
			} else {
				n.branches = [removed, d.sourceNode];
			}
		}
	}

	closePanel(): void {
		this.closeEmitter.emit(this.node);
	}

	deletePanel(childNode: NodeInterface.TreeNode): void {
		let i = this.node.branches.indexOf(childNode);
		if (0 <= i && i < this.node.branches.length) {
			this.node.branches.splice(i, 1);
		}

		if (this.node.branches.length == 1) {
			this.promoteEmitter.emit(this.node);
		}
	}

	promotePanel(childNode: NodeInterface.TreeNode): void {
		let i = this.node.branches.indexOf(childNode);
		if (0 <= i && i < this.node.branches.length && childNode.branches.length == 1) {
			if (childNode.branches[0].branches.length <= 1) {
				childNode.branches[0].size = this.node.branches[i].size;
				this.node.branches[i] = childNode.branches[0];
			} else {
				let removed: NodeInterface.TreeNode = this.node.branches.splice(i, 1)[0];
				childNode.branches[0].branches.forEach(function(d) {
					d.size = removed.size / childNode.branches[0].branches.length;
				});
				this.node.branches.splice.apply(this.node.branches, [<any>i, 0].concat(childNode.branches[0].branches));
			}
		}
	}

	constructor() { }
}
