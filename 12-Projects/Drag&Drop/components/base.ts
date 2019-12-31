import { templateIdConfig } from "../interfaces/helpers.js";
import { AFTER, BEFORE } from "../utils/constants.js";
/**
 * This is an abstract class -
 * that means that can only be inherit and not be an instance
 * */
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
      insertAtStart ? AFTER : BEFORE,
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
