import { Draggable } from "../interfaces/drag-drop.js";
import { TRANSFER_TYPE } from "../utils/constants.js";
import { Component } from "./base.js";
import { Project } from "../models/project.js";
import { AutoBind } from "../decorators/autobind.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    }

    return `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super(
      {
        templateId: "single-project",
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
    console.log(event);
    event.dataTransfer!.setData(TRANSFER_TYPE, this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(event: DragEvent) {
    console.log("Drag end: ", event);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned!`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
