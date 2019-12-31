import { Component } from "./base.js";
import { Validate } from "../interfaces/helpers.js";
import { validate } from "../utils/validation.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super(
      {
        templateId: "project-input",
        hostElementId: "app",
        newElementId: "user-input"
      },
      true
    );

    /** Query other elements in form */
    this.titleInputEl = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;

    this.peopleInputEl = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    /** Execute functions */
    this.configure();
  }

  /** Configure event listener to element */
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputEl.value = "";
    this.descriptionInputEl.value = "";
    this.peopleInputEl.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputEl.value;
    const description = this.descriptionInputEl.value;
    const people = this.peopleInputEl.value;

    const titleValidator: Validate = {
      value: title,
      required: true
    };

    const descValidator: Validate = {
      value: description,
      required: true,
      minLength: 5
    };

    const peopleValidator: Validate = {
      value: +people,
      required: true,
      min: 1,
      max: 5
    };
    if (
      !validate(titleValidator) ||
      !validate(descValidator) ||
      !validate(peopleValidator)
    ) {
      console.log("Input is wrong!");
      return;
    }
    return [title, description, +people];
  }

  /** Submit function to add to element event listener */
  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject({ title, description: desc, people });
      this.clearInputs();
    }
  }
}
