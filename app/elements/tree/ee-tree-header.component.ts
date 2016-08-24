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
import { Component } from '@angular/core';

@Component({
	selector: 'ee-tree-header',
	styles: [`
	ee-tree-header {
		display: flex;
	}
	.tree-header {
		width: 100%;
		background: linear-gradient(to bottom, rgba(244,244,244,1) 0%,rgba(247,247,247,1) 100%);
		height: 35px;
		border-bottom: 1px solid gainsboro;
		margin-bottom: 3px;
	}
	`],
	template: `
		<div class="tree-header flex"></div>
	`,
	directives: []
})

export class TreeHeaderComponent {
	constructor() {
	}
}
