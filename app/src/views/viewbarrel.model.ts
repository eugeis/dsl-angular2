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
import { Map } from 'vindue';

import { TaskDetailsSelector, TaskDetailsInputs, TaskDetailsOutputs } from './task-details.component';
import { TaskExplorerSelector, TaskExplorerInputs, TaskExplorerOutputs } from './task-explorer.component';
import { TaskSearchSelector, TaskSearchInputs, TaskSearchOutputs } from './task-search.component';
import { TaskVisualSelector, TaskVisualInputs, TaskVisualOutputs } from './task-visual.component';

export const views: string[] = ["TaskDetails", "TaskExplorer", "TaskSearch", "TaskVisual"];

export function mapViewToHtmlElement(view: string): string {
	let selector = "";
	switch(view) {
		case "TaskDetails": selector = TaskDetailsSelector; break;
		case "TaskExplorer": selector = TaskExplorerSelector; break;
		case "TaskSearch": selector = TaskSearchSelector; break;
		case "TaskVisual": selector = TaskVisualSelector; break;
		default: throw "No such view";
	}

	return getElementFromSelector(selector);
}

export function mapViewToInputElement(view: string): string[] {
	switch(view) {
		case "TaskDetails": return TaskDetailsInputs;
		case "TaskExplorer": return TaskExplorerInputs;
		case "TaskSearch": return TaskSearchInputs;
		case "TaskVisual": return TaskVisualInputs;
		default: throw "No such view";
	}
}

export function mapViewToOutputElement(view: string): string[] {
	switch(view) {
		case "TaskDetails": return TaskDetailsOutputs;
		case "TaskExplorer": return TaskExplorerOutputs;
		case "TaskSearch": return TaskSearchOutputs;
		case "TaskVisual": return TaskVisualOutputs;
		default: throw "No such view";
	}
}

/**
 * NEVER EVER let the user input the 'selector'-argument directly
 *
 * Instead, let the user choose predetermined values, which should match
 * one of the angular2-selectors in your components.
 */
function getElementFromSelector(selector: string): string {
	return `<` + selector + `
	[model]="context.model"
	(on)="context.onPanelAction($event)"
	></` + selector + `>`;
}
