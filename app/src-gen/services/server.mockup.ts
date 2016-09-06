import { Task } from '../../src/entities/task.model';
import { Comment } from '../../src/entities/comment.model';
import { TaskAction } from '../../src/entities/taskaction.model';


export const tasks: Task[] = [
	new Task(1, new Date(), new Date(), 10, 10),
	new Task(2, new Date(), new Date(), 20, 20)
];

export const taskactions: TaskAction[] = [
	new TaskAction(1, "TaskAction1"),
	new TaskAction(2, "TaskAction2"),
	new TaskAction(3, "TaskAction3")
];

export const comments: Comment[] = [
	new Comment(1, new Date()),
	new Comment(2, new Date()),
	new Comment(3, new Date())
];

tasks[0].comments = [comments[0],comments[1]];
comments[0].task = tasks[0];
comments[1].task = tasks[0];

tasks[1].comments = [comments[2]];
comments[2].task = tasks[1];

tasks[0].taskactions = [taskactions[0], taskactions[1]];
taskactions[0].task = tasks[0];
taskactions[1].task = tasks[0];

tasks[1].taskactions = [taskactions[2]];
taskactions[2].task = tasks[1];
