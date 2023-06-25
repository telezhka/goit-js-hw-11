// вешаем слухача на поиск
// поиск создает медиа запрос и через цикл генерит набор картинок

// import Notiflix from 'notiflix';
const searchForm = document.querySelector('.search-form');

const galleryBox = document.querySelector('.gallery');

const URL = 'https://pixabay.com/api/';
const API_KEY = '37812301-bb78e35e415e6149d67a423b2';

let requestArr = [];
searchForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  let requestPic = searchQuery.value;
  if (!requestPic) {
    return; // Не відправляти запит, якщо поле порожнє
  }
  galleryBox.innerHTML = '';
  fetchSearch(requestPic)
    .then(data => {
      if (data.total === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      requestArr = data.hits;
      //   console.log(requestArr);
      for (let i = 0; i < requestArr.length; i++) {
        const request = requestArr[i];
        let option = document.createElement('div');
        option.innerHTML = `
                    <div class="photo-card">
            <img src="${request.previewURL}" alt="${request.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
          ${request.likes}
              </p>
              <p class="info-item">
                <b>Views</b>
          ${request.views}
              </p>
              <p class="info-item">
                <b>Comments</b>
          ${request.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
          ${request.downloads}
              </p>
            </div>`;
        galleryBox.appendChild(option);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
//
//
function fetchSearch(requestPic) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${requestPic}&image_type=photo&orientation=horizontal`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
