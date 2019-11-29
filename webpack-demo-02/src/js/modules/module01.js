export const pi = 3.1416;
export const e = 2.71828;
export const log2 = 0.301029995663981;
var variableNoExportable = 222;

export function addTextToBody(text) {
  const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}

function validateEmail(email) {
  if(email.indexOf('@') != -1) {
    return true;
  }
  return false
}
export default validateEmail;

/* Podemos prepararlos para exportarlos todos de una vez */
export const module01 = {
  pi,
  e,
  log2,
  addTextToBody,
  validateEmail
}
