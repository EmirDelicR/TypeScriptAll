/**
More on Drag & Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
**/
import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
