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
    this.bindClassMethods(["mount", "checkSignIn", "displaySignInMessage", "createLoginButton", "createButton"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header, load the service client, and check the user sign-in status.
   */
  mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    this.checkSignIn();
  }

  async checkSignIn() {
    const errorMessageDisplay = document.getElementById("error-message");
    errorMessageDisplay.innerText = ``;
    errorMessageDisplay.classList.add("hidden");

    try {
      const currentUser = await this.client.getIdentity();

      if (currentUser == null) {
        this.displaySignInMessage();
      } else {
        window.location.href = "/registerScanner.html";
      }
    } catch (error) {
      console.error("Error checking sign-in status:", error.message);
      errorMessageDisplay.innerText = `Error: ${error.message}`;
      errorMessageDisplay.classList.remove("hidden");
    }
  }

  displaySignInMessage() {
    const signInMessage = document.getElementById("sign-in__message");
    const paragraphElement = document.createElement("p");
    // add class "sign-in__message" to the paragraph element
    paragraphElement.classList.add("sign-in__message");
    paragraphElement.innerHTML = "Please sign in to register a scanner profile.";
    const loginButton = this.createLoginButton();
    // add a login button to the sign-in message
    loginButton.classList.add("sign-in__button");
    signInMessage.appendChild(paragraphElement);
    signInMessage.appendChild(loginButton);
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
