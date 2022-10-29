"use strict";

class Modal {
  constructor(
    message,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel
  ) {
    this.message = message;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    this.confirmButtonText = confirmButtonText;
    this.cancelButtonText = cancelButtonText;

    this.parent = document.body;
  }
  show() {
    this._createModal();
  }
  _createModal() {
    this.modal = document.createElement("dialog");
    this.modal.classList.add("modal-dialog");
    this.modal.show();

    const window = document.createElement("div");
    window.classList.add("modal-window");
    this.modal.appendChild(window);

    // Main text
    const text = document.createElement("div");
    text.classList.add("modal-text");
    text.textContent = this.message;
    window.appendChild(text);

    // Accept and cancel button group
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("modal-button-group");
    window.appendChild(buttonGroup);

    // Cancel button
    this.cancelButton = document.createElement("button");
    this.cancelButton.type = "button";
    this.cancelButton.classList.add("button");
    this.cancelButton.classList.add("button-secondary");
    this.cancelButton.classList.add("modal-cancel-button");
    this.cancelButton.textContent = this.cancelButtonText;
    buttonGroup.appendChild(this.cancelButton);
    this.cancelButton.addEventListener("click", async () => {
      await this.onCancel();
      this.destroyModal();
    });

    // Confirm button
    this.confirmButton = document.createElement("button");
    this.confirmButton.type = "button";
    this.confirmButton.classList.add("button");
    this.confirmButton.classList.add("button-primary");
    this.confirmButton.classList.add("modal-confirm-button");
    this.confirmButton.textContent = this.confirmButtonText;
    buttonGroup.appendChild(this.confirmButton);
    this.confirmButton.focus();
    this.confirmButton.addEventListener("click", async () => {
      await this.onConfirm();
      this.destroyModal();
    });

    this.parent.appendChild(this.modal);
  }

  destroyModal() {
    this.parent.removeChild(this.modal);
    delete this;
  }
}
