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
	return "<" + selector + "></" + selector + ">";
}
