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
		.add-window {
			height: 100%;
			width: 100%;
			background: rgba(0,0,0,0.8);
			position: relative;
		}

		.add-window .closer {
			margin: 0px auto;
			position: relative;
			width: 450px;
		}

		.add-window .closer span {
			position: absolute;
			top: -40px;
			right: -50px;
			background: white;
			padding: 6px 12px 6px 12px;
			border-radius: 20px;
			line-height: 20px;
			font-weight: bold;
			font-size: 12pt;
			cursor: pointer;
		}

		.add-window .closer:hover span {
			background: grey;
		}

		.add-window-wrapper {
			display: block;
			position: relative;
			top: 18%;
			text-align: center;
		}

		.add-window-wrapper input {
			width: 450px;
			height: 45px;
			font-size: 16pt;
			text-align: center;
			border-radius: 20px;
			outline: 0px !important;
		}

		.add-window-wrapper input:before {
			width: 20px;
			height: 30px;
			background: black;
		}

		.add-window-gallery {
			margin: 40px
		}

		.add-window-gallery li {
			display: inline-flex;
			background: white;
			margin: 20px;
			padding: 15px 20px 15px 20px;
			border-radius: 10px;
			cursor: pointer;
		}

		.add-window-gallery li:hover {
			background: grey;
		}
	`],
	template: `
		<div [hidden]="tree.branches.length == 0 || addWindow" class="ee-tree">
			<ee-tree-header (click)="showAddWindow()"></ee-tree-header>
			<ee-node [node]="tree" [orientation]="tree.orientation"></ee-node>
		</div>
		<div [hidden]="tree.branches.length > 0 && !addWindow" class="add-window">
			<div class="add-window-wrapper">
				<div *ngIf="addWindow" class="closer" (click)="hideAddWindow()"><span>x</span></div>
				<input type="text" [(ngModel)]="needle" placeholder="Type in the view you want to open..." autofocus>
				<div class="add-window-gallery">
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

	addWindow: boolean = false;
	needle: string = "";

	tree: Tree = {
		orientation: NodeOrientation.Vertical,
		branches: []
	};

	constructor() {
	}

	showAddWindow() {
		this.addWindow = true;
	}

	hideAddWindow() {
		this.addWindow = false;
	}

	add(view: string) {
		this.tree.branches.push({
			branches: [],
			data: view
		});
		this.hideAddWindow();
	}
}
