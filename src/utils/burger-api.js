const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default async function getData(url) {

  let apiData;

  await fetch(url)
    .then(res => checkReponse(res))
    .then(data => apiData = data.data)
  
  return apiData; 

}