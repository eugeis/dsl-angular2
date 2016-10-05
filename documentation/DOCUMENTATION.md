### Table of Contents
* [DSL-Code](#DSL-Code)
	* [Entity-Definition](#Entity-Definition)
	* [View-Definition](#View-Definition)
* [Modules](#Modules)
* [Views](#Views)
* [Entities](#Entities)
* [Windowmanager / vindue](https://github.com/j-moeller/vindue/blob/master/DOCUMENTATION.md)

<a name="DSL-Code" />
# DSL-Code

The following examples are retrieved from the ee-mdd-project's [GenerateJSTask-File](https://github.com/eugeis/ee-mdd/blob/9d1df97df188a587fc7954e11e9d1deaea16745a/ee-mdd-gradle/src/test/groovy/ee/mdd/gradle/task/GenerateJsTest.groovy). Details unrelated to the view have been omitted.

<a name="Entity-Definition" />
## Entity-Definition

```
entity('Task') {
	prop('id', type: 'Long', primaryKey: true, unique: true)
	prop('comments', type: 'Comment', multi: true)
	prop('created', type: 'Date', unique: true)
	prop('closed', type: 'Date')
	prop('actions', type: 'TaskAction', multi: true )
	prop('size', type: 'int')
	prop('order', type: 'Long')
}

entity('Comment') {
	prop('id', type: 'Long', unique: true, primaryKey: true)
	prop('task', type: 'Task', opposite: 'comments')
	prop('testProp', type: 'Task', multi: true)
	prop('dateOfCreation', type: 'Date')
	prop('newTask', type: 'Task')
}

entity('TaskAction') {
	prop('id', type:'Long', unique:true, primaryKey:true)
	prop('task', type:'Task', opposite:'actions', description: '')
	prop('name', type:'String')
}
```

The DSL-model above declares three entites (_Task_, _Comment_, _TaskAction_), which can be represented by the following ER model.

![Er model](https://github.com/j-moeller/dsl-angular2/blob/8a2e86b7bba9c0746cc02cd6e3e880761e8ad913/documentation/assets/er-diagram.png)


<a name="View-Definition" />
## View-Definition

```
view ('TaskEditor', main: true) {
	viewRef(view: 'TaskExplorerView') {}
	viewRef(view: 'TaskDetailsView') {}
	viewRef(view: 'TaskSearchView') {}
	button('accept') { onAction() }
	button('discard') { onAction() }
}

view ('TaskExplorer') {
	button('addTask') { onAction() }
	button('deleteTask') { onAction() }
	table('tasks', type: 'Task') { onSelect() }
}

view ('TaskDetails') {
	table('actions', type: 'TaskAction') { onSelect() }
	table('comments', type: 'Comment') { onSelect() }
}

view ('TaskSearch') {
	table('actions', type: 'TaskAction') { onSelect() }
	button('search') { onAction() }
}
```

The above DSL-model defines four views: one main view called _TaskEditor_, and three referenced views (_TaskExplorer_, _TaskDetails_, _TaskSearch_). Each view contains control-elements (for simplicity reasons the example only contains buttons and tables).

Each view is bound to an entity, which is determined by the controls' types. These entities-bindings act like a viewmodel and therefore determine the displayed data.

<a name="Modules" />
# Modules

There are currently four modules in the application:

1. The root-module "AppComponent", which is used for bootstrapping the application (*app/app.module*)
2. The main-view-module "MainViewModule", which loads the [main-view](#View-Definition)-components (*app/src-gen/view-modules/mainview.module*)
3. The views-module "ViewsModule", which loads the referenced views-module (*app/src-gen/view-modules*)
4. The elements-module "ElementsModule", which loads the control-elements such as tables and buttons (*app/elements/elements.module*)

<a name="Views" />
## Views

Every view has four values:

- **selector** is a unique html-identifier, which angular uses to load the view as a component

- **inputs** is an array of entity-names, which can be used to load data into the view

- **outputs** is an array of entity-names, which the view can output (i.e. when a user selects a specific task, the task is an output of the view)

- **providers** is an array of services used by the view to load content

- **Base-class** extends the View-class defined in *app/src-gen/views/view.component* and provides basic functionality

<a name="Entities" />
## Entities

Every entity inherits from the Entity-class (*app/src-gen/entities/entity.model*) and therfore has a set of properties. Each property has a name (e.g. 'id'), a type (e.g. 'number') and a value (e.g. '3').
