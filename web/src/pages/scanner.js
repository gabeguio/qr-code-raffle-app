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
    this.bindClassMethods(["mount", "loadScanner", "loadVisitorTable"], this);
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

    const scannerEmail = currentUser.email;

    const scanSpinner = document.getElementById("scan-spinner");
    scanSpinner.style.display = "block";

    try {
      // Retrieve scanner information from the server
      const scanner = await this.client.getScanner(scannerEmail);

      // If scanner is null, redirect to registerScanner.html
      if (!scanner) {
        scanSpinner.style.display = "none";
        window.location.href = "registerScanner.html";
        return; // Stop further execution
      }

      const scannerCurrentSponsor = document.getElementById("scanner__current-sponsor");
      scannerCurrentSponsor.innerText = `You are scanning for ${scanner.sponsorName}`;

      const visitorsCurrentSponsor = document.getElementById("visitors__current-sponsor");
      visitorsCurrentSponsor.innerText = `View Visitors for ${scanner.sponsorName}`;

      this.dataStore.set("sponsorName", scanner.sponsorName);
      document.getElementById("visitors__btn").addEventListener("click", this.loadVisitorTable);

      scanSpinner.style.display = "none";
    } catch (error) {
      console.error("Error retrieving scanner information:", error.message);
    }
  }

  loadScanner() {
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
      const scanSpinner = document.getElementById("scan-spinner");
      scanSpinner.style.display = "block";

      try {
        const visit = await this.client.createVisit(sponsorName, visitorEmail, visitorFullName, visitorOrganization);
        writer.innerHTML = `<p>${visit.visitorFullName} has visited ${sponsorName}!</p>`;
      } catch (error) {
        console.error("Error adding visitor information:", error.message);
      } finally {
        scanSpinner.style.display = "none";
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

  loadVisitorTable() {
    function emptyVisitorTable() {
      return `
      <table class="visitors__table" id="visitors__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody id="visitors__table-body">
      </tbody>
    </table>
      `;
    }
    const visitorTableContainer = document.getElementById("visitors__table-container");
    visitorTableContainer.innerHTML = emptyVisitorTable();
    const visitorTable = document.getElementById("visitors__table-body");
    visitorTable.innerHTML = "";
    const tableSpinner = document.getElementById("table-spinner");
    tableSpinner.style.display = "block";

    // test data for getting the visitor list
    const visits = [
      { visitorFullName: "John Doe", visitorEmail: "john@email.com", visitorOrganization: "ACME" },
      { visitorFullName: "Jane Doe", visitorEmail: "jane@email.com", visitorOrganization: "ACME" },
      { visitorFullName: "Jane Doe", visitorEmail: "jane@email.com", visitorOrganization: "ACME" },
      { visitorFullName: "Jane Doe", visitorEmail: "jane@email.com", visitorOrganization: "ACME" },
      { visitorFullName: "Jane Doe", visitorEmail: "jane@email.com", visitorOrganization: "ACME" },
      { visitorFullName: "Jane Doe", visitorEmail: "jane@email.com", visitorOrganization: "ACME" },
      { visitorFullName: "Avery Doe", visitorEmail: "avery@email.com", visitorOrganization: "ACME" },
    ];

    // add "total number of visitors: 3" to the paragraph element with id: "visitors-total"
    const visitorsTotal = document.getElementById("visitors__info");
    visitorsTotal.innerText = `Total number of visitors: ${visits.length}`;

    //sort visits by visitorFullName
    visits.sort((a, b) => {
      return a.visitorFullName.localeCompare(b.visitorFullName);
    });

    // this.client.getVisits(sponsorName).then((visits) => {
    visits.forEach((visit) => {
      const row = visitorTable.insertRow(-1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      cell1.innerHTML = visit.visitorFullName;
      cell2.innerHTML = visit.visitorEmail;
      cell3.innerHTML = visit.visitorOrganization;
    });
    tableSpinner.style.display = "none";
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
