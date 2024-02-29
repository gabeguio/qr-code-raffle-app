import RaffleClient from "../api/raffleClient";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";

/**
 * Logic needed for the register scanner profile page of the website.
 */
class RegisterScanner extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header to the page and load the MusicPlaylistClient.
   */
  mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    console.log("hello");
  }

  async checkRegistration() {
    // get userEmail from data store
    const userEmail = this.dataStore.get("userEmail");

    try {
        const scanner = await this.client.getScanner(userEmail);
    } catch (ScannerNotFoundException) {
        console.log("error");
    } 

    // redirect page to scanner.html if scanner is not null
    if (scanner != null) {
        window.location.href = "/scanner.html";

    console.log(currentUser);

    if (scanner == null) {
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

  /**
   * Method to run when the create playlist submit button is pressed. Call the MusicPlaylistService to create the
   * playlist.
   */
  // async submit(evt) {
  //   evt.preventDefault();
  //   const errorMessageDisplay = document.getElementById("error-message");
  //   errorMessageDisplay.innerText = ``;
  //   errorMessageDisplay.classList.add("hidden");
  //   const createButton = document.getElementById("create");
  //   const origButtonText = createButton.innerText;
  //   createButton.innerText = "Loading...";
  //   const playlistName = document.getElementById("playlist-name").value;
  //   const tagsText = document.getElementById("tags").value;
  //   let tags;
  //   if (tagsText.length < 1) {
  //     tags = null;
  //   } else {
  //     tags = tagsText.split(/\s*,\s*/);
  //   }
  //   const playlist = await this.client.createPlaylist(playlistName, tags, (error) => {
  //     createButton.innerText = origButtonText;
  //     errorMessageDisplay.innerText = `Error: ${error.message}`;
  //     errorMessageDisplay.classList.remove("hidden");
  //   });
  //   this.dataStore.set("playlist", playlist);
  // }

  /**
   * When the playlist is updated in the datastore, redirect to the view playlist page.
   */
  // redirectToViewPlaylist() {
  //   const playlist = this.dataStore.get("playlist");
  //   if (playlist != null) {
  //     window.location.href = `/playlist.html?id=${playlist.id}`;
  //   }
  // }
}
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
  const registerScanner = new RegisterScanner();
  registerScanner.mount();
};

window.addEventListener("DOMContentLoaded", main);
