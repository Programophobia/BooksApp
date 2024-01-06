'use strict';
{
  const list = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  function render() {
    const thisBooks = this;
   
    for (let book in dataSource.books) {
      const generatedHTML = booksTemplate(dataSource.books[book]);
      const element = utils.createDOMFromHTML(generatedHTML);
      list.appendChild(element);
    }
  }
  //Add book to fav list
  const favouriteBooks = [];

  function initActions() {
    const listImages = document.querySelectorAll('.book__image');

    for(let listImage of listImages){
      listImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        const favId = listImage.getAttribute('data-id');

        if(!favouriteBooks.includes(favId)){
          listImage.classList.add('favorite');
          favouriteBooks.push(favId);
        }
        else {
          listImage.classList.remove('favorite');
        }
      });
    }
  }

  render();
  initActions();
}
