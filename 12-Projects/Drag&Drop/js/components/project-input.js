var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base.js";
import { validate } from "../utils/validation.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
export class ProjectInput extends Component {
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
