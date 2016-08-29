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

import { Node } from '../node/ee-node.interface';
import { DragStart } from '../../drag/dragstart.directive';

@Component({
	selector: 'ee-panel-header',
	styles: [`
		.panel-space {
			margin-left: auto;
		}
		.panel-icon {
			flex: 0 !important;
			padding: 4px;
		}
		.panel-icon span {
			font-weight: bold;
			padding: 5px 12px 5px 12px;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color 50ms ease-in 0s;
			border: 1px solid transparent;
		}

		.panel-icon span:hover {
			border: 1px solid #aaa;
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
	@Input() node: any;	//Node
	@Output("close") closeEmitter = new EventEmitter();

	constructor() { }

	close() {
		this.closeEmitter.emit();
	}
}
