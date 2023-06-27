function markup(requestArr, galleryBox) {
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
}
export { markup };
