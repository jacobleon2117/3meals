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
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);

        const caloriesInfo = document.createElement('p');
        caloriesInfo.textContent = `Calories: ${recipe.calories.toFixed(1)}`;
        recipeCard.appendChild(caloriesInfo);

        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = ingredient.text;
            ingredientsList.appendChild(ingredientItem);
        });
        recipeCard.appendChild(ingredientsList);

        return recipeCard;
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