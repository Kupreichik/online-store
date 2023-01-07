export function checkName(name: string) {
  const rx = /^[a-zа-яё]{3,}\s[a-zа-яё]{3,}\D*/gi;
  return rx.test(name.toLowerCase());
}

export function checkPhone(phone: string) {
  const rx = /^\+\d{9,}/;
  return rx.test(phone);
}

export function checkAdress(adress: string) {
  const rx = /^[a-zа-яё]{5,}\s[a-zа-яё]{5,}\s[a-zа-яё]{5,}\D*/gi;
  return rx.test(adress.toLowerCase());
}

export function checkEmail(email: string) {
  const rx = /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
  return rx.test(email.toLowerCase());
}

export function checkCardNumber(cardNumber: string) {
  const rx = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
  return rx.test(cardNumber);
}

export function checkCardValid(valid: string) {
  const rx = /\d{2}\/\d{2}/;
  return rx.test(valid);
}

export function checkCardCVV(cvv: string) {
  const rx = /\d{3}/;
  return rx.test(cvv);
}
