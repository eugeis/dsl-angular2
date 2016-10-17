import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { ContextMenu } from './contextmenu.component';
import { ReplaceContext } from './replace-context.directive';
import { RailroadComponent } from './railroad.component';

import { RailroadService } from './railroad.service';

@NgModule({
	imports: [BrowserModule, FormsModule, CommonModule],
	declarations: [RailroadComponent, ContextMenu, ReplaceContext],
	providers: [RailroadService],
	exports: [RailroadComponent, ContextMenu, ReplaceContext]
})
export class RailroadModule { }
