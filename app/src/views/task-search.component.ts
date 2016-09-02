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
import { Component, OnInit } from '@angular/core';

import { TaskActionLoader } from '../../src-gen/services/taskactionloader.service';
import { TaskSearch_ } from '../../src-gen/views/task-search.component';
import { Entity } from '../../src-gen/entities/entity.model';

export const TaskSearchSelector:string = 'task-search';

@Component({
	selector: TaskSearchSelector,
	template: `
		<ee-table [entities]="entities" (onSelect)="onSelect($event)"></ee-table>
		<input type="button" class="btn btn-default" (click)="onAction('search')" value="Search">
	`,
	providers: [TaskActionLoader]
})

export class TaskSearch extends TaskSearch_ {
	entities: Entity[] = [];

	constructor(public tloader: TaskActionLoader) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();
		this.tloader.getTaskActions().then((entities) => this.entities = entities);
	}

	onSelect(e) {
		this.onSelectEmitter.emit(e);
	}

	onAction(e) {
		this.onActionEmitter.emit(e);
	}
}
