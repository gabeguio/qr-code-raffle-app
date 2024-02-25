import ProjectClient from "../api/RaffleClient";
import BindingClass from "../util/BindingClass";
import mobileNav from "../util/MobileNav";
import darkMode from "../util/DarkMode";

/**
 * The header component for the website.
 */
export default class Header extends BindingClass {
  constructor() {
    super();

    const methodsToBind = [
      "header",
      "createUserInfoForHeader",
      "createLoginButton",
      "createLoginButton",
      "createLogoutButton",
    ];
    this.bindClassMethods(methodsToBind, this);

    this.client = new ProjectClient();
  }

  async header() {
    let headerHTML = `
    <a href="index.html">
    Home
    </a>
    <nav>
      <ul class="header__menu">
        <li>
          <a href="projects.html" class="header__link">Start Scanning</a>
        </li>
        <li class="header__line"></li>
        <li>
          <button class="btn" id="header__user-desktop"></button>
        </li>
      </ul>
      <button class="header__bars">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"/>
        </svg>
      </button>
    </nav>
  `;

    // Add default header HTML
    const headerElement = document.getElementById("header");
    headerElement.innerHTML = headerHTML;

    // Retrieve user information, if not user is logged in, then return 'Login'
    const currentUser = await this.client.getIdentity();
    this.createUserInfoForHeader(currentUser);

  }

  // If current user is not undefined, then create logout button by retrieving the name of the current user.
  createUserInfoForHeader(currentUser) {
    const mobileDesktopInfo = document.getElementById("header__user-desktop");
    const userDesktopInfo = currentUser
      ? this.createLogoutButton(currentUser)
      : this.createLoginButton();
      mobileDesktopInfo.appendChild(userDesktopInfo);

    const mobileUserInfo = document.getElementById("header__user-mobile");
    const userMobilepInfo = currentUser
      ? this.createLogoutButton(currentUser)
      : this.createLoginButton();
      mobileUserInfo.appendChild(userMobilepInfo);
  }

  createLoginButton() {
    return this.createButton("Login", this.client.login);
  }

  createLogoutButton(currentUser) {
    return this.createButton(`Logout: ${currentUser.name}`, this.client.logout);
  }

  createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.href = "#";
    button.innerText = text;

    button.addEventListener("click", async () => {
      await clickHandler();
    });

    return button;
  }
}
