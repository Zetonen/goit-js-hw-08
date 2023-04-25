import throttle from "lodash.throttle";
import { save, load } from "./storage.js";

const SAVE_KEY_CODE = "feedback-form-state";
const refs = {
  form: document.querySelector(".feedback-form"),
};

updatingFormValues();
refs.form.addEventListener("input", throttle(onInputValues, 500));
refs.form.addEventListener("click", resetForm);

function onInputValues(e) {
  const formValues = {};
  const formData = new FormData(refs.form);
  formData.forEach((y, x) => {
    formValues[x] = y;
  });
  save(SAVE_KEY_CODE, formValues);
}

function updatingFormValues() {
  const saveValues = load(SAVE_KEY_CODE);
  if (saveValues) {
    const formValues = Object.entries(saveValues);
    formValues.forEach((value) => {
      const inputEl = document.querySelector(`[name=${value[0]}]`);
      inputEl.value = value[1];
    });
  }
}

function resetForm(e) {
  e.preventDefault();
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  e.currentTarget.reset();
  localStorage.removeItem(SAVE_KEY_CODE);
}
