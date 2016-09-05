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

import { DropZone } from '../drag/dropzone.directive';
import { DropIndicator } from '../drag/dropindicator.directive';
import { DropInfo } from '../drag/dropinfo.model';
import { CardinalDirection } from '../drag/cardinaldirection.enum';

import DataMapper = require('../tree/datamapper.function');
import NodeInterface = require('../node/treenode.interface');

interface ViewEvent {

}

interface ViewReactor {
	onSelect(ViewEvent): void;
	onAction(ViewEvent): void;
}

@Component({
	selector: 'ee-panel',
	styles: [`
		.ee-panel-hover {
			position: absolute;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.3;
			z-index: 100;
			pointer-events: none;
		}
	`],
	template: `
		<div class="ee-panel" [dropInfo]="dropInfo" (rearrange)="rearrange($event)" dropZone="'panel'">
			<div class="ee-panel-hover" [dropInfo]="dropInfo" *ngIf="dropInfo.display" dropIndicator></div>
			<div class="ee-panel-data" *componentOutlet="html; context:self; selector:'ee-panel-data'; imports:panelModules">{{data}}</div>
		</div>
	`
})

export class PanelComponent implements OnInit, ViewReactor {
	@Input() data: any;
	@Input() dataMapper: DataMapper.DataMapper;
	@Input() panelModules: any[];
	@Output("add") addEmitter: EventEmitter<DropInfo> = new EventEmitter<DropInfo>();

	html: string;
	self: PanelComponent = this;

	dropInfo: DropInfo;

	constructor() {
		this.dropInfo = new DropInfo();
	}

	ngOnInit() {
		if (this.data && this.dataMapper) {
			this.html = this.dataMapper.callback(this.data);
		}
	}

	onSelect(v: ViewEvent) {
		console.log(v);
	}

	onAction(v: ViewEvent) {
		console.log(v);
	}

	rearrange(node: NodeInterface.TreeNode) {
		switch(this.dropInfo.direction) {
			case CardinalDirection.Center:
			this.dropInfo.direction = CardinalDirection.Center;
			break;

			case CardinalDirection.North:
			case CardinalDirection.Northwestnorth:
			case CardinalDirection.Northeastnorth:
			this.dropInfo.direction = CardinalDirection.North;
			break;

			case CardinalDirection.South:
			case CardinalDirection.Southwestsouth:
			case CardinalDirection.Southeastsouth:
			this.dropInfo.direction = CardinalDirection.South;
			break;

			case CardinalDirection.West:
			case CardinalDirection.Westnorthwest:
			case CardinalDirection.Westsouthwest:
			this.dropInfo.direction = CardinalDirection.West;
			break;

			case CardinalDirection.East:
			case CardinalDirection.Eastnortheast:
			case CardinalDirection.Eastsoutheast:
			this.dropInfo.direction = CardinalDirection.East;
			break;

			default: break;
		}

		this.dropInfo.source = node;
		this.addEmitter.emit(this.dropInfo);
	}
}
