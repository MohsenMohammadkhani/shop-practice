const CLASS_SPINNER_TAG = "spinner";
const CLASS_SPINNER_CONTAINER = "spinner-container";

const showSpinner = (classItem) => {
  const element = document.querySelector("." + classItem);
  const spinnerContainerTag = document.createElement("div");
  const spinnerTag = document.createElement("div");
  spinnerContainerTag.className = CLASS_SPINNER_CONTAINER;
  spinnerTag.className = CLASS_SPINNER_TAG;
  spinnerContainerTag.appendChild(spinnerTag);
  element.appendChild(spinnerContainerTag);
};

const removeSpinner = (classItem) => {
  const spinnerTag = document.querySelector(
    `.${classItem} .${CLASS_SPINNER_CONTAINER}`
  );
  if (!spinnerTag) {
    return;
  }
  spinnerTag.remove();
};

export default {
  showSpinner,
  removeSpinner,
  CLASS_SPINNER_TAG,
};
