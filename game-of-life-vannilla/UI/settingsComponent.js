export class SettingsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <link href="style.css" rel="stylesheet" type="text/css"> 
    <div id="modal">
      <div id="modal_content">
        <div id="settings">
            <h1>Settings</h1>
            <label for="widthInput">Width</label>
            <input type="number" id="widthInput" name="widthInput" value="60"/>
            <label for="heightInput">Height</label>
            <input type="number" id="heightInput" name="heightInput" value="60"/>
            <div class="settingsControls">
                <button id="cancelSettingsBtn" class="control_button">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    >
                    <path
                        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    </svg>
                </button>
                <button id="acceptSettignsBtn" class="control_button">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    >
                    <path
                        d="M8.5 12.5L10.5 14.5L15.5 9.5"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    </svg>
                </button>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}
