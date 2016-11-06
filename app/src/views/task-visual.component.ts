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
import { Component } from '@angular/core';
import { ViewMetaData } from 'vindue';

import { TaskVisual_ } from '../../src-gen/views/task-visual.component';

export const metadata: ViewMetaData = {
	selector: 'task-visual',
	inputs: ["Task"],
	outputs: [],
	name: "TaskVisual"
}

@Component({
	selector: metadata.selector,
	template: `
		<ee-railroad></ee-railroad>
	`
})

export class Class extends TaskVisual_ {
	constructor() {
		super();
	}
}
