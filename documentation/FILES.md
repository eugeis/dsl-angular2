```
.
├── app/
│   ├── elements/
│   │   ├── ee-button.component.ts
│   │   ├── ee-table.component.ts
│   │   └── elements.module.ts
│   ├── src-gen/
│   │   ├── entities/
│   │   │   ├── comment.model.ts
│   │   │   ├── entity.model.ts
│   │   │   ├── taskaction.model.ts
│   │   │   └── task.model.ts
│   │   ├── services/
│   │   │   ├── commentloader.service.ts
│   │   │   ├── server.mockup.ts
│   │   │   ├── taskactionloader.service.ts
│   │   │   └── taskloader.service.ts
│   │   ├── view-modules/
│   │   │   ├── mainview.module.ts
│   │   │   └── views.module.ts
│   │   └── views/
│   │       ├── task-details.component.ts
│   │       ├── task-editor.component.ts
│   │       ├── task-explorer.component.ts
│   │       ├── task-search.component.ts
│   │       ├── task-visual.component.ts
│   │       ├── view.component.ts
│   │       └── viewmodel.component.ts
│   ├── src/
│   │   ├── entities/
│   │   │   └── ***.model.ts
│   │   ├── services/
│   │   │   └── ***.service.ts
│   │   └── views/
│   │       ├── ***.component.ts
│   │       └── viewbarrel.model.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── main.ts
├── dist/
├── documentation/
├── templates/
│   ├── index.html.template
│   └── main.ts.template
├── typings/
│
├── gulpfile.js
├── index.html
├── karma.conf.js
├── karma-test-shim.js
├── package.json
├── style.css
├── systemjs.config.js
├── tsconfig.json
└── typings.json
```

## app/

Contains the application's source-code

**app/app.component**

Defines the application's main component, which is used in the app/app.module

**app/app.module**

Defines the application's main module, which is used for bootstrapping

**app/main**

This file is generated from *templates/main.ts.template* and bootstraps the application. The bootstrapping is either done in production mode or development mode.

## app/elements/

Contains the control-elements used in the views (such as tables, buttons)

**app/elements/ee-button.component**

A button, which is used in accordance with the dsl-defintions of a button .

```
@Input value: The displayed name of the button.
@Input buttonType: The type of the button (accept, decline, add, delete, search)
```

**app/elements/ee-table.component**

A table, which is used to display dsl-entities.

```
@Input entities: An array of entities, whose properties are displayed in a table-format.
@Output onSelect: Emits an event, when a cell is clicked
format:
{
	entity	//The clicked entity (row)
	prop	//The clicked property (column)
}
```

**app/elements/elements.module**

A module containing all elements defined in *app/elements*

## app/src-gen

Contains the generated classes of the application, which provide basic functionality. The base classes are not directly instantiated, rather the *app/src*-classes inherit from the base classes and extend their functionality. The complete *app/src-gen*-Folder may be overwritten by the dsl-generator when regenerating.

## app/src-gen/entities/

This directory contains all the entities used throughout the application. Each entity inherits from the base class defined in *app/src-gen/entities/entity.model*.

## app/src-gen/services/

This directory contains the services (e.g. a services for loading some entity).

## app/src-gen/views/

This directory contains the views defined in the dsl. Every view-component defines the following values:
  - **selector** is a unique html-identifier, which angular uses to load the view as a component

  - **inputs** is an array of entity-names, which can be used to load data into the view

  - **outputs** is an array of entity-names, which the view can output (i.e. when a user selects a specific task, the task is an output of the view)

  - **providers** is an array of services used by the view to load content

  - **Base-class** extends the View-class defined in *app/src-gen/views/view.component* and provides basic functionality

For more information about the input/output concept of the view, see the documentation.

## app/src

Contains mostly classes, which are used in the application and inherit from the classes generated to *app/src-gen*. This allows the programmer to easily extend the base functionality of the generated classes. These extension will _not_ be overwritten by the dsl-generator.

## app/src/entities/ && app/src/services/ && app/src/views/

See app/src-gen/*** for more information

**app/src/views/viewbarrel.model**

Defines functions for mapping views to their
  - selectors (mapViewToHtmlElement)
  - inputs (mapViewToInputElement)
  - outputs (mapViewToOutputElement)

## dist/

Contains the files ready for distribution. Depending on the build-mode (production / development) vendor files and configuration files are either bundled or distributed separately.

## documentation/

Contains the documentation and its assets

## templates/

Contains various templates, from which the task-runner (gulp) generates additional files, whose content depends on the build-mode (production / development).

**templates/index.html.template**

The index file contains either a dependency to bundled and minified vendor files or it load its dependencies in separated files.

Generated file: *index.html*

**templates/main.ts.template**

The main file bootstraps the application. If the building ist done in production mode, angular's production mode is enabled.

Generated file: *app/main.ts*
