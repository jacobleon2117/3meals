document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const recipeList = document.getElementById('recipeList');

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
                recipeList.innerHTML = '';
                if (data.hits.length === 0) {
                    fetchClosestMatches(query);
                } else {
                    data.hits.forEach(hit => {
                        const recipeCard = createRecipeCard(hit.recipe);
                        recipeList.appendChild(recipeCard);
                    });
                }
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
        recipeImage.src = recipe.image || 'images/placeholder_recipe.jpg'; // Provide a placeholder image URL
        recipeCard.appendChild(recipeImage);

        const caloriesInfo = document.createElement('p');
        caloriesInfo.textContent = `Calories: ${recipe.calories.toFixed(1)}`;
        recipeCard.appendChild(caloriesInfo);

        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Favorites';
        addToFavoritesButton.addEventListener('click', function() {
            addToFavorites(recipe);
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

    function fetchClosestMatches(query) {
        fetch(`/api/closest-matches?q=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                recipeList.innerHTML = '<p>No matching recipes found. Here are some suggestions:</p>';
                data.matches.forEach(match => {
                    const matchItem = document.createElement('p');
                    matchItem.textContent = match;
                    recipeList.appendChild(matchItem);
                });
            })
            .catch(error => {
                console.error('Error fetching closest matches:', error);
            });
    }
});
