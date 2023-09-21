function Modal(modalElId) {
  const el = document.getElementById(modalElId);
  if (!el)
    throw new Error(`Couldn't find element for modal with id ${modalElId}`);
  this.modalEl = el;
  this.modalEl.addEventListener("click", closeModal.bind(this));
}

function closeModal() {
  this.modalEl.style.display = "none";
}

Modal.prototype.openModal = function () {
  this.modalEl.style.display = "block";
};

export { Modal };
