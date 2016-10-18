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
import { fromSVGScale, calcTranslate, cursorPoint, calcZoom } from './railroad.functions';

var xmlns = "http://www.w3.org/2000/svg";

interface EventInterface<T> {
	(e: T): void;
}

@Component({
	selector: 'ee-railroad',
	styles: [`
		svg {
			width: 100%;
			height: 100%;
			border: 1px solid #000;
		}

		.railroad {
			flex-direction: column;
			height: 100%;
		}

		.railroad > .main {
			flex-direction: row;
		}

		.railroad, .main, .window, .stations, .stations > div {
			display: flex;
			flex: 1;
		}

		.stations > div {
			justify-content: center;
			min-width: 100px;
		}

		.header {
			height: 30px;
		}

		.side {
			width: 30px;
		}

		span.zoomlevel {
			position:absolute;
			top:0px;
		}

		span.zoomlevel:hover {
			display:none;
		}

		.sides .header rect {
			width: 100%;
			height: 30px;
			fill: grey;
		}

		.track {
			fill: transparent;
			stroke: black;
			stroke-width: 2;
		}
	`],
	template: `
	<div class="railroad">
		<div class="header">
			<div class="stations">
				<div *ngFor="let station of stations">{{station}}</div>
			</div>
		</div>
		<div class="main">
			<div class="left side"></div>
			<div class="window">
				<svg>
					<g [attr.transform]="'translate(' + translate[0] + ',' + translate[1] + ')scale(' + zoomlevel + ')'">
						<path class="track"
							*ngFor="let track of mockup"
							[attr.d]="track"
							[items]="['New line', 'Delete line']"
							[contextMenu]="contextMenu"
							replaceContext>
						</path>
					</g>
				</svg>
			</div>
			<div class="right side"></div>
			<context-menu [contextMenu]="contextMenu"></context-menu>
		</div>
		<div class="footer">
			<input type="text" [(ngModel)]="zoomlevel">
			<input type="text" [(ngModel)]="translate[0]">
			<input type="text" [(ngModel)]="translate[1]">
			<span id="abc"></span>
			<span id="xyz"></span>
			<slider [(value)]="zoomlevel" [min]="zoomborder[0]"></slider>
		</div>
	</div>
	`,
	providers: [RailroadService]
})

export class RailroadComponent implements OnInit {
	mockup = [
		"M 100 100 h 100 v 100 h -100 Z",
		"M 400 200 h 100 v 100 h -100 Z",
		"M 800 600 h 100 v 100 h -100 Z",
		"M 800 200 h 100 v 100 h -100 Z",
		"M 300 600 h 100 v 100 h -100 Z",
		"M10 10 C 20 80, 40 20, 50 10",
		"M70 10 C 70 20, 120 20, 520 10",
		"M130 10 C 20 320, 180 220, 170 10",
		"M180 60 C 570 480, 170 80, 120 60",
		"M250 60 C 120 280, 780 80, 670 60"
	]

	contextMenu: ContextMenuStatus = {
		show: false,
		items: [],
		x: 0,
		y: 0,
		target: undefined
	};

	zoomlevel: number = 1;
	zoomborder: [number, number] = [0.05, 100];
	translate: [number, number] = [0, 0];

	railroad: Railroad;
	stations: Station[];

	constructor(private er: ElementRef, private rs: RailroadService) { }

	ngOnInit() {
		let svg = this.er.nativeElement.querySelector("svg");

		if (!svg) {
			throw "No svg element found";
		}

		let pt = svg.createSVGPoint();

		svg.addEventListener("mousewheel", (e: WheelEvent) => {
			this.contextMenu.show = false;
			this.zooming(cursorPoint(svg, pt, e), e.deltaY);
		});

		svg.addEventListener("click", () => {
			this.contextMenu.show = false;
		});

		svg.addEventListener("mousedown", (e: MouseEvent) => {
			if (e.button != 0) {
				return
			};

			let move: EventInterface<MouseEvent> = (e: MouseEvent) => { };

			let unregister: EventInterface<MouseEvent> = (e: MouseEvent) => {
				document.removeEventListener("mousemove", move);
				document.removeEventListener("mouseup", unregister);
			};

			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", unregister);
		});

		svg.addEventListener("contextmenu", (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
		});

		this.railroad = this.rs.getRailroad();
		this.stations = this.rs.getAllStations();
	}

	zooming(mousePos: SVGPoint, delta: number) {
		let oldZoomlevel = +this.zoomlevel;
		let newZoomlevel = calcZoom(-delta, oldZoomlevel, this.zoomborder[0], this.zoomborder[1]);

		this.translate = calcTranslate(mousePos, oldZoomlevel, newZoomlevel, this.translate[0], this.translate[1]);
		this.zoomlevel = newZoomlevel;
	}

	select(item: string) {
		console.log(item);
	}
}
