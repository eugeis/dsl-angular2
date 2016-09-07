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
import { Component, EventEmitter } from '@angular/core';

import { TaskExplorer_ } from '../../src-gen/views/task-explorer.component';
import { Entity } from '../../src-gen/entities/entity.model';
import { TaskLoader } from '../../src-gen/services/taskloader.service';
import { Table } from '../../elements/ee-table.component';

export const TaskExplorerSelector: string = 'task-explorer';

@Component({
	selector: TaskExplorerSelector,
	template: `
		<input type="button" class="btn btn-default" (click)="onAction('add')" value="Add">
		<input type="button" class="btn btn-default" (click)="onAction('delete')" value="Delete">
		<ee-table [selected]="viewModel.task" [entities]="entities" (onSelect)="onSelect($event)"></ee-table>
	`,
	providers: [TaskLoader]
})

export class TaskExplorer extends TaskExplorer_ {
	entities: Entity[] = [];

	constructor(public loader: TaskLoader) {
		super();

		loader.getTasks().then((tasks) => this.entities = tasks);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onSelect(e) {
		this.viewModel.task = e.entity;

		this.onEmitter.emit({
			event: e,
			type: "Select"
		});
	}

	onAction(e) {
		this.onEmitter.emit({
			event: e,
			type: "Action"
		});
	}
}
