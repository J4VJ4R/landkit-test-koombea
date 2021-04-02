document.addEventListener('DOMContentLoaded', get);

function get() {
  const url = 'https://landkit-on-heroku.herokuapp.com/';
  let URLactual = window.location.href;
  fetch('https://landkit-test-koombea.herokuapp.com/posts')
    .then(res => res.json())
    .then(result => showResults(result));
  if (URLactual == url) {
    fetch('https://landkit-test-koombea.herokuapp.com/posts')
      .then(res => res.json())
      .then(result => showHTML(result));
  } else if(URLactual.indexOf('?id=') != -1){
    fetch('https://landkit-test-koombea.herokuapp.com/posts')
      .then(res => res.json())
      .then(result => showFullPost(result))
  } else {
    fetch('https://landkit-test-koombea.herokuapp.com/posts')
      .then(res => res.json())
      .then(result => showFavorite(result))
  }
}
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//function to show full post
function showFullPost(data){
  let content = document.querySelector('.js-full-post-content')
  const idPost =  getParameterByName("id");
  let html = '';
  
  data.forEach(profile => {
    const {
      title,
      id,
      description,
      imgAvatar,
      authorName,
      bodyText
    } = profile;
    
    if(id == idPost ){
      html += `    
      <div class="full-post__container">
      <section class="full-post__content ">
        <h1 class="full-post__title">${title}</h1>
        <p class="full-post__description">
          ${description}
        </p>
        <div class="full-post__author-info">
          <div class="full-post__meta">
            <img class="full-post__author-img" src="${imgAvatar}" width="36" height="36" alt="${title}">
            <div class="full-post__name-time">
              <h2 class="full-post__name-time-title">${authorName}</h2>
              <span class="full-post__name-time-subtitle">Published on </span>
              <span class="full-post__name-time-subtitle"><time datetime="2021-2-3">May 20, 2019</time> </span>
            </div>
          </div>
          <div class="full-post__social-media">
            <span class="full-post__title-social-media">SHARE:</span>
            <ul class="full-post__list">
              <li><a class="full-post__link" href="#"><span class="icon-instagram"></span></a></li>
              <li><a class="full-post__link" href="#"><span class="icon-facebook"></span></a></li>
              <li><a class="full-post__link" href="#"><span class="icon-twitter"></span></a></li>
            </ul>
          </div>
        </div>
        <figure class="full-post__figure">
          <img class="full-post__figure-img" src="https://picsum.photos/680/395" alt="${title}">
          <span class="full-post__reference">This is a caption on this photo for reference</span>
        </figure>
        <section class="full-post__body">
          <p class="full-post__body-text">
            ${bodyText}
            ${bodyText}
            ${bodyText}
            ${bodyText}
          </p>
          <p class="full-post__body-text">
            ${bodyText}
            ${bodyText}
            ${bodyText}
            ${bodyText}
          </p><p class="full-post__body-text">
          ${bodyText}
          ${bodyText}
          ${bodyText}
          ${bodyText}
        </p>
        </section>
      </section>
    </div>
      `
    }else if(id == "55" ){
      html += `
      
      <h2>test2</h2>
      `
    }
  });
  content.innerHTML = html;
}
//function to show all elements
function showHTML(data) {
  let content = document.querySelector('.js-posts-container');

  let html = '';

  data.forEach(profile => {
    const {
      author,
      postImg,
      title,
      description,
      favorite,
      imgAvatar,
      datePost,
      authorName,
      id

    } = profile;
    if (favorite === "true") {
      html += `
      <article class="posts__content js-posts-content">
      <aside class="posts__item js-post-item">
        <figure class="posts__figure">
          <img class="posts__img" src="${postImg}" alt="${title}">
          <img class="posts__img2" src="./img/star-on.png" alt="${title}">
          <a href="#" class="posts__figure-link-yellow" type="button">$49/MO</a>
        </figure>
      </aside>
      <header class="posts__header">
        <a class="posts__header-link" href="https://land-kit.herokuapp.com/post.html?id=${id}">
          <h3 class="posts__title">${title}</h3>
        </a>
      </header>
      <div class="posts__body">
        <p class="posts__body-description">${description}...</p>
      </div>
      <footer class="posts__footer">
        <figure class="posts__footer-figure">
          <img class="posts__footer-figure-img" src="${imgAvatar}" width="23" height="24" alt="${authorName}">
        </figure>
        <span class="posts__footer-author">
          ${authorName}
        </span>
        <span class="posts__footer-date">
          ${datePost}/02
        </span>
      </footer>
    </article>
      `
      
    }else{
      html += `
      <article class="posts__content js-posts-content">
      <aside class="posts__item js-post-item">
        <figure class="posts__figure">
          <img class="posts__img" src="${postImg}" alt="${title}">
          <img class="posts__img2" src="./img/star-off.png" alt="${title}">
          <a href="#" class="posts__figure-link-red" type="button">$49/MO</a>
        </figure>
      </aside>
      <header class="posts__header">
        <a class="posts__header-link" href="https://land-kit.herokuapp.com/post.html?id=${id}">
          <h3 class="posts__title">${title}</h3>
        </a>
      </header>
      <div class="posts__body">
        <p class="posts__body-description">${description}...</p>
      </div>
      <footer class="posts__footer">
        <figure class="posts__footer-figure">
          <img class="posts__footer-figure-img" src="${imgAvatar}" width="23" height="24" alt="${authorName}">
        </figure>
        <span class="posts__footer-author">
          ${authorName}
        </span>
        <span class="posts__footer-date">
          ${datePost}/02
        </span>
      </footer>
    </article>
      `
    }
  });
  content.innerHTML = html;
  //function to load more elements
  $(".js-posts-content").slice(0, 6).show();
  $('.js-load-more').on("click", function(){
    $('.js-posts-content:hidden').slice(0, 6).slideDown();
  });
}
//function to favorite
function showFavorite(data) {
  let contentFavorite = document.querySelector('.js-content-favorite');
  let html = '';

  data.forEach(profile => {
    const {
      authorName,
      postImg,
      title,
      description,
      favorite,
      imgAvatar,
      datePost,
      id
    } = profile;
    if (favorite === "true") {
      html += `
      <article class="posts__content js-post-item">
      <aside class="posts__item ">
        <figure class="posts__figure">
          <img class="posts__img" src="${postImg}" alt="${title}">
          <img class="posts__img2" src="./img/star-on.png" alt="${title}">
          <a href="#" class="posts__figure-link-yellow" type="button">$49/MO</a>
        </figure>
      </aside>
      <header class="posts__header">
        <a class="posts__header-link" href="https://land-kit.herokuapp.com/post.html?id=${id}">
          <h3 class="posts__title">${title}</h3>
        </a>
      </header>
      <div class="posts__body">
        <p class="posts__body-description">${description}...</p>
      </div>
      <footer class="posts__footer">
        <figure class="posts__footer-figure">
          <img class="posts__footer-figure-img" src="${imgAvatar}" width="23" height="24" alt="${authorName}">
        </figure>
        <span class="posts__footer-author">
          ${authorName}
        </span>
        <span class="posts__footer-date">
          ${datePost}/02
        </span>
      </footer>
    </article>
      `
    }
  });
  contentFavorite.innerHTML = html;
  //function to load more elements
  $(".js-post-item").slice(0, 6).show();
  $('.js-load-more').on("click", function(){
    $('.js-post-item:hidden').slice(0, 6).slideDown();
  });
}

//function to results on search

function showResults(data) {
  let contentResults = document.querySelector('.js-search-result-row');
  let html = '';

  data.forEach(profile => {
    const {
      title,
      id
    } = profile;
    html += `
    <tr class="search-result__row ">
      <td class="search-result__item"><a class="search-result__link " href="post.html?id=${id}">${title}</a></td>
    </tr>
      `
  });
  contentResults.innerHTML = html;
  //function to query the elements on the api
  let query = $('.js-search-table').DataTable();
  $('.js-search-input').keyup(function () {
    query.search($(this).val()).draw();
    $('.js-search-result').css({
      "display": "block"
    });
    $('.js-search-navigation').css({
      "height": "100vh"
    });
    $('.js-search').css({
      "background-color": "$color-three",
      "position": "fixed",
      "width": "100%"
    });
    $('.js-search-input').css({
      "border-bottom-left-radius": "0px",
      "border-bottom-right-radius": "0px",
      "border": "none"
    })
    if ($('.js-search-input').val() == "") {
      $('.js-search-navigation').css({
        "height": "auto"
      })
      $('.js-search-result').fadeOut();
      $('.search').css({
        "position": "initial"
      })
    } else {
      $('.js-search-result').fadeIn()
    }
  })
}