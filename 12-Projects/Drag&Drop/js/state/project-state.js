import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(fn) {
        this.listeners.push(fn);
    }
}
export class ProjectState extends State {
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
export const projectState = ProjectState.getInstance();
