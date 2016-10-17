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
import { Directive, Input, ElementRef, OnInit } from '@angular/core';

import { ContextMenuStatus } from './contextmenu.interface';

@Directive({
	selector: '[replaceContext]'
})

export class ReplaceContext implements OnInit {
	@Input() contextMenu: ContextMenuStatus;
	@Input() items: string[];

	constructor(private er: ElementRef) { }

	ngOnInit() {
		this.er.nativeElement.addEventListener("contextmenu", (e: MouseEvent) => {
			this.contextMenu.items = this.items;
			this.contextMenu.x = e.layerX;
			this.contextMenu.y = e.layerY;
			this.contextMenu.show = true;
			this.contextMenu.target = this.er.nativeElement;

			e.preventDefault();
		});
	}
}