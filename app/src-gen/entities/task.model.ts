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
import { Entity } from './entity.model';
import { Comment } from '../../src/entities/comment.model';
import { TaskAction } from '../../src/entities/taskaction.model';

export abstract class Task_ extends Entity {
	actions: TaskAction[];
	comments: Comment[];

	constructor(public id: number,
		public created: Date,
		public closed: Date,
		public size: number,
		public order: number) {
		super(["id", "created", "closed", "size", "order", "comments", "actions"]);
	}

	getType(): string {
		return "Task";
	}
}
