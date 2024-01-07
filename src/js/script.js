'use strict';
{
  const list = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  function render() {
   
    for (let book in dataSource.books) {
      const generatedHTML = booksTemplate(dataSource.books[book]);
      const element = utils.createDOMFromHTML(generatedHTML);
      list.appendChild(element);
    }
  }
  //Add book to fav list
  const favouriteBooks = [];

  function initActions() {
    //const listImages = document.querySelectorAll('.book__image');

    //for(let listImage of listImages){
    list.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedContainer = event.target.offsetParent;

      console.log( clickedContainer);
      const favId = clickedContainer.getAttribute('data-id');

      if(!favouriteBooks.includes(favId)){
        clickedContainer.classList.add('favorite');
        favouriteBooks.push(favId);
      }
      else {
        clickedContainer.classList.remove('favorite');
      }
    });
  }

  render();
  initActions();
}
