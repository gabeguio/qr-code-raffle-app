import RaffleClient from "../api/raffleClient";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";

/**
 * Logic needed for the create playlist page of the website.
 */
class Index extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount", "checkSignIn", "createLoginButton", "createButton"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header to the page and load the MusicPlaylistClient.
   */
  mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    this.checkSignIn();
  }

  async checkSignIn() {
    const currentUser = await this.client.getIdentity();

    console.log(currentUser);

    if (currentUser == null) {
      //grab div by id "sign-in__message"
      const signInMessage = document.getElementById("sign-in__message");
      //create a paragraph element
      const paragraphElement = document.createElement("p");
      const loginButton = this.createLoginButton();
      //add the paragraph element to the sign in message div
      paragraphElement.innerHTML = "Please sign in to register a scanner profile.";
      signInMessage.appendChild(paragraphElement);
      signInMessage.appendChild(loginButton);
    } else {
      window.location.href = "/registerScanner.html";
    }
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
