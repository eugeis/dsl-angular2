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
import { Input, Component, OnChanges, DoCheck } from '@angular/core';

import { Wrapper } from '../wrapper.model';

@Component({
	selector: 'statusbar',
	styles: [`
	.progressbar {
		background-color: #eee;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
		border-radius: 10px;
	}

	.progressvalue {
		border-radius: 2px;
		background-size: 35px 20px, 100% 100%, 100% 100%;
		border-radius: 10px;

		background-image:
		linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),
		linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25));

		background-image:
		-webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),
		-webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25));

		background-image:
		-moz-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),
		-moz-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25));

		background-image:
		-o-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%),
		-o-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25));

		background-color: grey;
		height: 100%;
	}
	`],
	template: `
		<div *ngIf="value">
			<div class="progressbar" [ngStyle]="{'width': barWidth+'px', 'height': barHeight+'px'}">
				<div class="progressvalue" [ngStyle]="{'width': value.value+'%', 'background-color': backgroundStyle}"></div>
			</div>
			{{value.value}}%
		</div>
	`
})

export class Statusbar implements DoCheck {
	@Input() barWidth: number = 200;
	@Input() barHeight: number = 20;
	@Input() value: Wrapper;

	backgroundStyle: string = "red";
	oldValue: number = -1;

	ngDoCheck() {
		if (this.value && +this.value.value >= 0) {
		let p = this.value.value;
			if (p !== this.oldValue) {
				this.oldValue = p;
				this.backgroundStyle = this.getColor(p);
			}
		}
	}

	getColor(p: number): string {
		if (p < 50) {
			return "rgb(" + 255 + "," + (p/50.0 * 255) + "," + 0 + ")";
		} else {
			return "rgb(" + (100-p)/50.0 * 255 + "," + 255 + "," + 0 + ")";
		}
	}
}
