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

import { Entity } from '../src-gen/entities/entity.model';

@Component({
	selector: 'ee-table',
	template: `
		<div *ngIf="entities && entities.length > 0">
			<table class="table table-hover">
				<tr *ngIf="entities[0] && entities[0].props">
					<td *ngFor="let header of entities[0].props">{{header}}</td>
				</tr>
				<tr *ngFor="let entity of entities">
					<td *ngFor="let prop of entity.props" (click)="click(entity, prop)">{{entity[prop]}}</td>
				</tr>
			</table>
		</div>
	`,
})

export class EE_Table {
	@Input() id: string = "default";
	@Input() entities: Entity[];

	@Output() selected = new EventEmitter();

	click(entity, prop) {
		this.selected.emit({
			entity: entity,
			prop: prop
		});
	}
}
