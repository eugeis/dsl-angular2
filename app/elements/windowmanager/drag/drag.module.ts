import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Drag-Elements */
import { DragService } from './drag.service';
import { DragStart } from './dragstart.directive';
import { DropIndicator } from './dropindicator.directive';
import { DropZone } from './dropzone.directive';

@NgModule({
	imports: [ CommonModule, FormsModule ],
	declarations: [ DragStart, DropIndicator, DropZone],
	exports: [ DragStart, DropIndicator, DropZone ],
	providers: [ DragService ]
})

export class DragModule { }
