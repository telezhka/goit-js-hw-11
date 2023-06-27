const URL = 'https://pixabay.com/api/';
const API_KEY = '37812301-bb78e35e415e6149d67a423b2';

const fetchSearch = async (requestPic, page) => {
  const response = await fetch(
    `${URL}?key=${API_KEY}&q=${requestPic}&image_type=photo&orientation=horizontal&per_page=40&page=${page}`
  );
  const users = await response.json();
  return users;
};
export { fetchSearch };
