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
import { View } from 'vindue';

import { TaskLoader } from '../../src/services/taskloader.service';

import { Entity } from '../entities/entity.model';
import { tasks } from '../services/server.mockup';

import { set } from 'vindue';

export class TaskExplorer_ extends View {
	entities: Entity[] = [];

	constructor(public loader: TaskLoader) {
		super();
		loader.getTasks().then((tasks) => this.entities = tasks);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onSelect(e) {
		set(this.viewModel, "task", e.entity);

		this.onEmitter.emit({
			event: e,
			type: "Select"
		});
	}

	onAction(e) {
		this.onEmitter.emit({
			event: e,
			type: "Action"
		});
	}
}
