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
import { Component, OnInit } from '@angular/core';
import { ViewMetaData } from 'vindue';

import { TaskActionLoader } from '../services/taskactionloader.service';
import { TaskSearch_ } from '../../src-gen/views/task-search.component';

export const metadata: ViewMetaData = {
	selector: 'task-search',
	inputs: ["Task"],
	outputs: ["TaskAction"],
	name: "TaskSearch"
}

export const selector = 'task-search';
export const inputs: string[] = ["Task"];
export const outputs: string[] = ["TaskAction"];
export const name: string = "TaskSearch";


@Component({
	selector: metadata.selector,
	template: `
		<ee-table [entities]="entities" (onSelect)="onSelect($event)"></ee-table>
		<input type="button" class="btn btn-default" (click)="onAction('search')" value="Search">
	`,
	providers: [TaskActionLoader]
})

export class Class extends TaskSearch_ {
	constructor(tloader: TaskActionLoader) {
		super(tloader);
	}
}
