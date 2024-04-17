document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const recipeList = document.getElementById('recipeList');

    // Fetch pre-loaded recipes when the page loads
    fetchRecipes("chicken"); // You can change "chicken" to any default query you want to use

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('searchInput').value;
        fetchRecipes(query);
    });

    function fetchRecipes(query) {
        fetch(`/api/recipes?q=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                recipeList.innerHTML = ''; // Clear previous recipe cards
                data.hits.forEach(hit => {
                    const recipeCard = createRecipeCard(hit.recipe);
                    recipeList.appendChild(recipeCard);
                });
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }

    function createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.label;
        recipeCard.appendChild(recipeTitle);

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);

        const caloriesInfo = document.createElement('p');
        caloriesInfo.textContent = `Calories: ${recipe.calories.toFixed(1)}`;
        recipeCard.appendChild(caloriesInfo);

        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = isFavorite(recipe) ? 'Added!' : 'Add to Favorites'; // Check if the recipe is already in favorites
        addToFavoritesButton.addEventListener('click', function() {
            toggleFavorite(recipe);
            addToFavoritesButton.textContent = isFavorite(recipe) ? 'Added!' : 'Add to Favorites'; // Update button text
        });
        recipeCard.appendChild(addToFavoritesButton);

        return recipeCard;
    }

    function addToFavorites(recipe) {
        // Retrieve favorites from localStorage or initialize an empty array
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Check if the recipe already exists in favorites
        const isDuplicate = favorites.some(favorite => favorite.label === recipe.label);
        
        if (!isDuplicate) {
            // Add the selected recipe to favorites
            favorites.push(recipe);
            // Update favorites in localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
            // Notify the user
            alert('Recipe added to favorites!');
        } else {
            // Notify the user that the recipe is already in favorites
            alert('This recipe is already in your favorites!');
        }
    }

    function isFavorite(recipe) {
        // Retrieve favorites from localStorage or initialize an empty array
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        // Check if the recipe already exists in favorites
        return favorites.some(favorite => favorite.label === recipe.label);
    }

    function toggleFavorite(recipe) {
        // Retrieve favorites from localStorage or initialize an empty array
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        // Check if the recipe already exists in favorites
        const index = favorites.findIndex(favorite => favorite.label === recipe.label);
        if (index === -1) {
            // Add the selected recipe to favorites
            favorites.push(recipe);
        } else {
            // Remove the recipe from favorites
            favorites.splice(index, 1);
        }
        // Update favorites in localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
});
