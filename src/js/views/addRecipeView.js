import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // Using FormData (a modern browser API)
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      console.log(data);

      const ingredients = [];

      const ingredientsElements = document.querySelectorAll('.ingredient');
      ingredientsElements.forEach(ingEl => {
        const quantity = ingEl.querySelector('[name="ing-quantity"]').value;
        const unit = ingEl.querySelector('[name="ing-unit"]').value;
        const description = ingEl.querySelector(
          '[name="ing-description"]'
        ).value;

        if (description)
          ingredients.push({
            quantity: quantity ? +quantity : null,
            unit,
            description,
          });
      });

      handler(data, ingredients);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
