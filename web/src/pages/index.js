import ProjectClient from "../api/ProjectClient";
import Header from "../components/Header";
import { renderHero } from "../components/Hero";
import BindingClass from "../util/BindingClass";
import DataStore from "../util/DataStore";

class Index extends BindingClass {
  constructor() {
    super();

    this.bindClassMethods(["mount", "heroSection"], this);

    // Create a new datastore with an initial "empty" state.
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
    console.log("Loading Home Page...");
  }

  mount() {
    this.header.header();
    this.client = new ProjectClient();
    this.heroSection();
  }

  heroSection() {
    renderHero();
  }

}

const main = async () => {
  const index = new Index();
  index.mount();
};

window.addEventListener("DOMContentLoaded", main);
