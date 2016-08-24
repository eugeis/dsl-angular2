import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

enum CardinalDirection {
	North, West, East, South, Center,
	Northwestnorth, Northeastnorth,
	Westnorthwest, Westsouthwest,
	Eastnortheast, Eastsoutheast,
	Southwestsouth, Southeastsouth
}

@Directive({
	selector: '[dropZone]'
})

export class DropZone implements OnInit{
	el: any;
	width: number;
	height: number;

	firstX: number;
	secondX: number;

	firstY: number;
	secondY: number;

	@HostListener('mousemove', ['$event']) onMouseMove(e) {
		let x = e.offsetX;
		let y = e.offsetY;

		console.log();

		switch(this.getCardinalDirection(x,y)) {
			case CardinalDirection.Center:
			this.el.style.background = "#fff";
			break;

			case CardinalDirection.North:
			case CardinalDirection.Northwestnorth:
			case CardinalDirection.Northeastnorth:
			this.el.style.background = "#f00";
			break;

			case CardinalDirection.South:
			case CardinalDirection.Southwestsouth:
			case CardinalDirection.Southeastsouth:
			this.el.style.background = "#000";
			break;

			case CardinalDirection.West:
			case CardinalDirection.Westnorthwest:
			case CardinalDirection.Westsouthwest:
			this.el.style.background = "#0f0";
			break;

			case CardinalDirection.East:
			case CardinalDirection.Eastnortheast:
			case CardinalDirection.Eastsoutheast:
			this.el.style.background = "#00f";
			break;

			default: throw "up";
		}

		/*
		this.el.style.background = "rgba(255,255,255,1)";
		this.el.style.background = "#00ffff";
		this.el.style.background = "#ff00ff";
		this.el.style.background = "#ffff00";
		this.el.style.background = "#000000";
		this.el.style.background = "#4dffb3";
		this.el.style.background = "#b3ff4d";
		this.el.style.background = "#36b3b3";
		this.el.style.background = "#364d4d";
		this.el.style.background = "#ff4db3";
		this.el.style.background = "#ffb34d";
		this.el.style.background = "#ff4db3";
		this.el.style.background = "#ffb34d";
		*/
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.highlight(null);
	}

	@HostListener('window:resize', ['$event']) onResize(event) {
		this.ngOnInit();
	}

	private highlight(color: string) {
		this.el.style.backgroundColor = color;
	}

	constructor(er: ElementRef) {
		this.el = er.nativeElement;
		this.el.style.display = "block";
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
