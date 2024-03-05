import RaffleClient from "../api/raffleClient";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";
import grandPrizeEmailWhiteList from "../data/grandPrizeWhiteList";

/**
 * Logic needed to register a scanner profile for the current user.
 */
class GrandPrize extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount", "checkGrandPrizeRaffle", "loadGrandPrizeForm", "submitWinner"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header, load the service client, and check the user sign-in and registration status.
   */
  async mount() {
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    await this.checkGrandPrizeRaffle();
  }

  async checkGrandPrizeRaffle() {
    const grandPrizeSpinner = document.getElementById("grand-prize-spinner");
    grandPrizeSpinner.style.display = "block";

    try {
      const currentUser = await this.client.getIdentity();
      // grab spinner

      if (currentUser == null) {
        window.location.href = "/index.html";
      }

      console.log(grandPrizeEmailWhiteList);

      // check whitelist, if not in whitelist, redirect to index.html
      if (!grandPrizeEmailWhiteList.includes(currentUser.email)) {
        window.location.href = "index.html";
        return; // Stop further execution
      }
    } catch (error) {
      console.error("Error checking frontpage status:", error.subtitle);
    }

    // display none on spinner
    grandPrizeSpinner.style.display = "none";
    this.loadGrandPrizeForm();
  }

  loadGrandPrizeForm() {
    const grandPrizeForm = document.getElementById("form-container");
    grandPrizeForm.classList.remove("form-hidden");

    const grandPrizeButton = document.getElementById("grand-prize__button");
    grandPrizeButton.addEventListener("click", this.submitWinner);
  }

  async submitWinner(evt) {
    evt.preventDefault();

    var grandPrizeForm = document.getElementById("grand-prize-form__form");

    // Check validity of the form
    if (grandPrizeForm.checkValidity()) {
      // If the form is valid, submit it
      const grandPrizeButton = document.getElementById("grand-prize__button");
      const origButtonText = grandPrizeButton.innerText;
      grandPrizeButton.innerText = "Loading...";

      try {
        const minVisitedSponsor = document.getElementById("min-visited-sponsors").value;
        console.log(minVisitedSponsor);

        // Create grand prize profile
        // const grandPrizeWinner = await this.client.getGrandPrizeWinner(minVisitedSponsor);

        // test grandPrizeWinnder
        const grandPrizeWinner = {
          visitorFullName: "John Doe",
          visitorEmail: "email.com",
          visitorOrganization: "Company",
        };

        if (grandPrizeWinner) {
          // get element by id "grand-prize__winner-info"
          const grandPrizeWinnerInfo = document.getElementById("grand-prize__winner-info");
          grandPrizeWinnerInfo.innerHTML = "";
          // remove hidden on grandePrizeWinnderInfo
          grandPrizeWinnerInfo.classList.remove("hidden");
          grandPrizeWinnerInfo.innerHTML = `
          <p class="grand-prize__info">The grand prize winner is: ${grandPrizeWinner.visitorFullName}</p>
          <p class="raffle__info">🎉🎉🎉🎉🎉🎉🎉🎉</p>
          <p class="grand-prize__info">Email: ${grandPrizeWinner.visitorEmail}</p>
          <p class="grand-prize__info">Organization: ${grandPrizeWinner.visitorOrganization}</p>
        `;
        }
      } catch (error) {
        console.error("Error registering grand prize:", error.message);
      } finally {
        // Reset button text
        grandPrizeButton.innerText = origButtonText;
        const formContainer = document.getElementById("form-container");
        formContainer.classList.add("form-hidden");
      }
    }
  }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
  const grandPrize = new GrandPrize();
  grandPrize.mount();
};

window.addEventListener("DOMContentLoaded", main);
