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
    document.getElementById("startScanning").addEventListener("click", this.loadScanner);
    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    // this.loadScanner();
  }

  loadScanner() {
    // create a div with id reader and add to the scanner section
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
          // Normalize key to lowercase and remove non-alphanumeric characters
          const normalizedKey = key.trim().toLowerCase().replace(/\W/g, "");
          vCard[normalizedKey] = value.trim();
        }
      });

      return vCard;
    };

    const onScanSuccess = async (decodedText, decodedResult) => {
      const vCardObject = parseVCard(decodedText);

      const { email, fn = "N/A", org = "N/A" } = vCardObject;

      const sponsorName = "DataTuneConf";

      try {
        //start spinner
        const spinner = document.querySelector(".loader");
        spinner.style.display = "block";
        const visit = await this.client.createVisit(sponsorName, email, fn, org);
        //stop spinner
        spinner.style.display = "none";
        document.getElementById("writer").innerHTML = `<p>${visit.visitorFullName} has been checked in!</p>`;
      } catch (error) {
        console.error(error.message);
        // Handle error appropriately
      }

      // this will stop the scanner (video feed) and clear the scan area.
      html5QrcodeScanner.clear();
    };

    let html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 200, height: 200 } }, /* verbose= */ false);

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
