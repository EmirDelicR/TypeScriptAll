/*************** Drag and Drop Interface **************/
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

/**************** AUTO BIND function *******************/

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

  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.trim().length >= input.minLength;
  }

  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.trim().length <= input.maxLength;
  }

  if (input.min != null && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min;
  }

  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max;
  }

  return isValid;
};

/** ##################### Project Class ############################### */
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

/** ###################### State Class ##################################### */
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(fn: Listener<T>) {
    this.listeners.push(fn);
  }
}

/** ###################### Project State Class ############################## */
interface UserInput {
  title: string;
  description: string;
  people: number;
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
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
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    /* TODO fix this
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners()
    }
    */
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects]);
    }
  }
}

const projectState = ProjectState.getInstance();

/** ##########################  Component Base Class ################################### */

/**
 * This is an abstract class - that means that can only be inherit and not be an instance
 */
interface templateIdConfig {
  templateId: string;
  hostElementId: string;
  newElementId?: string;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(ids: templateIdConfig, insertAtStart: boolean) {
    /** Access elements */
    this.templateEl = document.getElementById(
      ids.templateId
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById(ids.hostElementId)! as T;
    /** copy all from template element in index.html */
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (ids.newElementId) {
      this.element.id = ids.newElementId;
    }

    /** Execute functions */
    this.attachToHostElement(insertAtStart);
  }

  private attachToHostElement(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

/** ##########################  ProjectItem Class ################################### */

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    }

    return `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super(
      {
        templateId: 'single-project',
        hostElementId: hostId,
        newElementId: project.id
      },
      false
    );

    this.project = project;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @AutoBind
  dragEndHandler(event: DragEvent) {
    console.log('Drag end: ', event);
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.persons} assigned!`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

/** ##########################  ProjectList Class ################################### */

class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super(
      {
        templateId: 'project-list',
        hostElementId: 'app',
        newElementId: `${type}-projects`
      },
      false
    );

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  configure() {
    /** Register listener for Drag and drop */
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    /** Register listener and assign relevant projects */
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') {
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
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
    // todo REMOVE THIS
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(`${this.type}-projects-list`, prjItem);
    }
  }
}

/** ###################### ProjectInput Class ############################## */

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super(
      {
        templateId: 'project-input',
        hostElementId: 'app',
        newElementId: 'user-input'
      },
      true
    );

    /** Query other elements in form */
    this.titleInputEl = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;

    this.peopleInputEl = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    /** Execute functions */
    this.configure();
  }

  /** Configure event listener to element */
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputEl.value = '';
    this.descriptionInputEl.value = '';
    this.peopleInputEl.value = '';
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
      console.log('Input is wrong!');
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

/** ################################################################## */
const project = new ProjectInput();
const activeList = new ProjectList('active');
const finishedList = new ProjectList('finished');
