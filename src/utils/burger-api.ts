const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getIngredients() {

  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(res => checkReponse(res))
    .then(data => data)

}

export async function postOrder(ingredientsId: string[]) {

  return fetch(`${BURGER_API_URL}/orders`, {
      method: "POST", 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': localStorage.accessToken
      },
      body: JSON.stringify({ingredients: ingredientsId})
    })
    .then(res => checkReponse(res))
    .then(data => data)
    .catch(e => console.log(e))

}

export async function getOrders() {

  return fetch(`${BURGER_API_URL}/orders/all`)
    .then(res => checkReponse(res))
    .then(data => data)

}

export async function getUserOrders() {
  // console.log(localStorage.accessToken, `${BURGER_API_URL}/orders?token=${localStorage.accessToken.split(' ')[1]}`);
  return fetch(`${BURGER_API_URL}/orders?token=${localStorage.accessToken.split(' ')[1]}`, {
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

export async function getAccToken(token: string) {

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

export async function updateUser(userData: {name: string, email: string, password: string}) {

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
  
}

export async function postAuth(email: string, pass: string) {

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

}

export async function postLogout(token: string) {

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

}

export async function postResetPassCode(email: string) {

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

export async function postNewPass(pass: string, token: string) {

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

export async function postNewUser(email: string, pass: string, name: string) {
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