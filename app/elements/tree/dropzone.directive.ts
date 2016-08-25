import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

import { DropInfo } from './dropinfo.model';
import { CardinalDirection } from './cardinaldirection.enum';

@Directive({
	selector: '[dropZone]'
})

export class DropZoneComponent implements OnInit {
	@Input() dropInfo: DropInfo;

	@HostListener('dragover', ['$event']) onDragOver(e) {
		this.dropInfo.direction = this.getCardinalDirection(e.offsetX,e.offsetY);
		this.dropInfo.display = true;
		e.preventDefault();
	}

	@HostListener('dragleave', ['$event']) onDragLeave(e) {
		this.dropInfo.display = false;
	}

	@HostListener('drop') onDrop() {
		this.dropInfo.display = false;
	}

	@HostListener('window:resize', ['$event']) onResize(event) {
		this.ngOnInit();
	}

	el: any;
	width: number;
	height: number;

	firstX: number;
	secondX: number;

	firstY: number;
	secondY: number;

	constructor(er: ElementRef) {
		this.el = er.nativeElement;
	}

	ngOnInit() {
		let goldenRatio = 1.618;

		this.width = this.el.clientWidth;
		this.height = this.el.clientHeight;

		this.firstX = this.width / (1 + goldenRatio + 1);
		this.secondX = this.width / (1 + goldenRatio + 1) * (goldenRatio + 1);

		this.firstY = this.height / (1 + goldenRatio + 1);
		this.secondY = this.height / (1 + goldenRatio + 1) * (goldenRatio + 1);
	}

	getCardinalDirection(x,y) {
		if (this.firstX <= x && x <= this.secondX) {
			if (this.firstY <= y && y <= this.secondY) {
				return CardinalDirection.Center;
			}
		}

		if (y < this.firstY) {
			if (this.firstX <= x && x <= this.secondX) {
				return CardinalDirection.North;
			}
		}

		if (this.secondY < y) {
			if (this.firstX <= x && x <= this.secondX) {
				return CardinalDirection.South;
			}
		}

		if (x < this.firstX) {
			if (this.firstY <= y && y <= this.secondY) {
				return CardinalDirection.West;
			}
		}

		if (this.secondX < x) {
			if (this.firstY <= y && y <= this.secondY) {
				return CardinalDirection.East;
			}
		}

		if (x < this.firstX && y < this.firstY) {
			if (y / x < this.firstY / this.firstX) {
				return CardinalDirection.Northwestnorth;
			} else {
				return CardinalDirection.Westnorthwest;
			}
		}

		if (this.secondX < x && y < this.firstY) {
			if (y / (this.width - x) < this.firstY / (this.width - this.secondX)) {
				return CardinalDirection.Northeastnorth;
			} else {
				return CardinalDirection.Eastnortheast;
			}
		}

		if (this.secondX < x && this.secondY < y) {
			if ((this.height - y) / (this.width - x) < (this.height - this.secondY) / (this.width - this.secondX)) {
				return CardinalDirection.Southeastsouth;
			} else {
				return CardinalDirection.Eastsoutheast;
			}
		}

		if (x < this.firstX && this.secondY < y) {
			if ((this.height - y) / x < (this.height - this.secondY) / this.firstX) {
				return CardinalDirection.Southwestsouth;
			} else {
				return CardinalDirection.Westsouthwest;
			}
		}
	}
}
