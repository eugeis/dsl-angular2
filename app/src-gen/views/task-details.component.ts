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
import { CommentLoader } from '../../src/services/commentloader.service';

import { Entity } from '../entities/entity.model';
import { tasks } from '../services/server.mockup';

export namespace TaskDetails_ {
	export const selector: string = 'task-details';
	export const inputs: string[] = ["Task"];
	export const outputs: string[] = ["TaskAction", "Comment"];

	export const providers = [TaskActionLoader, CommentLoader]

	export class Base extends View {
		cEntities: Entity[] = [];
		tEntities: Entity[] = [];

		oldTask: any;

		constructor(public tloader: TaskActionLoader, public cloader: CommentLoader) {
			super();
		}

		ngDoCheck() {
			if (this.viewModel.value.inputs) {
				if (this.viewModel.value.inputs.value) {
					if (this.viewModel.value.inputs.value.task) {
						if (this.viewModel.value.inputs.value.task != this.oldTask) {
							this.cloader.getComments().then((entities) => {
								this.cEntities = entities.filter((element) => {
									return element.task === this.viewModel.value.inputs.value.task;
								});
							});
							this.tloader.getTaskActions().then((entities) => {
								this.tEntities = entities.filter((element) => {
									return element.task === this.viewModel.value.inputs.value.task;
								});
							});

							this.oldTask = this.viewModel.value.inputs.value.task;
						}
					}
				}
			}
		}

		onSelect(e) {
			this.onEmitter.emit({
				event: e,
				type: "Select"
			});
		}
	}
}
