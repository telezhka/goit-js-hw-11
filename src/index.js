import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const loadBtn = document.querySelector('.load-more');
const galleryBox = document.querySelector('.gallery');

let requestArr = [];
let requestPic = '';

import { fetchSearch } from './js/requests.js';
import { markup } from './js/markup.js';

searchForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  page = 1;
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  requestPic = searchQuery.value;
  if (!requestPic) {
    return; // Не відправляти запит, якщо поле порожнє
  }
  galleryBox.innerHTML = '';
  fetchSearch(requestPic, page)
    .then(data => {
      if (data.total === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      requestArr = data.hits;
      markup(requestArr, galleryBox);
      loadBtn.removeAttribute('hidden');
    })
    .catch(error => {
      console.log(error);
    });
}
//
//
//

loadBtn.addEventListener('click', loaderHandler);
function loaderHandler() {
  page += 1;
  if (!requestPic) {
    return; // Не відправляти запит, якщо поле порожнє
  }
  fetchSearch(requestPic, page)
    .then(data => {
      if (data.total === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      requestArr = data.hits;
      //   console.log(requestArr);
      markup(requestArr, galleryBox);
    })
    .catch(error => {
      console.log(error);
    });
}
