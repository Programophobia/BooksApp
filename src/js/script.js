'use strict';
{
  const list = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const filtersForm = document.querySelector('.filters');

  function render() {
   
    for (let book in dataSource.books) {
      const generatedHTML = booksTemplate(dataSource.books[book]);
      const element = utils.createDOMFromHTML(generatedHTML);
      list.appendChild(element);
    }
  }
  //Add book to fav list
  const favouriteBooks = [];
  const filters = [];

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

    filtersForm.addEventListener('click', function(event){
    
      if (event.target.checked){
        filters.push(event.target.value);
        console.log(filters);
      }
      else {
        filters.splice(filters.indexOf(event.target.value),1);
      }

      filterBooks();
    });
  }

  function filterBooks() {
    for (let book of dataSource.books){
      let hidden = false;
      for (const filter of filters){
        if (!book.details[filter]){
          hidden = true;
        // break;
        }
        const bookElement = document.querySelector('.book__image[data-id="' + book.id +'"]');
        if (hidden) {
          bookElement.classList.add('hidden');
        }
        else {
          bookElement.classList.remove('hidden');
        }
      }
    }
  }
  render();
  initActions();
}
