import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { TaskDetails } from './task-details.component';
import { TaskExplorer } from './task-explorer.component';
import { TaskSearch } from './task-search.component';

import { Table } from '../../elements/ee-table.component';

@NgModule({
	imports: [BrowserModule, FormsModule, CommonModule],
	declarations: [Table, TaskDetails, TaskExplorer, TaskSearch],
	providers: [],
	exports: [TaskDetails, TaskExplorer, TaskSearch]
})

export class ViewsModule { }
