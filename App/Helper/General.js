export const checkEmail = (myMail) => {
  const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (myMail === '' || !mailReg.test(String(myMail).toLowerCase())) {
    return false;
  }
  return true;
};

export const checkCharacter = (string) => {
  const charReg = /^[A-Za-z ]+$/;
  if (string === '' || !charReg.test(String(string).toLowerCase())) {
    return false;
  }
  return true;
};

export const checkNumbers = (string) => {
  const charReg = /^\d+$/;
  if (string === '' || !charReg.test(String(string).toLowerCase())) {
    return false;
  }
  return true;
};
