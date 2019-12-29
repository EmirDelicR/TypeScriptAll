"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var AutoBind = function (_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
};
var validate = function (input) {
    var isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.trim().length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.trim().length <= input.maxLength;
    }
    if (input.min != null && typeof input.value === "number") {
        isValid = isValid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === "number") {
        isValid = isValid && input.value <= input.max;
    }
    return isValid;
};
/** #################################################### */
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    };
    ProjectState.prototype.addListener = function (fn) {
        this.listeners.push(fn);
    };
    ProjectState.prototype.addProject = function (obj) {
        var id = Math.random().toString();
        var newProject = new Project(id, obj.title, obj.description, obj.people, ProjectStatus.Active);
        this.projects.push(newProject);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(__spreadArrays(this.projects));
        }
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
/** #################################################### */
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        this.assignedProjects = [];
        /** Access elements */
        this.templateEl = document.getElementById("project-list");
        this.hostEl = document.getElementById("app");
        /** copy all from template element in index.html */
        var importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = this.type + "-projects";
        projectState.addListener(function (projects) {
            var relevantProjects = projects.filter(function (project) {
                if (_this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            _this.assignedProjects = relevantProjects;
            _this.renderProjects();
        });
        this.attachToHostElement();
        this.renderContent();
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById(this.type + "-projects-list");
        listEl.innerHTML = "";
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            var listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    };
    ProjectList.prototype.attachToHostElement = function () {
        this.hostEl.insertAdjacentElement("beforeend", this.element);
    };
    return ProjectList;
}());
/** #################################################### */
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        /** Access elements */
        this.templateEl = document.getElementById("project-input");
        this.hostEl = document.getElementById("app");
        /** copy all from template element in index.html */
        var importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        /** Query other elements in form */
        this.titleInputEl = this.element.querySelector("#title");
        this.descriptionInputEl = this.element.querySelector("#description");
        this.peopleInputEl = this.element.querySelector("#people");
        /** Execute functions */
        this.configure();
        this.attachToHostElement();
    }
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    };
    ProjectInput.prototype.gatherUserInput = function () {
        var title = this.titleInputEl.value;
        var description = this.descriptionInputEl.value;
        var people = this.peopleInputEl.value;
        var titleValidator = {
            value: title,
            required: true
        };
        var descValidator = {
            value: description,
            required: true,
            minLength: 5
        };
        var peopleValidator = {
            value: +people,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidator) ||
            !validate(descValidator) ||
            !validate(peopleValidator)) {
            console.log("Input is wrong!");
            return;
        }
        return [title, description, +people];
    };
    /** Submit function to add to element event listener */
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            projectState.addProject({ title: title, description: desc, people: people });
            this.clearInputs();
        }
    };
    /** Configure event listener to element */
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener("submit", this.submitHandler);
    };
    ProjectInput.prototype.attachToHostElement = function () {
        this.hostEl.insertAdjacentElement("afterbegin", this.element);
    };
    __decorate([
        AutoBind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var project = new ProjectInput();
var activeList = new ProjectList("active");
var finishedList = new ProjectList("finished");
