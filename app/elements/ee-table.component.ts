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
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Entity } from '../src-gen/entities/entity.model';

interface TableOutput {
	entity: Entity;
	prop: string;
}

@Component({
	selector: 'ee-table',
	styles: [`
		.table-header {
			white-space: nowrap;
			display: flex;;
		}

		.table-header span {
			flex: 1;
		}

		.table-header .empty {
			margin-left: auto;
		}

		.table-header .glyphicon {
			flex: 0 !important;
			padding: 3px;
			padding-left: 6px;
		}

		.table-header .glyph-hidden {
			visibility: hidden;
		}
	`],
	template: `
		<div *ngIf="entities && entities.length > 0">
			<table class="table table-hover table-condensed table-bordered">
				<tr *ngIf="entities[0] && entities[0].props">
					<td *ngFor="let header of entities[0].props" (click)="changeSorting(header)">
						<span class="table-header">
							<span>{{header}}</span>
							<span class="empty"></span>
							<span class="glyphicon"
								[ngClass]="{
									'glyph-hidden': header !== sortKey,
									'glyphicon-triangle-top': asc,
									'glyphicon-triangle-bottom': !asc}">
							</span>
						</span>
					</td>
				</tr>
				<tr *ngFor="let entity of entities" [ngClass]="{'active': selected === entity}">
					<td *ngFor="let prop of entity.props" (click)="click(entity, prop)">{{entity[prop]}}</td>
				</tr>
			</table>
		</div>
	`,
})

export class Table implements OnChanges {
	@Input() entities: Entity[];

	@Output("onSelect") selectEmitter: EventEmitter<TableOutput> = new EventEmitter<TableOutput>();

	selected: Entity;
	sortKey: string;
	asc: boolean;

	click(entity: Entity, prop: string) {
		this.selectEmitter.emit({
			entity: entity,
			prop: prop
		});
	}

	changeSorting(header) {
		if (this.sortKey === header) {
			this.asc = !this.asc;
		} else {
			this.sortKey = header;
			this.asc = true;
		}

		this.sort();
	}

	sort() {
		this.entities.sort((a,b) => {
			let factor: number = ((this.asc) ? 1 : -1);

			if (a[this.sortKey] < b[this.sortKey]) {
				return -1 * factor;
			} else if (a[this.sortKey] === b[this.sortKey]) {
				return 0
			} else {
				return 1 * factor;
			}
		});
	}

	ngOnChanges() {
		this.sort();
	}
}
