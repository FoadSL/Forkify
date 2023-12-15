import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAddIngredient = document.querySelector('.upload__add-btn');
  _btnDeleteIngredient = document.querySelector('.upload__delete-btn');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerIngredients();
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

  _addHandlerIngredients() {
    this._btnAddIngredient.addEventListener(
      'click',
      this._addHandlerIngredient.bind(this, 'add')
    );
    this._btnDeleteIngredient.addEventListener(
      'click',
      this._addHandlerIngredient.bind(this, 'delete')
    );
  }

  _addHandlerIngredient(action, e) {
    e.preventDefault();
    const allIngredients = document.querySelectorAll('.ingredient');
    const ingredientsNum = allIngredients.length;
    if (action === 'add') {
      const markup = this._generateIngredientMarkup(ingredientsNum);
      e.currentTarget.insertAdjacentHTML('beforebegin', markup);
    }
    if (action === 'delete') {
      const lastIngredient = allIngredients[ingredientsNum - 1];
      lastIngredient.previousElementSibling.remove(); // Remove the label of ingredient
      lastIngredient.remove(); // remove the ingredient
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
        <label>Ingredient ${++ingsNum}</label>
        <div class="ingredient" data-ingredient-number="${++ingsNum}">
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
              />
            </div>
        </div>`;
  }
}

export default new AddRecipeView();
