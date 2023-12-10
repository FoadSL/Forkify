import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;
  _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._curPage === 1 && this._numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (this._curPage === this._numPages && this._numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // Other page
    if (this._curPage < this._numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }

    // Page 1, and there are NO other pages
    if (this._curPage === 1 && this._numPages === 1) {
      return ``;
    }
  }

  _generateMarkupButton(direction) {
    let goTo, arrow;
    let markup = ``;

    if (direction === 'prev') {
      goTo = this._data.page - 1;
      arrow = 'left';

      markup += `
        <button data-goto="${goTo}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${goTo}</span>
        </button>
      `;
    }

    markup += `
          <button class="btn--inline pagination__btn--middle">
            <span>${this._curPage} of ${this._numPages}</span>
          </button>
    `;
    // I should make a function for number of pages and call it in _generateMarkup() based on if

    if (direction === 'next') {
      goTo = this._data.page + 1;
      arrow = 'right';

      markup += `
        <button data-goto="${goTo}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${goTo}</span>
        </button>
      `;
    }

    return markup;
  }
}

export default new PaginationView();
