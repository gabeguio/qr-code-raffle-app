import axios from "axios";
import BindingClass from "../util/bindingClass";
import Authenticator from "./authenticator";

/**
 * Client to call the QrCodeRaffleAppService.
 *
 * This could be a great place to explore Mixins. Currently the client is being loaded multiple times on each page,
 * which we could avoid using inheritance or Mixins.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
 * https://javascript.info/mixins
 */
export default class RaffleClient extends BindingClass {
  constructor(props = {}) {
    super();

    const methodsToBind = ["clientLoaded", "getIdentity", "login", "logout", "createScanner", "createVisit", "getVisits", "handleError"];
    this.bindClassMethods(methodsToBind, this);

    this.authenticator = new Authenticator();
    this.props = props;

    axios.defaults.baseURL = process.env.API_BASE_URL;
    this.axiosClient = axios;
    this.clientLoaded();
  }

  /**
   * Run any functions that are supposed to be called once the client has loaded successfully.
   */
  clientLoaded() {
    if (this.props.hasOwnProperty("onReady")) {
      this.props.onReady(this);
    }
  }

  /**
   * Get the identity of the current user
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The user information for the current user.
   */
  async getIdentity(errorCallback) {
    try {
      const isLoggedIn = await this.authenticator.isUserLoggedIn();

      if (!isLoggedIn) {
        return undefined;
      }

      return await this.authenticator.getCurrentUserInfo();
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  async login() {
    this.authenticator.login();
  }

  async logout() {
    this.authenticator.logout();
  }

  async getTokenOrThrow(unauthenticatedErrorMessage) {
    const isLoggedIn = await this.authenticator.isUserLoggedIn();
    if (!isLoggedIn) {
      throw new Error(unauthenticatedErrorMessage);
    }

    return await this.authenticator.getUserToken();
  }

  /**
   * Get the scanner by the current user's email.
   * @param scannerEmail email for a scanner
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns a scanner profile for the current scanner.
   */
  async getScanner(scannerEmail, errorCallback) {
    try {
      const token = await this.getTokenOrThrow("Only authenticated users can get scanners");
      const response = await this.axiosClient.get(`scanners/${scannerEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.scanner;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Create the scanner for the given email and sponsor.
   * @param scannerEmail email for a scanner
   * @param sponsorName a sponsors name the scanner is scanning for
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The scanner's metadata.
   */
  async createScanner(scannerEmail, sponsorName, errorCallback) {
    try {
      const token = await this.getTokenOrThrow("Only authenticated users can create a scanner profile");
      const response = await this.axiosClient.post(
        `scanners`,
        {
          scannerEmail: scannerEmail,
          sponsorName: sponsorName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.scanner;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Add a visitor to the current sponsor.
   * @param sponsorName a sponsors name the scanner is scanning for
   * @param visitorEmail email of the person visiting
   * @param visitorFullName full name of the person visiting
   * @param visitorOrganization organization of the person visiting
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The scanner's metadata.
   */
  async createVisit(sponsorName, visitorEmail, visitorFullName, visitorOrganization, errorCallback) {
    try {
      const token = await this.getTokenOrThrow("Only authenticated users can create visits");
      const response = await this.axiosClient.post(
        `visits`,
        {
          sponsorName: sponsorName,
          visitorEmail: visitorEmail,
          visitorFullName: visitorFullName,
          visitorOrganization: visitorOrganization,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.visit;
    } catch (error) {
      console.log("error");
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Get the visits on a for a given sponsor by the sponsor's name.
   * @param sponsorName Unique identifier for a list of visits
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The list of songs on a playlist.
   */
  async getVisits(sponsorName, errorCallback) {
    try {
      const token = await this.getTokenOrThrow("Only authenticated users can get scanners");
      const response = await this.axiosClient.get(`visits/${sponsorName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.visitsList;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Helper method to log the error and run any error functions.
   * @param error The error received from the server.
   * @param errorCallback (Optional) A function to execute if the call fails.
   */
  handleError(error, errorCallback) {
    console.error(error);

    const errorFromApi = error?.response?.data?.error_message;
    if (errorFromApi) {
      console.error(errorFromApi);
      error.message = errorFromApi;
    }

    if (errorCallback) {
      errorCallback(error);
    }
  }
}
