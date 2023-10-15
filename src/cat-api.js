import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_hhxdtQhDtfiUqVSDlHqptY6o796RAjgxgXTDXHo9hJPvz2WHb87quOt9fQ94lvXt';
axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return axios.get(`${BASE_URL}breeds`).then(response => {
    if (response.status != 200) {
      throw new Error(
        `Вимушена помилка статусу: ${response.status} | Причина: ${response.statusText}`
      );
    }

    return response.data;
  });
}
function fetchCatByBreed(breedsId) {
  const params = new URLSearchParams({
    breed_ids: breedsId,
  });
  return axios.get(`${BASE_URL}images/search?${params}`).then(response => {
    if (response.status !== 200) {
      throw new Error(
        `Вимушена помилка статусу: ${response.status} | Причина: ${response.statusText}`
      );
    }
    return response.data;
  });
}
export { fetchBreeds, fetchCatByBreed };
