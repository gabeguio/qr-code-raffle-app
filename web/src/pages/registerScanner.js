import RaffleClient from "../api/raffleClient";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";
import options from "../data/sponsorsData";

/**
 * Logic needed for the register scanner profile page of the website.
 */
class RegisterScanner extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount", "checkRegistration", "submit"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header to the page and load the MusicPlaylistClient.
   */
  async mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    this.checkRegistration();
  }

  async checkRegistration() {
    // Check if user is logged in
    const isLoggedIn = await this.client.authenticator.isUserLoggedIn();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      console.log("User is not logged in, redirecting to index.html...");
      window.location.href = "/index.html";
      //redirect window to index.html
    }
    const currentUser = await this.client.getIdentity();
    const scannerEmail = currentUser.email;
    const scanner = await this.client.getScanner(scannerEmail, (error) => {
      console.log("getScanner error");
      console.log(`Error: ${error.message}`);
    });

    // console.log("Scanner ", scanner.data);
    // console.log("Sponsor ", scanner.sponsorName);

    if (scanner != null) {
      window.location.href = "/scanner.html";
    }

    const registerButton = document.getElementById("register-scanner");
    registerButton.addEventListener("click", this.submit);
  }

  // buildRegistration() {
  //   const createButton = document.getElementById("register-scanner");
  //   document.getElementById('register-scanner').addEventListener('click', this.submit);

  // }

  // attachSponsorOptions() {
  //   const selectElement = document.getElementById('sponsor-name');
  //   options.forEach(option => {
  //       const optionElement = document.createElement('option');
  //       optionElement.textContent = option;
  //       optionElement.value = option;
  //       selectElement.appendChild(optionElement);
  //   });

  /**
   * Method to run when the create playlist submit button is pressed. Call the MusicPlaylistService to create the
   * playlist.
   */
  async submit(evt) {
    evt.preventDefault();

    const errorMessageDisplay = document.getElementById("error-message");
    errorMessageDisplay.innerText = ``;
    errorMessageDisplay.classList.add("hidden");

    const registerButton = document.getElementById("register-scanner");
    const origButtonText = registerButton.innerText;
    registerButton.innerText = "Loading...";

    const currentUser = await this.client.getIdentity();
    const scannerEmail = currentUser.email;
    const sponsorName = document.getElementById("sponsor-name").value;

    const scanner = await this.client.createScanner(scannerEmail, sponsorName, (error) => {
      registerButton.innerText = origButtonText;
      errorMessageDisplay.innerText = `Error: ${error.message}`;
      errorMessageDisplay.classList.remove("hidden");
    });

    if (scanner.sponsorName != undefined) {
      window.location.href = "/scanner.html";
    }

    // console.log(JSON.stringify(scanner));
    // registerButton.innerText = origButtonText;
    // errorMessageDisplay.innerText = `Unable to Create Sponsor`;
    // errorMessageDisplay.classList.remove("hidden");
  }

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

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
  const registerScanner = new RegisterScanner();
  registerScanner.mount();
};

window.addEventListener("DOMContentLoaded", main);
