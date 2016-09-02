### Table of Contents
* [DSL-Code](#DSL-Code)
	* [Entity-Definition](#Entity-Definition)
	* [View-Definition](#View-Definition)
* [Modules](#Modules)
* [Windowmanager](#Windowmanager)
	* [Tree](#Tree)
	* [Drag and Drop](#DnD)
	* [Separators / Resizing](#Separator)
* [Data sharing / Communication](#Datasharing)
	* [Viewmodel](#Viewmodel)
	* [Client-Server](#ClientServer)
* [Generation](#Generation)
	* [Views](#Views)
	* [Entities](#Entities)

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

Each view is bound to an entity, which is determined by the controls' types (in the above example its a little shady and overall implicit, that Task is the bound entity - this will be more explicit in coming versions of the DSL). These entities-bindings act like a viewmodel and therefore determine the displayed data.

<a name="Modules" />
# Modules

_coming soon_

<a name="Windowmanager" />
# Windowmanager

![](https://github.com/j-moeller/dsl-angular2/blob/8a2e86b7bba9c0746cc02cd6e3e880761e8ad913/documentation/assets/tree.png)

<a name="TreeStructure" />
## Tree-Structure

_coming soon_

<a name="DnD" />
## Drag and Drop

_coming soon_

<a name="Separator" />
## Separators / Resizing

_coming soon_

<a name="Datasharing" />
# Data sharing / Communication

_coming soon_

<a name="Viewmodel" />
## Viewmodel

_coming soon_

<a name="ClientServer" />
## Client-Server

_coming soon_

<a name="Generation" />
# Generation

_coming soon_

<a name="Views" />
## Views

_coming soon_

<a name="Entities" />
## Entities

_coming soon_
