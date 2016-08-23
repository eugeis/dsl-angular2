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
import { Component, Input } from '@angular/core';

import { TreeHeaderComponent } from './ee-tree-header.component';
import { NodeComponent, Node } from './node.component';
import { NodeOrientation } from './nodeorientation.enum';

export interface Tree extends Node {
	orientation: NodeOrientation
}

@Component({
	selector: 'ee-tree',
	template: `
		<div *ngIf="tree && tree.orientation" class="ee-tree">
			<ee-tree-header></ee-tree-header>
			<ee-node [node]="tree" [orientation]="tree.orientation"></ee-node>
		</div>
	`,
	directives: [TreeHeaderComponent, NodeComponent]
})

export class TreeComponent {
	@Input() tree: Tree = {
		orientation: NodeOrientation.Vertical,
		branches: [{
			branches: [],
			data: "View 1"
		}, {
			branches: [{
				branches: [],
				data: "View 2"
			},{
				branches: [{
					branches: [],
					data: "View 1"
				}, {
					branches: [{
						branches: [],
						data: "View 2"
					},{
						branches: [],
						data: "View 3"
					}]
				}, {
					branches: [],
					data: "View 4"
				}, {
					branches: [],
					data: "View 5"
				}, {
					branches: [],
					data: "View 6"
				}]
			}]
		}, {
			branches: [],
			data: "View 4"
		}, {
			branches: [],
			data: "View 5"
		}, {
			branches: [],
			data: "View 6"
		}]
	};

	constructor() {
	}
}

/*
function() {
	var self = this;

	self.format = function(data) {
		if (data.mainViews) {
			self.mainViews = data.mainViews;
		}
		if (data.panels) {
			data.panels.forEach(function(d, i) {
				d.parent = data;
				if (d.panels && !d.split) {
					d.split = (d.parent.split === "hor") ? "vert" : "hor";
				}
				if (!d.panels && !d.tabs) {
					d.tabs = self.mainViews.slice();
				}
				self.format(d);
			});
		}
		return data;
	}

	self.delete = function(needle) {
		self.$delete(self.tree, needle);
		self.save();
	}

	self.$delete = function(haystack, needle) {
		if (haystack.panels) {
			var pos = haystack.panels.indexOf(needle);
			if (pos >= 0) {
				delete needle.parent;
				delete needle.panels;
				haystack.panels.splice(pos, 1);
				if (haystack.panels.length == 1) {
					self.tidy(haystack);
				}
			} else {
				haystack.panels.forEach(function(d, i) {
					self.$delete(d, needle);
				});
			}
		}
	}

	self.tidy = function(haystack) {
		if (haystack.parent) {
			var parent = haystack.parent;
			var pos = parent.panels.indexOf(haystack);
			if (haystack.panels[0].panels) {
				self.calcSizes(haystack, haystack.panels[0].panels);
				self.adoptGreatGrandChildren(haystack, parent, pos);
			} else {
				self.adoptGrandChildren(haystack, parent,pos);
			}
			delete haystack.parent;
			delete haystack.panels;
		} else {
			if (haystack.panels[0].panels) {
				self.crowning(haystack);
			} else {
				haystack.panels[0].size = 1;
			}
		}
	}

	self.calcSizes = function(haystack, grandchildren) {
		var sum = grandchildren.reduce(function(a,b) {
			return +a.size + +b.size;
		});

		grandchildren.forEach(function(d) {
			d.size = +d.size / sum * +haystack.size;
		});
	}

	self.adoptGreatGrandChildren = function(haystack, parent, pos) {
		parent.panels.splice(pos, 1);
		haystack.panels[0].panels.forEach(function(d,i) {
			d.parent = parent;
		});

		parent.panels.splice.apply(parent.panels, [pos, 0].concat(haystack.panels[0].panels));
	}

	self.adoptGrandChildren = function(haystack, parent, pos) {
		haystack.panels[0].parent = parent;
		haystack.panels[0].size = haystack.size;
		parent.panels[pos] = haystack.panels[0];
	}

	self.crowning = function(haystack) {
		self.tree = haystack.panels[0];
		delete self.tree.size;
		delete self.tree.parent;
	}

	self.save = function() {
		var json = {};
		json.split = self.tree.split;
		json.panels = [];

		self.$save(json.panels, self.tree.panels);

		localStorage.setItem('state',JSON.stringify(json));
	}

	self.$save = function(json, tree) {
		tree.forEach(function(d, i) {
			if (d.panels) {
				json.push({
					size: d.size,
					panels: []
				});
				self.$save(json[i].panels, d.panels);
			} else {
				json.push({
					size: d.size,
					view: d.view,
					tabs: d.tabs,
					selected: d.selected
				})
			}
		});
	}
}*/
