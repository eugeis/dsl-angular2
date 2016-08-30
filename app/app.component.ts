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
import { Directive, Input, ComponentMetadata, ViewContainerRef, Compiler, ReflectiveInjector, ComponentMetadataFactory } from '@angular/core';

import { TreeComponent } from './elements/windowmanager/tree/ee-tree.component';
import { DragService } from './elements/drag/drag.service';

import { TaskDetails } from './src/views/task-details.component';
import { TaskExplorer } from './src/views/task-explorer.component';

@Component({
	selector: 'ee-app',
	template: `
		<ee-tree></ee-tree>
	`,
	directives: [TreeComponent, TaskDetails, TaskExplorer],
	providers: [DragService]
})

export class AppComponent { }
