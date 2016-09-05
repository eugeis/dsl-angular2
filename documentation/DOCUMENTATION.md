### Table of Contents
* [DSL-Code](#DSL-Code)
	* [Entity-Definition](#Entity-Definition)
	* [View-Definition](#View-Definition)
* [Modules](#Modules)
* [Windowmanager](#Windowmanager)
	* [Tree](#TreeStructure)
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

There are currently four modules in the application:

1. The root-module "AppComponent", which is used for bootstrapping the application
2. The view-module "ViewModule", which loads the [main-view](#View-Definition)-components, referenced view-components and control-components (this module might be later split up into several module, each module representing a main-view)
3. The windowmanager-module "WindowManagerModule", which organizes the tree-component and its related components
4. The drag-module "DragModule", which handles the components related to dragging (except for resizing which is done in ee-separator)

<a name="Windowmanager" />
# Windowmanager

![Screenshot of website focusing on the viewmanagement ](https://github.com/j-moeller/dsl-angular2/blob/8a2e86b7bba9c0746cc02cd6e3e880761e8ad913/documentation/assets/tree.png)

<a name="TreeStructure" />
## Tree-Structure

The windowstate is stored as a tree. Additionally, the nodes save the current configuration (size, orientation, children and - if it's a leaf-node - loaded panel). The image below shows the **start configuration for each of the following tree-modifications**.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/basic-tree.png)

### Adding a panel

Adding a panel is done by clicking the top-left button. A window is shown, where the user can select the panel content and the panel is add as the last element of the tree. Using drag and drop, the user can place the panel.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/add-tree.png)

### Closing a panel (Elevation 1)

Closing a panel is done by clicking the top-left button of a panel (marked with an 'x'). In the following example the red panel has been closed. Because this leaves the parent-node with one child remaining, the (only) child is elevated by one level and therefore replaces its parent.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/close-tree.png)

### Promoting panels (Elevation 2)

'Promoting' is a special closing-case and done when a node is left with one child, which isn't a panel leaf-node. Promoting elevates panels by two levels. If for example the green panel is closed, its parent is left with one child (the only child). If the only child were elevated by one level (therefore replaces its parent), the orientation of its children would be switched (thus messing up the configuration). Therefore, the only child's children are elevated by two levels, which preserves the orientation.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/promote-tree.png)


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
