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
                console.log(data); // Process the data as needed
                // UI with the fetched recipes
                recipeList.innerHTML = ''; // Clear the list
                data.hits.forEach(hit => {
                    const listItem = document.createElement('li');
                    const recipeTitle = document.createElement('h3');
                    recipeTitle.textContent = hit.recipe.label;
                    listItem.appendChild(recipeTitle);
    
                    const recipeImage = document.createElement('img');
                    recipeImage.src = hit.recipe.image;
                    listItem.appendChild(recipeImage);
    
                    const nutritionInfo = document.createElement('p');
                    // Display calories with one decimal place
                    nutritionInfo.textContent = `Calories: ${hit.recipe.calories.toFixed(1)}`;
                    listItem.appendChild(nutritionInfo);
    
                    // API response includes an array of ingredients
                    const ingredientsList = document.createElement('ul');
                    hit.recipe.ingredients.forEach(ingredient => {
                        const ingredientItem = document.createElement('li');
                        ingredientItem.textContent = ingredient.text; // ingredient is an object with a 'text' property
                        ingredientsList.appendChild(ingredientItem);
                    });
                    listItem.appendChild(ingredientsList);

                    recipeList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }
});
