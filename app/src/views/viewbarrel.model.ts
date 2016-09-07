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
import { TaskDetails, TaskDetailsSelector } from './task-details.component';
import { TaskExplorer, TaskExplorerSelector } from './task-explorer.component';
import { TaskSearch, TaskSearchSelector } from './task-search.component';

export const ViewBarrelStrings = [
	"TaskDetails", "TaskExplorer", "TaskSearch"
];

export const ViewBarrel = [
	TaskDetails, TaskExplorer, TaskSearch
];

export function mapViewToHtmlElement(view: string): string {
	let selector = "";
	switch(view) {
		case "TaskDetails": selector = TaskDetailsSelector; break;
		case "TaskExplorer": selector = TaskExplorerSelector; break;
		case "TaskSearch": selector = TaskSearchSelector; break;
		default: throw "up";
	}

	return getElementFromSelector(selector);
}

function getElementFromSelector(selector: string): string {
	return `<` + selector + `
	[model]="self.model"
	(on)="self.onPanelAction($event)"
	></` + selector + `>`;
}
