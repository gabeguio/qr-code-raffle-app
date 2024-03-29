import RaffleClient from "../api/raffleClient";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";
import options from "../data/sponsorOptions";

/**
 * Logic needed to register a scanner profile for the current user.
 */
class RegisterScanner extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount", "checkRegistration", "addSponsorOptions", "submit"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header, load the service client, and check the user sign-in and registration status.
   */
  async mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    await this.checkRegistration();
  }

  async checkRegistration() {
    const registrationSpinner = document.getElementById("registration-spinner");
    registrationSpinner.style.display = "block";

    try {
      // Check if user is logged in
      const isLoggedIn = await this.client.authenticator.isUserLoggedIn();
      if (!isLoggedIn) {
        console.log("User is not logged in, redirecting to index.html...");
        window.location.href = "/index.html";
        return;
      }

      const currentUser = await this.client.getIdentity();
      const scannerEmail = currentUser.email;
      const scanner = await this.client.getScanner(scannerEmail);

      if (scanner) {
        console.log("Scanner is registered, redirecting to scanner.html...");
        window.location.href = "/scanner.html";
        return;
      }

      this.addSponsorOptions();
      const formContainer = document.getElementById("form-container");
      formContainer.classList.remove("form-hidden");

      const registerButton = document.getElementById("register");
      registerButton.addEventListener("click", this.submit);
    } catch (error) {
      console.error("Error checking registration:", error.message);
      errorMessageDisplay.innerText = `Error: ${error.message}`;
      errorMessageDisplay.classList.remove("hidden");
    } finally {
      registrationSpinner.style.display = "none";
    }
  }

  // add all the items from the options data to the select element with id sponsor-name
  addSponsorOptions() {
    const sponsorSelect = document.getElementById("sponsor-name");
    options.forEach((sponsor) => {
      const option = document.createElement("option");
      option.value = sponsor;
      option.innerText = sponsor;
      sponsorSelect.appendChild(option);
    });
  }

  /**
   * Method to run when the current user is signed up, but not registering. Call the raffleClient to create a scanner record
   * with the select sponsor.
   */
  async submit(evt) {
    evt.preventDefault();

    var registerForm = document.getElementById("register-form__form");

    // Check validity of the form
    if (registerForm.checkValidity()) {
      // If the form is valid, submit it
      const registerButton = document.getElementById("register");
      const origButtonText = registerButton.innerText;
      registerButton.innerText = "Loading...";

      try {
        const currentUser = await this.client.getIdentity();
        const scannerEmail = currentUser.email;
        const sponsorName = document.getElementById("sponsor-name").value;

        // Create scanner profile
        const scanner = await this.client.createScanner(scannerEmail, sponsorName);
        if (scanner) {
          console.log("Scanner is registered, redirecting to scanner.html...");
          window.location.href = "/scanner.html";
          return;
        }
      } catch (error) {
        console.error("Error registering scanner:", error.message);
      } finally {
        // Reset button text
        registerButton.innerText = origButtonText;
      }
    } else {
      // If the form is invalid, display error messages or take other actions
      alert("Please select the sponsor you are scanning for");
    }
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
