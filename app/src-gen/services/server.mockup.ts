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
import { Task } from '../../src/entities/task.model';
import { Comment } from '../../src/entities/comment.model';
import { TaskAction } from '../../src/entities/taskaction.model';

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const tasks: Task[] = [
	new Task(1, randomDate(new Date(1970, 1, 1), new Date(1980, 1, 1)), randomDate(new Date(1980, 1, 1), new Date(1990, 1, 1)), 20, 60),
	new Task(2, randomDate(new Date(1990, 1, 1), new Date(2000, 1, 1)), randomDate(new Date(2000, 1, 1), new Date(2010, 1, 1)), 40, 20)
];

export const taskactions: TaskAction[] = [
	new TaskAction(1, "TaskAction1"),
	new TaskAction(2, "TaskAction2"),
	new TaskAction(3, "TaskAction3")
];

export const comments: Comment[] = [
	new Comment(1, randomDate(new Date(1970, 1, 1), new Date())),
	new Comment(2, randomDate(new Date(1970, 1, 1), new Date())),
	new Comment(3, randomDate(new Date(1970, 1, 1), new Date()))
];

tasks[0].comments = [comments[0],comments[1]];
comments[0].task = tasks[0];
comments[1].task = tasks[0];

tasks[1].comments = [comments[2]];
comments[2].task = tasks[1];

tasks[0].actions = [taskactions[0], taskactions[1]];
taskactions[0].task = tasks[0];
taskactions[1].task = tasks[0];

tasks[1].actions = [taskactions[2]];
taskactions[2].task = tasks[1];
