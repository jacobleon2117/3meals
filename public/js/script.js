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
        caloriesInfo.textContent = `Calories: ${Math.round(recipe.calories)}`;
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
            // Change button text to "Added!"
            const addToFavoritesButton = document.getElementById(`addButton-${recipe.label.replace(/\s+/g, '-')}`);
            if (addToFavoritesButton) {
                addToFavoritesButton.textContent = 'Added!';
                addToFavoritesButton.disabled = true; // Disable the button after adding
            }
        }
    }
});