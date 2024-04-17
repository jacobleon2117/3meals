document.addEventListener('DOMContentLoaded', function() {
    const recipeList = document.getElementById('recipeList');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    displayFavoriteRecipes(favorites);

    function displayFavoriteRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipeList.appendChild(recipeCard);
        });
    }

    function createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            removeFromFavorites(recipe);
            recipeCard.remove();
        });
        recipeCard.appendChild(removeButton);

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.label;
        recipeCard.appendChild(recipeTitle);

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);

        const caloriesInfo = document.createElement('p');
        caloriesInfo.classList.add('recipe-card-calories');
        caloriesInfo.textContent = `Calories: ${Math.round(recipe.calories)}`;
        recipeCard.appendChild(caloriesInfo);

        // Ingredients
        const ingredientsTitle = document.createElement('h4');
        ingredientsTitle.textContent = 'Ingredients:';
        recipeCard.appendChild(ingredientsTitle);

        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = ingredient.text;
            ingredientsList.appendChild(ingredientItem);
        });
        recipeCard.appendChild(ingredientsList);

        // Instructions
        const instructionsTitle = document.createElement('h4');
        instructionsTitle.textContent = 'Instructions:';
        recipeCard.appendChild(instructionsTitle);

        const instructions = document.createElement('p');
        instructions.textContent = recipe.instructions || 'No instructions available.';
        recipeCard.appendChild(instructions);

        return recipeCard;
    }

    function removeFromFavorites(recipe) {
        const index = favorites.findIndex(favorite => favorite.label === recipe.label);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            displayFavoriteRecipes(favorites);
        }
    }

    function isFavorite(recipe) {
        return favorites.some(favorite => favorite.label === recipe.label);
    }

    function toggleFavorite(recipe) {
        const index = favorites.findIndex(favorite => favorite.label === recipe.label);
        if (index === -1) {
            favorites.push(recipe);
        } else {
            favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavoriteRecipes(favorites);
    }

    function updateAddToFavoritesButton(recipe) {
        const addButton = document.createElement('button');
        addButton.textContent = isFavorite(recipe) ? 'Already Added!' : 'Add to Favorites';
        addButton.classList.add('add-button');
        addButton.addEventListener('click', function() {
            toggleFavorite(recipe);
        });
        return addButton;
    }

    function updateRecipeCardButtons() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
            const recipeTitle = card.querySelector('h3').textContent;
            const recipeImage = card.querySelector('img').src;
            const recipeCalories = parseInt(card.querySelector('.recipe-card-calories').textContent.split(' ')[1]);
            const recipe = {
                label: recipeTitle,
                image: recipeImage,
                calories: recipeCalories
            };

            const addButton = updateAddToFavoritesButton(recipe);
            const existingButton = card.querySelector('.add-button');
            if (existingButton) {
                card.replaceChild(addButton, existingButton);
            }
        });
    }

    updateRecipeCardButtons();
});
