import * as check from '../components/view/popup/popupValidation';

describe('checkName function', () => {
  test('validation name1', () => {
    const name = 'Leonardo DiCaprio';
    const result = check.checkName(name);
    expect(result).toBe(true);
  });

  test('validation name2', () => {
    const name = 'Tyler Durden';
    const result = check.checkName(name);
    expect(result).toBe(true);
  });

  test('validation name3', () => {
    const name = 'Mr Jons';
    const result = check.checkName(name);
    expect(result).toBeFalsy();
  });

  test('validation name4', () => {
    const name = 'Vasiliy';
    const result = check.checkName(name);
    expect(result).toBeFalsy();
  });
});

describe('checkPhone function', () => {
  test('validation phone1', () => {
    const phone = '+79995468852';
    const result = check.checkPhone(phone);
    expect(result).toBe(true);
  });

  test('validation phone2', () => {
    const phone = '+375333452416';
    const result = check.checkPhone(phone);
    expect(result).toBe(true);
  });

  test('validation phone3', () => {
    const phone = '+7(928)-357-22-43';
    const result = check.checkPhone(phone);
    expect(result).toBeFalsy();
  });

  test('validation phone4', () => {
    const phone = '375(29)34-524-16';
    const result = check.checkPhone(phone);
    expect(result).toBeFalsy();
  });
});

describe('checkAdress function', () => {
  test('validation adress1', () => {
    const adress = 'Copper Canyon Mexico';
    const result = check.checkAdress(adress);
    expect(result).toBe(true);
  });

  test('validation adress2', () => {
    const adress = 'Eiffel Tower Paris';
    const result = check.checkAdress(adress);
    expect(result).toBe(true);
  });

  test('validation adress3', () => {
    const adress = 'New York USA';
    const result = check.checkAdress(adress);
    expect(result).toBeFalsy();
  });

  test('validation adress4', () => {
    const adress = 'Bermuda Triangle';
    const result = check.checkAdress(adress);
    expect(result).toBeFalsy();
  });
});

describe('checkEmail function', () => {
  test('validation email1', () => {
    const email = 'rolling-scopes-school@gmail.com';
    const result = check.checkEmail(email);
    expect(result).toBe(true);
  });

  test('validation email2', () => {
    const email = 'jordan_belfort62@gmail.com';
    const result = check.checkEmail(email);
    expect(result).toBe(true);
  });

  test('validation email3', () => {
    const email = 'rolingvasya.com';
    const result = check.checkEmail(email);
    expect(result).toBeFalsy();
  });

  test('validation email4', () => {
    const email = 'chepuha';
    const result = check.checkEmail(email);
    expect(result).toBeFalsy();
  });
});

describe('checkCardNumber function', () => {
  test('validation cardNumber1', () => {
    const cardNumber = '9999 9999 9999 9999';
    const result = check.checkCardNumber(cardNumber);
    expect(result).toBe(true);
  });

  test('validation cardNumber2', () => {
    const cardNumber = '5948 4564 4566 4566';
    const result = check.checkCardNumber(cardNumber);
    expect(result).toBe(true);
  });

  test('validation cardNumber3', () => {
    const cardNumber = '456465';
    const result = check.checkCardNumber(cardNumber);
    expect(result).toBeFalsy();
  });

  test('validation cardNumber4', () => {
    const cardNumber = 'wwwwww';
    const result = check.checkCardNumber(cardNumber);
    expect(result).toBeFalsy();
  });
});

describe('checkCardValid function', () => {
  test('validation сardValid1', () => {
    const cardValid = '12/55';
    const result = check.checkCardValid(cardValid);
    expect(result).toBe(true);
  });

  test('validation сardValid2', () => {
    const cardValid = '55/58';
    const result = check.checkCardValid(cardValid);
    expect(result).toBe(true);
  });

  test('validation сardValid3', () => {
    const cardValid = '15/6';
    const result = check.checkCardValid(cardValid);
    expect(result).toBeFalsy();
  });

  test('validation сardValid4', () => {
    const cardValid = '3/98';
    const result = check.checkCardValid(cardValid);
    expect(result).toBeFalsy();
  });
});

describe('checkCardCVV function', () => {
  test('validation cardCVV1', () => {
    const cardCVV = '123';
    const result = check.checkCardCVV(cardCVV);
    expect(result).toBe(true);
  });

  test('validation cardCVV2', () => {
    const cardCVV = '999';
    const result = check.checkCardCVV(cardCVV);
    expect(result).toBe(true);
  });

  test('validation cardCVV3', () => {
    const cardCVV = '12';
    const result = check.checkCardCVV(cardCVV);
    expect(result).toBeFalsy();
  });

  test('validation cardCVV4', () => {
    const cardCVV = 'www';
    const result = check.checkCardCVV(cardCVV);
    expect(result).toBeFalsy();
  });
});
