document.addEventListener('DOMContentLoaded', function() {
    const recipeList = document.getElementById('recipeList');

    // Retrieve favorite recipes from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Display favorite recipes
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
        });
        recipeCard.appendChild(removeButton);
    
        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.label;
        recipeCard.appendChild(recipeTitle);
    
        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);
    
        const caloriesInfo = document.createElement('p');
        caloriesInfo.textContent = `Calories: ${recipe.calories.toFixed(0)}`; // Round calories to the nearest whole number
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
        // Retrieve favorites from localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Find index of recipe in favorites
        const index = favorites.findIndex(favorite => favorite.label === recipe.label);

        if (index !== -1) {
            // Remove recipe from favorites
            favorites.splice(index, 1);
            
            // Update favorites in localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Re-display favorite recipes
            displayFavoriteRecipes(favorites);
        }
    }
});
