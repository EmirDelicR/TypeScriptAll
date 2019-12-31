import { TRANSFER_TYPE } from "../utils/constants.js";
import { DragTarget } from "../interfaces/drag-drop.js";
import { Component } from "./base.js";
import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { Project, ProjectStatus } from "../models/project.js";
import { ProjectItem } from "./project-item.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super(
      {
        templateId: "project-list",
        hostElementId: "app",
        newElementId: `${type}-projects`
      },
      false
    );

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === TRANSFER_TYPE) {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData(TRANSFER_TYPE);
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  configure() {
    /** Register listener for Drag and drop */
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    /** Register listener and assign relevant projects */
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
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(`${this.type}-projects-list`, prjItem);
    }
  }
}
