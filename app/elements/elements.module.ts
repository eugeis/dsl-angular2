import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { Table } from './ee-table.component';
import { RailroadModule } from 'railroad';

@NgModule({
	imports: [BrowserModule, FormsModule, CommonModule, RailroadModule],
	declarations: [Table],
	providers: [],
	exports: [Table, RailroadModule]
})
export class ElementsModule {

}
