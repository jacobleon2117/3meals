document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const recipeList = document.getElementById('recipeList');

    fetchRecipes("chicken");

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
        addToFavoritesButton.id = `addButton-${recipe.label.replace(/\s+/g, '-')}`; // Assign a unique ID
        addToFavoritesButton.addEventListener('click', function() {
            addToFavorites(recipe);
        });
        recipeCard.appendChild(addToFavoritesButton);
    
        return recipeCard;
    }
    

    function addToFavorites(recipe) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isDuplicate = favorites.some(favorite => favorite.label === recipe.label);
        
        if (!isDuplicate) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            const addToFavoritesButton = document.getElementById(`addButton-${recipe.label.replace(/\s+/g, '-')}`);
            if (addToFavoritesButton) {
                addToFavoritesButton.textContent = 'Added!';
                addToFavoritesButton.disabled = true;
            }
        }
    }
});
