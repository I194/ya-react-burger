const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const setCookie = (name, value, time) => {
  var expires = "";
  if (time) {
      var date = new Date();
      date.setTime(date.getTime() + time);
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
const getCookie = name => {
  var nameEQ = name + "=";
  var cArr = document.cookie.split(';');
  cArr.forEach((c, i) => {
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  })
  return null;
}

const eraseCookie = name => {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export async function getIngredients() {

  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(res => checkReponse(res))
    .then(data => data)
    .catch(e => console.log(e))

}

export async function postOrder(ingredientsId) {

  return fetch(`${BURGER_API_URL}/orders`, {
      method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: ingredientsId})
    })
    .then(res => checkReponse(res))
    .then(data => data)
    .catch(e => console.log(e))

}

export async function getAccToken(token) {

  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: token})
  })
  .then(res => checkReponse(res))
  .then(data => data)
  .catch(e => console.log(e))

}

export async function getUser() {

  return fetch(`${BURGER_API_URL}/auth/user`, {
    method: "GET", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': localStorage.accessToken
    }
  })
  .then(res => checkReponse(res))
  .then(data => data)

}

export async function updateUser(userData) {

  return fetch(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': localStorage.accessToken
    },
    body: JSON.stringify({...userData})
  })
  .then(res => checkReponse(res))
  .then(data => console.log(data))
  .catch(e => console.log(e))
  
}

export async function postAuth(email, pass) {

  return fetch(`${BURGER_API_URL}/auth/login`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: pass})
  })
  .then(res => checkReponse(res))
  .then(data => data)
  .catch(e => console.log(e))

}

export async function postLogout(token) {

  return fetch(`${BURGER_API_URL}/auth/logout`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: token})
  })
  .then(res => checkReponse(res))
  .then(data => data)
  .catch(e => console.log(e))

}

export async function postResetPassCode(email) {

  return fetch(`${BURGER_API_URL}/password-reset`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
  })
  .then(res => checkReponse(res))
  .then(data => data)

}

export async function postNewPass(pass, token) {

  return fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        password: pass,
        token: token
      }
    )
  })
  .then(res => checkReponse(res))
  .then(data => data)

}

export async function postNewUser(email, pass, name) {
  return fetch(`${BURGER_API_URL}/auth/register`, {
    method: "POST", 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        email: email,
        password: pass,
        name: name
      }
    )
  })
  .then(res => checkReponse(res))
  .then(data => data)

}