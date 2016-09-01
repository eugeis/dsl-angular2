import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskEditor } from './task-editor.component';
import { ViewBarrel } from './viewbarrel.model';

import { WindowManagerModule } from '../../elements/windowmanager/windowmanager.module';
import { Table } from '../../elements/ee-table.component';

@NgModule({
	imports: [CommonModule, FormsModule, WindowManagerModule],
	declarations: [<any>Table, TaskEditor].concat(ViewBarrel),
	exports: [<any>Table, TaskEditor].concat(ViewBarrel),
	providers: []
})

export class ViewModule { }
