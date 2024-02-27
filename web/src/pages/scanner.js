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
    // this.dataStore.addChangeListener(this.redirectToViewPlaylist);
    this.header = new Header(this.dataStore);
  }

  /**
   * Add the header to the page and load the Client.
   */
  async mount() {
    // document.getElementById("startScanning").addEventListener("click", this.loadScanner);

    this.header.addHeaderToPage();
    this.client = new RaffleClient();
    const visit = await this.client.createVisit("Starbucks", "gabeguio@gmail.com", "Gabe Guio", "Company", (error) => {
      console.log(error.message);
    });
    console.log(visit);
    // this.loadScanner();
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

  loadScanner(scannerEmail) {
    // create a div with id reader and add to the scanner section
    // const reader = document.createElement("div");
    // reader.id = "reader";
    // document.getElementById("scanner").appendChild(reader);
    // const writer = document.getElementById("writer");
    // writer.innerHTML = "";

    function parseVCard(decodedText) {
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
    }

    async function onScanSuccess(decodedText, decodedResult) {
      const vCardObject = parseVCard(decodedText);
      console.log(vCardObject);
      const sponsorName = "DataTuneConf";

      console.log(sponsorName, vCardObject.email, vCardObject.fn, vCardObject.org);

      // const errorMessageDisplay = document.getElementById("error-message");
      // errorMessageDisplay.innerText = ``;
      // errorMessageDisplay.classList.add("hidden");
      const visit = await this.client.createVisit(sponsorName, vCardObject.email, vCardObject.fn, vCardObject.org, (error) => {
        console.log(error.message);
        // createButton.innerText = origButtonText;
        // errorMessageDisplay.innerText = `Error: ${error.message}`;
        // errorMessageDisplay.classList.remove("hidden");
      });

      console.log(visit);

      document.getElementById("writer").innerHTML = `<p>${visit.visitorFullName} from ${visit.visitorOrganization} has been checked in!</p>`;
      // ...
      // this will stop the scanner (video feed) and clear the scan area.
      html5QrcodeScanner.clear();
    }

    let html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 200, height: 200 } }, /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess);
  }
}

async function createVisit(vCardObject, sponsorName) {
  return visit;
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
  const scanner = new Scanner();
  scanner.mount();
};

window.addEventListener("DOMContentLoaded", main);
