import { AFTER, BEFORE } from "../utils/constants.js";
/**
 * This is an abstract class -
 * that means that can only be inherit and not be an instance
 * */
export class Component {
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
        this.hostEl.insertAdjacentElement(insertAtStart ? AFTER : BEFORE, this.element);
    }
}
