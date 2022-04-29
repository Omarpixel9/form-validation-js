const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');

const showError = (input, errorMessage) => {
  const inputSpan = input.nextElementSibling;
  inputSpan.textContent = errorMessage;
  input.classList.add('error');
};
const removeError = (input) => {
  const inputSpan = input.nextElementSibling;
  inputSpan.textContent = '';
  input.classList.remove('error');
};

const checkPasswordMatching = (password, confirmPassword) => {
  return password.value === confirmPassword.value;
};

const addEventListenerToSubmitButton = () => {
  const submitButton = form.querySelector('button');
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
  });
};

const addEventListenersToInputs = () => {
  inputs.forEach((input) => {
    let errorMessage = '';
    input.addEventListener('blur', () => {
      let isPassConfirmed;
      const passField = document.querySelector('#pass');
      const confirmPassField = document.querySelector('#confirm-pass');
      if (passField.value.length !== 0 && confirmPassField.value.length !== 0) {
        if (input.id === 'pass' || input.id === 'confirm-pass') {
          isPassConfirmed = checkPasswordMatching(passField, confirmPassField);
          console.log(isPassConfirmed);
          if (isPassConfirmed) {
            removeError(confirmPassField);
            confirmPassField.validity.valid = true;
          } else {
            showError(confirmPassField, 'Password does not match.');
            confirmPassField.setCustomValidity('Password does not match');
          }
        }
      }
      if (input.validity.valid && input.id !== 'confirm-pass') {
        removeError(input);
      } else {
        if (input.validity.valueMissing) {
          errorMessage = '* This field is required';
          showError(input, errorMessage);
        } else {
          if (input.id === 'email') {
            if (input.validity.tooShort || input.validity.tooLong)
              errorMessage = `Your email address must be between ${input.minLength} and ${input.maxLength} characters.`;
            showError(input, errorMessage);
            if (input.validity.typeMismatch)
              errorMessage =
                'Your email address must have the correct format.\nExample: "johnsmith@odin.com"';
            showError(input, errorMessage);
          } else if (input.id === 'country') {
            errorMessage =
              'This field must not have any numbers or special characters.';
            showError(input, errorMessage);
          } else if (input.id === 'zipcode') {
            if (input.validity.tooShort || input.validity.tooLong)
              errorMessage = `Your ZIP Code must be between ${input.minLength} and ${input.maxLength} characters.`;
            showError(input, errorMessage);
          } else if (input.id === 'pass') {
            errorMessage =
              'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
            showError(input, errorMessage);
          }
        }
      }
    });
  });
};

addEventListenersToInputs();
addEventListenerToSubmitButton();
