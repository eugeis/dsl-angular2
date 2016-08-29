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
import { Component, Input, ElementRef } from '@angular/core';

import { NodeOrientation, getClass } from './ee-nodeorientation.enum';

@Component({
	selector: 'ee-separator',
	styles: [`
		.ee-separator {
			background: transparent;
			width: 100%;
			height: 100%;
		}

		.ee-separator.hor {
			padding-top:1px;
			padding-bottom:1px;
			cursor: ns-resize;
		}

		.ee-separator.vert {
			padding-left:1px;
			padding-right:1px;
			cursor: ew-resize;
		}
	`],
	template: `
		<div class="ee-separator flex" [ngClass]="sepClass(orientation)"></div>
	`
})

export class SeparatorComponent {
	@Input() orientation: NodeOrientation;

	sepClass(orientation: NodeOrientation) {
		return getClass(orientation);
	}

	constructor(private er: ElementRef) {
		er.nativeElement.draggable = true;
	}
}
