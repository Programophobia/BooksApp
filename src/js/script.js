'use strict';

const filters = [];

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  render() {
    const thisBooksList = this;
    const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

    for (let book in dataSource.books) {
      let ratingBgc = thisBooksList.determineRatingBgc(dataSource.books[book].rating);
      let ratingWidth = dataSource.books[book].rating *10;
     
      const allRating= dataSource.books[book];
      allRating.ratingBgc = ratingBgc;
      allRating.ratingWidth = ratingWidth;

      const generatedHTML = booksTemplate(dataSource.books[book]);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.list.appendChild(element);
    }
  }

  getElements() {
    const  thisBooksList = this;
    thisBooksList.list = document.querySelector('.books-list');
    thisBooksList.filtersForm = document.querySelector('.filters');
  }

  initActions() {
    const thisBooksList = this;
    const favouriteBooks = [];

    thisBooksList.list.addEventListener('dblclick', function(event){
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

    thisBooksList.filtersForm.addEventListener('click', function(event){
      if (event.target.checked){
        filters.push(event.target.value);
        console.log(filters);
      }
      else {
        filters.splice(filters.indexOf(event.target.value),1);
      }
      thisBooksList.filterBooks();
    });
  }

  filterBooks() {
    for (let book of dataSource.books){
      let hidden = false;
      for (const filter of filters){
        if (!book.details[filter]){
          hidden = true;
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

  determineRatingBgc(rating){
    if (rating <6)
      return  'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if (rating >6 && rating<=8)
      return  'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if (rating >8 && rating<=9)
      return  'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
}
const app = new BooksList();
console.log('app', app);

