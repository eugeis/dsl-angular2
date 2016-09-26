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
import { View } from './view.component';

import { TaskActionLoader } from '../../src/services/taskactionloader.service';

import { Entity } from '../entities/entity.model';

export namespace TaskSearch_ {
	export const selector = 'task-search';
	export const inputs: string[] = ["Task"];
	export const outputs: string[] = ["TaskAction"];

	export const providers = [];

	export class Base extends View {
		entities: Entity[] = [];

		oldTask: any;

		constructor(public tloader: TaskActionLoader) {
			super();
		}

		ngDoCheck() {
			let viewModelTask = this.viewModel.getFromInput("task");
			if (viewModelTask != this.oldTask) {
				this.tloader.getTaskActions().then((entities) => {
					this.entities = entities.filter((element) => {
						return element.task === viewModelTask;
					});
				});

				this.oldTask = viewModelTask;
			}
		}

		onSelect(e) {
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
}
