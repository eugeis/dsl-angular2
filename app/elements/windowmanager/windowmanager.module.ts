import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Drag-Elements */
import { DragModule } from './drag/drag.module';

/* Node-Elements */
import { NodeComponent } from './node/node.component';
import { SeparatorComponent } from './node/separator.component';

/* Panel-Elements */
import { PanelHeaderComponent } from './panel/panel-header.component';
import { PanelComponent } from './panel/panel.component';

/* Pipes */
import { StringFilterPipe } from './pipes/stringfilter.pipe';
import { LimitPipe } from './pipes/limit.pipe';

/* TrElements */
import { TreeComponent } from './tree/tree.component';
import { TreeHeaderComponent } from './tree/tree-header.component';

//import { ComponentOutlet } from 'angular2-component-outlet';
import { ComponentOutlet } from './node/component-outlet.component';

@NgModule({
	imports: [CommonModule, FormsModule, DragModule],
	declarations: [TreeComponent, TreeHeaderComponent, PanelHeaderComponent,
		PanelComponent, NodeComponent, SeparatorComponent,
		StringFilterPipe, LimitPipe, ComponentOutlet],
	exports: [TreeComponent],
	providers: []
})

export class WindowManagerModule { }
