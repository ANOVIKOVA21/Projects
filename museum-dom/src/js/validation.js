/* eslint-disable prettier/prettier */
import { showError,deleteError } from './general-functions';
// eslint-disable-next-line import/no-cycle
import { ticketInfo } from './ticket-price-calculation';

export function validate(input, inputName) {
  const validityState = input.validity;
  if (validityState.tooShort) {
    input.setCustomValidity('Your value is too short');
  } else if (validityState.valueMissing) {input.setCustomValidity('This field is required');
  } else if (!validityState.patternMismatch) {input.setCustomValidity('');
  } else if (inputName === 'name') {
    input.setCustomValidity(
      'Enter your name in the format: Name Surname. Example: Michael Jackson. Use only latin letters.'
    );
  } else if (inputName === 'email') {
    input.setCustomValidity(
      'Enter your email in the format: myemail@example.com. Don\'t use spaces. Symbols \'@\' and \'.\' are required.'
    );
  } else if (inputName === 'phone') {
    input.setCustomValidity(
      'Enter your phone number in the format: 0551234567. You can use spaces or \'-\' if you want.'
    );
  }else if (inputName === 'cardNumber') {
    input.setCustomValidity(
      'Enter your card number in the format: 4564894856412385. You can use spaces if you want.'
    );
  }else if (inputName === 'cardholderName') {
    input.setCustomValidity(
      'Enter the cardholder\'s name exactly as it appears on the card. You have to use uppercase.'
    );
  }else if (inputName === 'cvv') return;
  if(!validityState.valid)showError(input, input.validationMessage);
}
export function checkAmount(form){
  const { basicAmount, seniorAmount } = ticketInfo;
  const el=form.querySelector('.booking__entry h4');
  const totalTicketsAmount=basicAmount+seniorAmount;
  
  if (totalTicketsAmount===0){
    showError(el,'You must select at least one ticket to buy');
    return false;
  } 
  deleteError(el);
  if(basicAmount<=20|| seniorAmount<=20) return true;
}
export function validateAmount (amountEl,event){
  let num = Math.abs(amountEl.value);
  if (isNaN(num)) amountEl.value = 0;
  // to make a two-digit number
  else if (String(num).length>2) num = Number(String(num).slice(0,2));
  amountEl.value = num;
  if (event.target.dataset.amount === 'basic') ticketInfo.basicAmount = num;
  else ticketInfo.seniorAmount = num;
}
export function checkValidation() {
  const fieldsToCheck = document.querySelectorAll('.field-validation');
  fieldsToCheck.forEach(field=>{
    if(!field.validity.valid) validate(field,field.name);
  });
}

