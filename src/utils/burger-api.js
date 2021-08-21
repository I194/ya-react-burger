const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default async function getIngredients() {

  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(res => checkReponse(res))
    .then(data => data.data)

}