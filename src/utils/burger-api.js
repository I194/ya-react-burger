const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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