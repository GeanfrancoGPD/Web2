export const validateUsername = (value) => {
  // Chequear que la longitud sea mayor a 6 caracteres
  // Chequear que el username no exista en la lista de usernames

  // const username = document.getElementById('username').value;
  // if (username && username.length < 6) {
  //   console.log('Username is not valid');
  //   setPopUpMessage({
  //     isVisible: true,
  //     content: 'Username must be at least 6 characters long.',
  //     buttonText: 'Close',
  //     onClose: () => setPopUpMessage(prev => ({ ...prev, isVisible: false })),
  //   });
  //   return false;
  // }

  if (value && value.length < 6 && value.length > 0) {
    return 'Username must be at least 6 characters long.';
  }
  if (listUsernames.includes(value)) {
    return 'Username is already taken.';
  }

  return '';
}

export const validateEmail = (email) => {
  // Chequear que el email tenga un formato válido

  const emailRegex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');

  if (email && email.length > 0 && !emailRegex.test(email)) {
    return 'Email is not valid';
  }
  return '';
}

export const validatePassword = (text) => {
  // Chequear que la contraseña tenga al menos 8 caracteres
  // Chequear que la contraseña tenga al menos una mayúscula, una minúscula, un número y un carácter especial

  let errorText = '';
  const length = text.length > 8;
  const numberRegex = new RegExp('[0-9]');
  const uppercaseRegex = new RegExp('[A-Z]');
  const lowercaseRegex = new RegExp('[a-z]');
  const symbolRegex = /[-:+_º·$/[\]}{|~€|@#~€¬`«»%()?¿¡;.'"!@#\\$//%\\^,&\\*]/;

  //Regex to number (rtn)
  const rtn = (regex) => regex.test(text) ? 1 : 0;

  const safety = rtn(symbolRegex) + rtn(lowercaseRegex) + rtn(uppercaseRegex) + rtn(numberRegex) + length;
  // safety <= 3 ? setPasswordState('low') : safety < 5 ? setPasswordState('medium') : setPasswordState('high');

  if (text.length > 0) {
    if (text.length < 8) {
      errorText = 'Must have at least 8 characters'
    } else if (!uppercaseRegex.test(text)) {
      errorText = 'Must contain at least one uppercase letter'
    } else if (!lowercaseRegex.test(text)) {
      errorText = 'Must contain at least one lowercase letter'
    } else if (!numberRegex.test(text)) {
      errorText = 'Must contain at least one number'
    } else if (!symbolRegex.test(text)) {
      errorText = 'Must contain at least one symbol'
    } else {
      errorText = '';
    }
  }
  return errorText;
}

export const validateConfirmPassword = (pass, confirmPass) => {
  // Chequear que la contraseña de confirmación sea igual a la contraseña

  if (pass !== confirmPass) {
    return 'Passwords do not match';
  }
  return '';
}