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
import { Component, EventEmitter } from '@angular/core';

import { TaskExplorer_ } from '../../src-gen/views/task-explorer.component';
import { Entity } from '../../src-gen/entities/entity.model';
import { TaskLoader } from '../../src-gen/services/taskloader.service';
import { Table } from '../../elements/ee-table.component';

export const TaskExplorerSelector: string = 'task-explorer';

@Component({
	selector: TaskExplorerSelector,
	template: `
		<h2>TaskExplorer</h2>
		<input type="button" class="btn btn-default" (click)="onAction('add')" value="Add">
		<input type="button" class="btn btn-default" (click)="onAction('delete')" value="Delete">
		<ee-table [entities]="entities" (onSelect)="onSelect($event)"></ee-table>
	`,
	directives: [Table],
	providers: [TaskLoader]
})

export class TaskExplorer extends TaskExplorer_ {
	entities: Entity[] = [];

	constructor(public loader: TaskLoader) {
		super();
		this.onActionEmitter = new EventEmitter<any>();
		this.onSelectEmitter = new EventEmitter<any>();
	}

	ngOnInit() {
		super.ngOnInit();
		this.loader.getTasks().then((entities) => this.entities = entities);
	}

	onSelect(e) {
		this.onSelectEmitter.emit(e);
	}

	onAction(e) {
		this.onActionEmitter.emit(e);
	}
}
