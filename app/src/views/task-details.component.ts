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
import { Component, EventEmitter, Input } from '@angular/core';

import { TaskDetails_ } from '../../src-gen/views/task-details.component';
import { TaskActionLoader } from '../services/taskactionloader.service';
import { CommentLoader } from '../services/commentloader.service';

export const TaskDetailsSelector: string = TaskDetails_.selector;
export const TaskDetailsInputs: string[] = TaskDetails_.inputs;
export const TaskDetailsOutputs: string[] = TaskDetails_.outputs;

@Component({
	selector: TaskDetailsSelector,
	template: `
		<ee-table (onSelect)="onSelect($event)" [entities]="cEntities"></ee-table>
		<ee-table (onSelect)="onSelect($event)" [entities]="tEntities"></ee-table>
	`,
	providers: [TaskActionLoader, CommentLoader]
})

export class TaskDetails extends TaskDetails_.Base {
	constructor(tloader: TaskActionLoader, cloader: CommentLoader) {
		super(tloader, cloader);
	}
}
