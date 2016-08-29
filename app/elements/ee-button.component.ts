/*
 * Copyright 2015-2016 the original author or authors.
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
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ee-button',
	styles: [`

	`],
	template: `
		<div *ngIf="buttonClass">
			<div *ngIf="value">
				<input type="button" [ngModel]="value" [ngClass]="buttonClass">
			</div>
		</div>
	`,
})

export class Button implements OnInit{
	@Input() value: string;
	@Input() buttonType: string;

	buttonClass: string;

	ngOnInit() {
		if (!this.value) {
			this.value = this.buttonType;
		}

		switch(this.buttonType) {
			case "Accept": this.buttonClass = "btn-acc"; break;
			case "Decline": this.buttonClass = "btn-dec"; break;
			case "Add": this.buttonClass = "btn-add"; break;
			case "Delete": this.buttonClass = "btn-del"; break;
			case "Search": this.buttonClass = "btn-sea"; break;
			default: this.buttonClass = "btn-info";
		}
	}
}
