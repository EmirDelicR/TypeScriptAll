const AutoBind = (
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };

  return adjustedDescriptor;
};

/************** Validation Decorator  ******************/
interface Validate {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (input: Validate) => {
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

/** #################################################### */
enum ProjectStatus {
  Active,
  Finished
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

/** #################################################### */
interface UserInput {
  title: string;
  description: string;
  people: number;
}

type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(fn: Listener) {
    this.listeners.push(fn);
  }

  addProject(obj: UserInput) {
    const id = Math.random().toString();
    const newProject = new Project(
      id,
      obj.title,
      obj.description,
      obj.people,
      ProjectStatus.Active
    );

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects]);
    }
  }
}

const projectState = ProjectState.getInstance();
/** #################################################### */

class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    /** Access elements */
    this.templateEl = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    /** copy all from template element in index.html */
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });

      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.attachToHostElement();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attachToHostElement() {
    this.hostEl.insertAdjacentElement("beforeend", this.element);
  }
}

/** #################################################### */

class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLFormElement;

  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    /** Access elements */
    this.templateEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById("app")! as HTMLDivElement;

    /** copy all from template element in index.html */
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

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
    this.attachToHostElement();
  }

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

  /** Configure event listener to element */
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attachToHostElement() {
    this.hostEl.insertAdjacentElement("afterbegin", this.element);
  }
}

const project = new ProjectInput();
const activeList = new ProjectList("active");
const finishedList = new ProjectList("finished");
