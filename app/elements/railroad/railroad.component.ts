/*
 * Copyright Siemens AG, 2016
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
import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { RailroadService, Railroad, Station } from './railroad.service';
import { ContextMenuStatus } from './contextmenu.interface';
import { cubicBezier } from './cubic-bezier.functions';

const MIN_ZOOM: number = 0;
const INIT_ZOOM: number = 1000;
const MAX_ZOOM: number = 2000;
var xmlns = "http://www.w3.org/2000/svg";

interface EventInterface {
	(e: MouseEvent): void;
}

@Component({
	selector: 'ee-railroad',
	styles: [`
		svg {
			width: 100%;
			height: 100%;
		}

		span.zoomlevel {
			position:absolute;
			top:0px;
		}

		span.zoomlevel:hover {
			display:none;
		}

		svg .railroad {
			stroke-width: 2;
			stroke: black;
		}
	`],
	template: `
	<svg>
		<g class="sides">
			<g class="header">

			</g>
			<g class="left-side">

			</g>
			<g class="right-side">

			</g>
		</g>
		<g class="window">
			<path class="railroad"
				*ngFor="let track of railroad"
				d="M 50 50 h 50 l 25 25 v 50 l -25 25 h -50 Z"
				[items]="['New line', 'Delete line']"
				[contextMenu]="contextMenu"
				replaceContext>
			</path>
		</g>
	</svg>
	<context-menu [contextMenu]="contextMenu"></context-menu>
	<span class="zoomlevel">{{zoomlevel}}</span>
	`,
	providers: [RailroadService]
})

export class RailroadComponent implements OnInit {
	contextMenu: ContextMenuStatus = {
		show: false,
		items: [],
		x: 0,
		y: 0,
		target: undefined
	};

	zoomlevel: number = INIT_ZOOM;
	railroad: Railroad;
	stations: Station[];

	constructor(private er: ElementRef, private rs: RailroadService) { }

	ngOnInit() {
		this.er.nativeElement.addEventListener("mousewheel", (e: WheelEvent) => {
			this.addZoom(e.deltaY);
		});

		this.er.nativeElement.addEventListener("click", () => {
			console.log("Click context Railroad");
			this.contextMenu.show = false;
		});

		this.railroad = this.rs.getRailroad();
		this.stations = this.rs.getAllStations();
	}

	addZoom(zoom: number) {
		this.zoomlevel += zoom;

		if (this.zoomlevel > MAX_ZOOM) {
			this.zoomlevel = MAX_ZOOM;
		} else if (this.zoomlevel < MIN_ZOOM) {
			this.zoomlevel = MIN_ZOOM;
		}
	}

	select(item: string) {
		console.log(item);
	}
}
