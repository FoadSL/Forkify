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
    this._parentElement.addEventListener(
      'click',
      this._addHandlerIngredients.bind(this)
    );
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

  _addHandlerIngredients(e) {
    const actionBox = e.target.closest('.upload__action');
    if (!actionBox) return;

    if (e.target.closest('.upload__action-btn--add'))
      this._addHandlerIngredient('add', actionBox);

    if (e.target.closest('.upload__action-btn--delete'))
      this._addHandlerIngredient('delete', actionBox);
  }

  _addHandlerIngredient(action, actionBox) {
    const allIngredients = document.querySelectorAll('.ingredient');
    const ingredientsNum = allIngredients.length;

    if (action === 'add') {
      const markup = this._generateIngredientMarkup(ingredientsNum);
      actionBox.parentElement.insertAdjacentHTML('beforeend', markup);
    }

    if (action === 'delete') {
      if (ingredientsNum === 1) return;

      const previousInput = actionBox.previousElementSibling;
      const previousLabel = previousInput.previousElementSibling;
      actionBox.remove();
      previousInput.remove();
      previousLabel.remove();
    }
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // Using FormData (a modern browser API)
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

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

  _generateIngredientMarkup(ingsNum) {
    return `
<label class="upload__label">Ingredient</label>
          <div class="ingredient" data-ingredient-number="">
            <div class="upload__ingredient">
              <label for="quantity">Quantity</label>
              <label for="unit">Unit</label>
              <label for="description">Description</label>
              <input
                class="upload__input upload__input--quantity"
                type="number"
                step="any"
                min="0"
                name="ing-quantity"
                placeholder=""                
              />
              <input
                class="upload__input upload__input--unit"
                type="text"
                name="ing-unit"
                placeholder=""                
              />
              <input
                class="upload__input upload__input--description"
                type="text"
                name="ing-description"
                placeholder=""                
                required
                required
              />
            </div>
          </div>
          <div class="upload__action">
            <a href="#" class="upload__action-btn upload__action-btn--delete">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </a>
            <a href="#" class="upload__action-btn upload__action-btn--add">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </a>
          </div>
        `;
  }
}

export default new AddRecipeView();
