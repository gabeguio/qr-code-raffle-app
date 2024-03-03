import RaffleClient from "../api/raffleClient";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";

/**
 * Logic needed for the user entry point of the website.
 */
class Index extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount", "checkFrontpage", "displayFrontpageSubtitle", "createLoginButton", "createButton"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header, load the service client, and check the user frontpage status.
   */
  mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    this.checkFrontpage();
  }

  async checkFrontpage() {
    try {
      const currentUser = await this.client.getIdentity();

      if (currentUser == null) {
        this.displayFrontpageSubtitle();
      } else {
        window.location.href = "/registerScanner.html";
      }
    } catch (error) {
      console.error("Error checking frontpage status:", error.subtitle);
    }
  }

  displayFrontpageSubtitle() {
    const frontpageElement = document.getElementById("frontpage__subtitle");

    const loginButton = this.createLoginButton();
    // add a login button to the frontpage subtitle
    loginButton.classList.add("frontpage__button");
    loginButton.classList.add("btn");

    // add loginbutton as the last element in frontpageElement
    frontpageElement.appendChild(loginButton);
  }

  createLoginButton() {
    return this.createButton("Login", this.client.login);
  }

  createButton(text, clickHandler) {
    const button = document.createElement("a");
    button.classList.add("button");
    button.href = "#";
    button.innerText = text;

    button.addEventListener("click", async () => {
      await clickHandler();
    });

    return button;
  }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
  const index = new Index();
  index.mount();
};

window.addEventListener("DOMContentLoaded", main);
