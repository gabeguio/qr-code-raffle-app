import RaffleClient from "../api/raffleClient.js";
import Header from "../components/Header";
import BindingClass from "../util/bindingClass";
import DataStore from "../util/dataStore";
import { Html5QrcodeScanner } from "html5-qrcode";
/**
 * Logic needed for the QR scanner to create new visits
 */
class Scanner extends BindingClass {
  constructor() {
    super();
    this.bindClassMethods(["mount", "loadScanner"], this);
    this.dataStore = new DataStore();
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header to the page and load the Client.
   */
  async mount() {
    // Add header to the page
    this.header.addHeaderToPage();

    // Initialize RaffleClient
    this.client = new RaffleClient();

    // Retrieve current user's identity
    const currentUser = await this.client.getIdentity();

    // If currentUser is null, redirect to index.html
    if (!currentUser) {
      window.location.href = "index.html";
      return; // Stop further execution
    }

    // Set up event listener for starting scanning
    document.getElementById("startScanning").addEventListener("click", this.loadScanner);

    // Clear any previous error messages and hide the error message display
    const errorMessageDisplay = document.getElementById("error-message");
    errorMessageDisplay.innerText = ``;
    errorMessageDisplay.classList.add("hidden");

    const scannerEmail = currentUser.email;

    const spinner = document.querySelector(".loader");
    spinner.style.display = "block";

    try {
      // Retrieve scanner information from the server
      const scanner = await this.client.getScanner(scannerEmail);

      // If scanner is null, redirect to registerScanner.html
      if (!scanner) {
        spinner.style.display = "none";
        window.location.href = "registerScanner.html";
        return; // Stop further execution
      }

      this.dataStore.set("scannerEmail", scanner.scannerEmail);
      this.dataStore.set("sponsorName", scanner.sponsorName);
      spinner.style.display = "none";
    } catch (error) {
      console.error("Error retrieving scanner information:", error.message);
      errorMessageDisplay.innerText = `Error: ${error.message}`;
      errorMessageDisplay.classList.remove("hidden");
    }
  }

  loadScanner() {
    const errorMessageDisplay = document.getElementById("error-message");
    errorMessageDisplay.innerText = ``;
    errorMessageDisplay.classList.add("hidden");

    const reader = document.createElement("div");
    reader.id = "reader";
    document.getElementById("scanner").appendChild(reader);

    const writer = document.getElementById("writer");
    writer.innerHTML = "";

    const parseVCard = (decodedText) => {
      const lines = decodedText.split("\n");
      const vCard = {};

      lines.forEach((line) => {
        const [key, value] = line.split(":");
        if (key && value) {
          const normalizedKey = key.trim().toLowerCase().replace(/\W/g, "");
          vCard[normalizedKey] = value.trim();
        }
      });
      return vCard;
    };

    const handleVisitCreation = async (sponsorName, visitorEmail, visitorFullName, visitorOrganization) => {
      const spinner = document.querySelector(".loader");
      spinner.style.display = "block";

      try {
        const visit = await this.client.createVisit(sponsorName, visitorEmail, visitorFullName, visitorOrganization);
        writer.innerHTML = `<p>${visit.visitorFullName} has visited ${sponsorName}!</p>`;
      } catch (error) {
        console.error("Error adding visitor information:", error.message);
        errorMessageDisplay.innerText = `Error: ${error.message}`;
        errorMessageDisplay.classList.remove("hidden");
      } finally {
        spinner.style.display = "none";
      }
    };

    const onScanSuccess = async (decodedText, decodedResult) => {
      const vCardObject = parseVCard(decodedText);
      const sponsorName = this.dataStore.get("sponsorName");
      const { email: visitorEmail, fn: visitorFullName = "N/A", org: visitorOrganization = "N/A" } = vCardObject;

      await handleVisitCreation(sponsorName, visitorEmail, visitorFullName, visitorOrganization);
      html5QrcodeScanner.clear();
    };

    const html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 200, height: 200 } }, false);
    html5QrcodeScanner.render(onScanSuccess);
  }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
  const scanner = new Scanner();
  scanner.mount();
};

window.addEventListener("DOMContentLoaded", main);
