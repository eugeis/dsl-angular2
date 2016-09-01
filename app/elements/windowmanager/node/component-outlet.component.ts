import { NgModule, Component, ComponentFactory, ComponentMetadata, NgModuleMetadataType,
	Directive, Input, ViewContainerRef, Compiler, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ViewModule } from '../../../src/views/view.module';

@Directive({
	selector: '[componentOutlet]',
})
export class ComponentOutlet {
	@Input('componentOutlet') private template: string;
	@Input('componentOutletSelector') private selector: string;
	@Input('componentOutletContext') private context: Object;

	constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {

	}

	private _createDynamicComponent() {
		const metadata = new ComponentMetadata({
			selector: this.selector,
			template: this.template,
		});

		const cmpClass = class _ { };
		cmpClass.prototype = this.context;

		let component = Component(metadata)(cmpClass);

		const mdClass = class _ { };
		mdClass.prototype = {};
		return NgModule({
			imports: [BrowserModule, FormsModule, ViewModule],
			declarations: [component],
			exports: [component],
			providers: []
		})(mdClass);
	}

	ngOnChanges() {
		let self = this;

		if (!self.template) return;
		self.compiler.compileModuleAndAllComponentsAsync(self._createDynamicComponent())
		.then(factory => {
			const injector = ReflectiveInjector.fromResolvedProviders([], self.vcRef.parentInjector);

			let component = factory.componentFactories.find((d) => {
				if (d.selector === self.selector) {
					return true;
				}
			});

			this.vcRef.createComponent(component, 0, injector);
		});
	}
}
