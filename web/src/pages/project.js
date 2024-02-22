import ProjectClient from "../api/ProjectClient";
import Header from "../components/Header";
import BindingClass from "../util/BindingClass";
import DataStore from "../util/DataStore";
import { renderProject } from "../components/ProjectComponent";


class Project extends BindingClass {
  constructor() {
    super();

    this.bindClassMethods(["mount", "displayProject"], this);

    // Create a new datastore with an initial "empty" state.
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
    console.log("Loading A Project...");
  }

  mount() {
    this.header.header();
    this.client = new ProjectClient();
    this.displayProject();
  }

  async displayProject() {
    // const project = await this.client.getProjectById()
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");

    let project, members, tasks;
    try {
      document.querySelector(".loader").style.display = "flex";
      project = await this.client.getProject(projectId);
      members = await this.client.getMembers(projectId);
      tasks = await this.client.getTasks(projectId);
    } finally {
      document.querySelector(".loader").style.display = "none"
    }

    // NOTE: Content's of the project are rendered before the header to allow header toggle switch assignment for the projects contents
    renderProject(project, members, tasks);
  }
}

const main = async () => {
  const project = new Project();
  project.mount();
};

window.addEventListener("DOMContentLoaded", main);
