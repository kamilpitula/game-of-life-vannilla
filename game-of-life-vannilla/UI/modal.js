function Modal(modalElId) {
  const el = document.getElementById(modalElId);
  if (!el)
    throw new Error(`Couldn't find element for modal with id ${modalElId}`);
  this.modalEl = el;
  this.modalEl.addEventListener("click", this.closeModal.bind(this));
  this.modalEl
    .querySelector("div")
    .addEventListener("click", (e) => e.stopPropagation());
}

Modal.prototype.closeModal = function () {
  this.modalEl.style.display = "none";
};

Modal.prototype.openModal = function () {
  this.modalEl.style.display = "block";
};

export { Modal };
