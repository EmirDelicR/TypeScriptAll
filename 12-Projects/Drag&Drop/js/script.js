"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**************** AUTO BIND function *******************/
const AutoBind = (_, _2, descriptor) => {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
};
const validate = (input) => {
    let isValid = true;
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
/** ##################### Project Class ############################### */
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(fn) {
        this.listeners.push(fn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(obj) {
        const id = Math.random().toString();
        const newProject = new Project(id, obj.title, obj.description, obj.people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const currentProject = this.projects.find(prj => prj.id === projectId);
        if (currentProject && currentProject.status !== newStatus) {
            currentProject.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }
}
const projectState = ProjectState.getInstance();
class Component {
    constructor(ids, insertAtStart) {
        /** Access elements */
        this.templateEl = document.getElementById(ids.templateId);
        this.hostEl = document.getElementById(ids.hostElementId);
        /** copy all from template element in index.html */
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (ids.newElementId) {
            this.element.id = ids.newElementId;
        }
        /** Execute functions */
        this.attachToHostElement(insertAtStart);
    }
    attachToHostElement(insertAtStart) {
        this.hostEl.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
/** ##########################  ProjectItem Class ################################### */
class ProjectItem extends Component {
    constructor(hostId, project) {
        super({
            templateId: "single-project",
            hostElementId: hostId,
            newElementId: project.id
        }, false);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        return `${this.project.people} persons`;
    }
    dragStartHandler(event) {
        console.log(event);
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log("Drag end: ", event);
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = `${this.persons} assigned!`;
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
/** ##########################  ProjectList Class ################################### */
class ProjectList extends Component {
    constructor(type) {
        super({
            templateId: "project-list",
            hostElementId: "app",
            newElementId: `${type}-projects`
        }, false);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    configure() {
        /** Register listener for Drag and drop */
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        /** Register listener and assign relevant projects */
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(`${this.type}-projects-list`, prjItem);
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
/** ###################### ProjectInput Class ############################## */
class ProjectInput extends Component {
    constructor() {
        super({
            templateId: "project-input",
            hostElementId: "app",
            newElementId: "user-input"
        }, true);
        /** Query other elements in form */
        this.titleInputEl = this.element.querySelector("#title");
        this.descriptionInputEl = this.element.querySelector("#description");
        this.peopleInputEl = this.element.querySelector("#people");
        /** Execute functions */
        this.configure();
    }
    /** Configure event listener to element */
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    clearInputs() {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    }
    gatherUserInput() {
        const title = this.titleInputEl.value;
        const description = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;
        const titleValidator = {
            value: title,
            required: true
        };
        const descValidator = {
            value: description,
            required: true,
            minLength: 5
        };
        const peopleValidator = {
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
    }
    /** Submit function to add to element event listener */
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject({ title, description: desc, people });
            this.clearInputs();
        }
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
/** ################################################################## */
const project = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
