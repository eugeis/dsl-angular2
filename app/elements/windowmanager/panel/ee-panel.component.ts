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

import { DropZone } from '../../drag/dropzone.directive';
import { DropIndicator } from '../../drag/dropindicator.directive';
import { DropInfo } from '../../drag/dropinfo.model';
import { CardinalDirection } from '../../drag/cardinaldirection.enum';

@Component({
	selector: 'ee-panel',
	styles: [".ee-panel-data { padding: 4px;}"],
	template: `
		<div class="ee-panel flex" [dropInfo]="dropInfo" (rearrange)="rearrange($event)" dropZone="'panel'">
			<div class="ee-panel-hover" [dropInfo]="dropInfo" *ngIf="dropInfo.display" dropIndicator></div>
			<div class="ee-panel-data">{{data}}</div>
		</div>
	`,
	directives: [DropZone, DropIndicator]
})

export class PanelComponent {
	@Input() data: any;
	@Output("add") addEmitter = new EventEmitter();

	dropInfo: DropInfo;

	constructor() {
		this.dropInfo = new DropInfo();
	}

	rearrange(node) {
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

		this.addEmitter.emit({
			dropInfo: this.dropInfo,
			sourceNode: node
		});
	}
}
