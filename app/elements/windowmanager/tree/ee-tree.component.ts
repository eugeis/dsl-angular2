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

import { TreeHeaderComponent } from './ee-tree-header.component';
import { NodeComponent } from '../node/ee-node.component';
import { NodeOrientation } from '../node/ee-nodeorientation.enum';

import { StringFilterPipe } from './stringfilter.pipe';
import { LimitPipe } from './limit.pipe';

import NodeInterface = require('../node/ee-treenode.interface');

export interface Tree extends NodeInterface.TreeNode {
	orientation: NodeOrientation
}

@Component({
	selector: 'ee-tree',
	styles: [`
		.empty-window {
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,0.8);
			position: relative;
		}

		.empty-window-wrapper {
			display: block;
			position: relative;
			top: 18%;
			text-align: center;
		}

		.empty-window-wrapper input {
			width: 450px;
			height: 45px;
			font-size: 16pt;
			text-align: center;
			border-radius: 20px;
			outline: 0px !important;
		}

		.empty-window-wrapper input:before {
			width: 20px;
			height: 30px;
			background: black;
		}

		.empty-window-gallery {
			margin: 40px
		}

		.empty-window-gallery li {
			display: inline-flex;
			background: white;
			margin: 20px;
			padding: 15px 20px 15px 20px;
			border-radius: 10px;
			cursor: pointer;
		}

		.empty-window-gallery li:hover {
			background: grey;
		}
	`],
	template: `
		<div [hidden]="tree.branches.length == 0 || adding" class="ee-tree">
			<ee-tree-header (click)="showAdd()"></ee-tree-header>
			<ee-node [node]="tree" [orientation]="tree.orientation"></ee-node>
		</div>
		<div [hidden]="tree.branches.length > 0 && !adding" class="empty-window">
			<div class="empty-window-wrapper">
				<input type="text" [(ngModel)]="needle" placeholder="Type in the view you want to open..." autofocus>
				<div class="empty-window-gallery">
					<ul>
						<li *ngFor="let v of windows | LimitPipe:20 | StringFilterPipe:needle" (click)="add(v)">
							{{v}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	`,
	directives: [TreeHeaderComponent, NodeComponent],
	pipes: [StringFilterPipe, LimitPipe]
})

export class TreeComponent {
	@Input() windows: string[];

	adding: boolean = false;
	needle: string = "";

	tree: Tree = {
		orientation: NodeOrientation.Vertical,
		branches: []
	};

	constructor() {
	}

	showAdd() {
		this.adding = true;
	}

	hideAdd() {
		this.adding = false;
	}

	add(view: string) {
		this.tree.branches.push({
			branches: [],
			data: view
		});
		this.hideAdd();
	}
}
