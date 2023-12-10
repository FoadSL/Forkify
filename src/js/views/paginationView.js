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
      return (
        this._generateMarkupNumPages() + this._generateMarkupButton('next')
      );
    }

    // Last page
    if (this._curPage === this._numPages && this._numPages > 1) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupNumPages()
      );
    }

    // Other page
    if (this._curPage < this._numPages) {
      return (
        this._generateMarkupButton('prev') +
        this._generateMarkupNumPages() +
        this._generateMarkupButton('next')
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
    }

    // I shold also delete css comments

    if (direction === 'next') {
      goTo = this._data.page + 1;
      arrow = 'right';
    }

    return `
        <button data-goto="${goTo}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${goTo}</span>
        </button>
      `;
  }

  _generateMarkupNumPages() {
    return `
          <button class="btn--inline pagination__btn--middle">
            <span>${this._curPage} of ${this._numPages}</span>
          </button>
    `;
  }
}

export default new PaginationView();
