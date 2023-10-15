import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  pLoader: document.querySelector('.loader'),
  pError: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};

refs.pLoader.style.display = 'none';
refs.pError.style.display = 'none';
refs.breedSelect.style.display = 'none';
refs.divCatInfo.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    Notiflix.Loading.pulse(refs.pLoader.textContent);
    refs.breedSelect.style.display = 'flex';
    const markupOptions = breeds
      .map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      })
      .join('');
    refs.breedSelect.insertAdjacentHTML('beforeend', markupOptions);
    new SlimSelect({ select: refs.breedSelect });
  })
  .catch(pError => Notify.failure(refs.pError.textContent))
  .finally(res => Loading.remove());

refs.breedSelect.addEventListener('change', handleSelect);

function handleSelect(event) {
  refs.divCatInfo.style.display = 'none';
  Notiflix.Loading.pulse(refs.pLoader.textContent);
  const breedsId = event.currentTarget.value;
  fetchCatByBreed(breedsId)
    .then(data => {
      refs.divCatInfo.style.display = 'flex';
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      const markupCatsInfo = `
      <h1 class="cat-name">${name}</h1>
      <img class="cat-img" src="${url}" alt="${name}" width="300" >
       <div class="cat-text">
       <h2>Description:</h2>
      <p class="cat-description">${description}</p>
      <h2>Temperament:</h2>
      <p class="cat-temperament">${temperament}</p>
      </div>`;

      refs.divCatInfo.innerHTML = markupCatsInfo;
    })
    .catch(pError => {
      refs.divCatInfo.style.display = 'none';
      Notify.warning(refs.pError.textContent);
    })
    .finally(res => Loading.remove());
}
