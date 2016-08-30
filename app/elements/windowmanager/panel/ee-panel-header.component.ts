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
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DragStart } from '../../drag/dragstart.directive';
import NodeInterface = require('../node/ee-treenode.interface');

@Component({
	selector: 'ee-panel-header',
	styles: [`
		.panel-space {
			margin-left: auto;
		}

		ee-panel-header {
			display: flex;
		}

		.panel-header {
			width: 100%;
			background: gainsboro;
		}`],
	template: `
		<div class="panel-header flex" [close]="closeEmitter" [node]="node" dragStart="'panel'">
			<div class="panel-space flex"></div>
			<!--<div class="panel-icon flex"><span (click)="minimize()">_</span></div>-->
			<div class="panel-icon flex"><span (click)="close()">x</span></div>
		</div>
	`,
	directives: [DragStart]
})

export class PanelHeaderComponent {
	@Input() node: NodeInterface.TreeNode;
	@Output("close") closeEmitter: EventEmitter<void> = new EventEmitter<void>();

	constructor() { }

	close(): void {
		this.closeEmitter.emit();
	}
}
