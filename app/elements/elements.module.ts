import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { Table } from './ee-table.component';
import { D3View } from './d3view.component';

@NgModule({
	imports: [BrowserModule, FormsModule, CommonModule],
	declarations: [Table, D3View],
	providers: [],
	exports: [Table, D3View]
})
export class ElementsModule { }
