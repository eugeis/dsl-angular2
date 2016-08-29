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

import { TreeView } from './ee-treeview.component';
import { TreeHeaderComponent } from './ee-tree-header.component';
import { Node } from '../node/ee-node.interface';
import { NodeComponent } from '../node/ee-node.component';
import { NodeOrientation } from '../node/ee-nodeorientation.enum';

export interface Tree extends Node {
	orientation: NodeOrientation
}

@Component({
	selector: 'ee-tree',
	template: `
		<div *ngIf="tree && tree.orientation" class="ee-tree">
			<ee-tree-header></ee-tree-header>
			<ee-node [node]="tree" [orientation]="tree.orientation"></ee-node>
			<ee-tree-view [tree]="tree"></ee-tree-view>
		</div>
	`,
	directives: [TreeHeaderComponent, NodeComponent, TreeView]
})

export class TreeComponent {
	@Input() tree: Tree = {
		orientation: NodeOrientation.Vertical,
		branches: [{
			branches: [],
			data: "a"
		}, {
			branches: [{
				branches: [],
				data: "b"
			},{
				branches: [{
					branches: [],
					data: "c"
				}, {
					branches: [{
						branches: [],
						data: "d"
					},{
						branches: [],
						data: "e"
					}]
				}, {
					branches: [],
					data: "f"
				}, {
					branches: [],
					data: "g"
				}, {
					branches: [],
					data: "h"
				}]
			}]
		}, {
			branches: [],
			data: "i"
		}, {
			branches: [],
			data: "j"
		}, {
			branches: [],
			data: "k"
		}]
	};

	constructor() {
	}
}
