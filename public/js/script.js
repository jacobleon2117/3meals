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
                // Update your UI with the fetched recipes
                recipeList.innerHTML = ''; // Clear the list
                data.hits.forEach(hit => {
                    const listItem = document.createElement('li');
                    listItem.textContent = hit.recipe.label;
                    recipeList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }
});
