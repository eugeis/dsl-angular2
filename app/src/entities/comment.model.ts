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
import { Comment_ } from '../../src-gen/entities/comment.model';
import { Task } from './task.model';

export class Comment extends Comment_ {
	task: Task;
	newTask: Task;

	constructor(id: number, dateOfCreation: Date) {
		super(id, dateOfCreation);
	}

	getType(): string {
		return "Comment";
	}
}
