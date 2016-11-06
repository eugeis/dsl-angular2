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
import { ViewMetaData } from 'vindue';

import { TaskExplorer_ } from '../../src-gen/views/task-explorer.component';
import { TaskLoader } from '../services/taskloader.service';

export const metadata: ViewMetaData = {
	selector: 'task-explorer',
	inputs: ["Task[]"],
	outputs: ["Task"],
	name: "TaskExplorer"
}

@Component({
	selector: metadata.selector,
	template: `
		<input type="button" class="btn btn-default" (click)="onAction('add')" value="Add">
		<input type="button" class="btn btn-default" (click)="onAction('delete')" value="Delete">
		<ee-table [entities]="entities" (onSelect)="onSelect($event)"></ee-table>
	`,
	providers: [TaskLoader]
})

export class Class extends TaskExplorer_ {
	constructor(loader: TaskLoader) {
		super(loader);
	}
}
