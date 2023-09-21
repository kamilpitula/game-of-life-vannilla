function SettingsView(templateId, hookElId) {
  const templateEl = document.getElementById(templateId);
  const hookEl = document.getElementById(hookElId);

  if (!templateEl || !hookEl)
    throw new Error("Couldn't find template or hook for settings");

  this.templateEl = templateEl.content.cloneNode(true);
  this.hookEl = hookEl;
  hookEl.innerHTML = "";
  hookEl.appendChild(this.templateEl);

  this.acceptButton = document
    .getElementById("acceptSettignsBtn")
    .addEventListener("click", accept.bind(this));

  this.cancelButton = document
    .getElementById("cancelSettingsBtn")
    .addEventListener("click", cancel.bind(this));

  this.widthInput = document.getElementById("widthInput");
  this.heightInput = document.getElementById("heightInput");
}

function accept() {
  const width = +widthInput.value;
  const height = +heightInput.value;

  if (this.onAcceptHandler)
    this.onAcceptHandler({
      width: width,
      height: height,
    });
}

function cancel() {
  if (this.onCancelHandler) this.onCancelHandler();
}

SettingsView.prototype.setOnAcceptHandler = function (onAcceptHandler) {
  this.onAcceptHandler = onAcceptHandler;
};

SettingsView.prototype.setOnCancelHandler = function (onCancelHandler) {
  this.onCancelHandler = onCancelHandler;
};

export { SettingsView };
