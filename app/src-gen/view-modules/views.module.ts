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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { TaskDetails } from '../../src/views/task-details.component';
import { TaskExplorer } from '../../src/views/task-explorer.component';
import { TaskSearch } from '../../src/views/task-search.component';
import { TaskVisual } from '../../src/views/task-visual.component';

import { ElementsModule } from '../../elements/elements.module';
import { RailroadModule } from '../../elements/railroad/railroad.module';

@NgModule({
	imports: [BrowserModule, FormsModule, CommonModule, ElementsModule],
	declarations: [TaskDetails, TaskExplorer, TaskSearch, TaskVisual],
	providers: [],
	exports: [TaskDetails, TaskExplorer, TaskSearch, TaskVisual]
})

export class ViewsModule { }
