import { Directive, Input, ElementRef } from '@angular/core';

import { CardinalDirection } from  './cardinaldirection.enum';
import { DropInfo } from './dropinfo.model';

@Directive({ selector: '[dropIndicator]' })
export class DropIndicator {
	@Input() dropInfo: DropInfo;
	oldDropInfo: DropInfo;

	el: any;

	constructor (er: ElementRef) {
		this.el = er.nativeElement;
		this.oldDropInfo = new DropInfo();
	}

	ngDoCheck() {
		if (this.dropInfo) {
			if (this.dropInfo.direction !== this.oldDropInfo.direction) {
				switch(this.dropInfo.direction) {
					case CardinalDirection.Center:
					this.el.style.width = "100%";
					this.el.style.height = "100%";
					this.el.style.top = "0";
					this.el.style.left = "0";
					break;

					case CardinalDirection.North:
					case CardinalDirection.Northwestnorth:
					case CardinalDirection.Northeastnorth:
					this.el.style.width = "100%";
					this.el.style.height = "50%";
					this.el.style.top = "0";
					this.el.style.left = "0";
					break;

					case CardinalDirection.South:
					case CardinalDirection.Southwestsouth:
					case CardinalDirection.Southeastsouth:
					this.el.style.width = "100%";
					this.el.style.height = "50%";
					this.el.style.top = "50%";
					this.el.style.left = "0";
					break;

					case CardinalDirection.West:
					case CardinalDirection.Westnorthwest:
					case CardinalDirection.Westsouthwest:
					this.el.style.width = "50%";
					this.el.style.height = "100%";
					this.el.style.top = "0";
					this.el.style.left = "0";
					break;

					case CardinalDirection.East:
					case CardinalDirection.Eastnortheast:
					case CardinalDirection.Eastsoutheast:
					this.el.style.width = "50%";
					this.el.style.height = "100%";
					this.el.style.top = "0";
					this.el.style.left = "50%";
					break;

					default: break;
				}

				this.oldDropInfo.direction = this.dropInfo.direction;
			}
		}
	}
}
