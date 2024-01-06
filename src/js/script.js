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
  render();
}

