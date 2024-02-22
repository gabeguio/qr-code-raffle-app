import axios from "axios";
import BindingClass from "../util/BindingClass";
import Authenticator from "./Authenticator";

/**
 * Client to call the projectmanagementservice.
 *
 * This could be a great place to explore Mixins. Currently the client is being loaded multiple times on each page,
 * which we could avoid using inheritance or Mixins.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
 * https://javascript.info/mixins
 */
export default class ProjectClient extends BindingClass {
  constructor(props = {}) {
    super();

    const methodsToBind = [
      //AuthO/AuthZ
      "clientLoaded",
      "getIdentity",
      "login",
      "logout",
      "getTokenOrThrow",
      //Error Handeling
      "handleError",
      //Projects
      "createProject",
      "getProject",
      "getProjects",
      "updateProjectDetails",
      "updateProjectStatus",
      "deleteProject",
      //Tasks
      "createTicket",
      "getTicket",
      "getTasks",
      "updateTicketDetails",
      "updateTicketStatus",
      "deleteTicket",
      //Members
      "getMembers"
    ];
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

  /** -----------AuthO/AuthZ------------ */
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

  /** -----------Error Handeling------------ */
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

  /**
   * Get all the members attached to a project in the database.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The list of members on a project.
   */
  async getMembers(projectId, errorCallback) {
    try {
      const response = await this.axiosClient.get(`/members/${projectId}`);
      return response.data.memberModelList;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /** -----------Members------------ */

  /** -----------Projects------------ */
  /**
   * Create a new project owned by any user.
   * @param title The title of the project to create.
   * @param description the description to overview the project.
   * @param status status for information on whether the status is in back log, in progress, or completed.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The project that has been created.
   */
  async createProject(title, description, status, errorCallback) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can create projects."
      );
      const response = await this.axiosClient.post(
        `projects`,
        {
          title: title,
          description: description,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.project;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Gets the project for the given ID.
   * @param projectId Unique identifier for a project
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The project's metadata.
   */
  async getProject(projectId, errorCallback) {
    try {
      const response = await this.axiosClient.get(`project/${projectId}`);
      console.log(response);
      return response.data.projectModel;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Get all the project in a given database.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The list of projects in a database.
   */
  async getProjects(errorCallback) {
    try {
      const response = await this.axiosClient.get(`/projects`);
      return response.data.projectModelList;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Update an existing project's details in the database.
   * @param projectId The project that will updated details.
   * @param title The title of the project to update.
   * @param description the description of the project to update.
   * @param status status to be updated to either back log or in progress or completed.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The project that has been updated.
   */
  async updateProjectDetails(
    projectId,
    title,
    status,
    description,
    errorCallback
  ) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can update a project."
      );
      const response = await this.axiosClient.put(
        `/projects/${projectId}`,
        {
          projectId: projectId,
          title: title,
          status: status,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.ticket;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Update an existing project status in the database.
   * @param projectId The project that will have an updated status.
   * @param status status to be updated to either back log or in progress or completed.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The project that has been updated.
   */
  async updateProjectStatus(projectId, status, errorCallback) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can update a project."
      );
      const response = await this.axiosClient.put(
        `/projects/${projectId}`,
        {
          projectId: projectId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.project;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Deletes a project owned by any user, and all the tickets associated with that project
   * @param projectId The project that will be deleted.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The ticket that has been delete.
   */
  async deleteProject(projectId, errorCallback) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can delete a project."
      );
      const response = await this.axiosClient.delete(
        `projects`,
        {
          projectId: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.ticket;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /** -----------Tickets------------ */
  /**
   * Create a new project owned by any user.
   * @param projectId The project that will have a new ticket.
   * @param title The title of the ticket to create.
   * @param description the description to overview the ticket.
   * @param status status for information on whether the status is in back log, in progress, or completed.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The project that has been created.
   */
  async createTicket(projectId, title, description, status, errorCallback) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can create ticket."
      );
      const response = await this.axiosClient.post(
        `tickets`,
        {
          projectId: projectId,
          title: title,
          description: description,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.ticket;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Gets a ticket for the given ID from a project for the given project.
   * @param projectId Unique identifier for a project
   * @param ticketId Unique identifier for a ticket
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The ticket's metadata.
   */
  async getTicket(projectId, ticketId, errorCallback) {
    try {
      const response = await this.axiosClient.get(
        `projects/${projectId}/tickets/${ticketId}`
      );
      return response.data.ticketModel;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Get the tickets on a given project by the project's identifier.
   * @param projectId Unique identifier for a project.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The list of tickets on a project.
   */
  async getTasks(projectId, errorCallback) {
    try {
      const response = await this.axiosClient.get(
        `/tasks/${projectId}`
      );
      return response.data.taskModelList;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Update an existing ticket's details on a project in the database.
   * @param projectId The project that will have an updated ticket.
   * @param ticketId The ticket that have updated details.
   * @param title The title of the ticket to update.
   * @param description the description of the ticket to update.
   * @param status status to be updated to either back log or in progress or completed.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The ticket that has been updated.
   */
  async updateTicketDetails(
    projectId,
    ticketId,
    title,
    status,
    description,
    errorCallback
  ) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can update a ticket."
      );
      const response = await this.axiosClient.put(
        `/projects/${projectId}/tickets/${ticketId}`,
        {
          projectId: projectId,
          ticketId: ticketId,
          title: title,
          status: status,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.project;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Update an existing ticket status in the database.
   * @param projectId The project that will have an updated ticket.
   * @param ticketId The ticket that will have an updated status.
   * @param status status to be updated to either back log or in progress or completed.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The project that has been updated.
   */
  async updateTicketStatus(projectId, ticketId, status, errorCallback) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can update a ticket."
      );
      const response = await this.axiosClient.post(
        `/projects/${projectId}/ticketstatus/${ticketId}`,
        {
          projectId: projectId,
          ticketId: ticketId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.ticket;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }

  /**
   * Deletes a ticket owned by any user.
   * @param projectId The project that has the ticket
   * @param tickedId The ticket that will be delete from the specified project.
   * @param errorCallback (Optional) A function to execute if the call fails.
   * @returns The ticket that has been delete.
   */
  async deleteTicket(projectId, tickedId, errorCallback) {
    try {
      const token = await this.getTokenOrThrow(
        "Only authenticated users can delete a ticket."
      );
      const response = await this.axiosClient.delete(`tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          projectId: projectId,
          ticketId: tickedId,
        },
      });
      return response.data.ticket;
    } catch (error) {
      this.handleError(error, errorCallback);
    }
  }
}
