const display_food = (foods) => {
    const container = document.getElementById("card_view");
    container.innerHTML = '';
    container.classList.remove('d-none');
    foods.forEach((food) => { 
        const div = document.createElement("div");
        div.classList.add("card", "p-2", "m-2");
        div.style.width = "18rem";
        div.innerHTML = `
          <img src="${food.strMealThumb}" class="card-img-top" alt="Photo">
          <div class="card-body">
              <h5 class="card-title">${food.strMeal}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${food.idMeal}</h6>
              <button class="btn btn-primary" onclick="showFoodDetails('${food.idMeal}')">View Details</button>
          </div>`;
        container.appendChild(div);
    });
};

const showFoodDetails = (idMeal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then((res) => res.json())
        .then((data) => {
            const food = data.meals[0];
            const modalContent = document.getElementById("modalContent");
            modalContent.innerHTML = `
                <h2>${food.strMeal}</h2>
             <img src="${food.strMealThumb}" class="img-fluid" alt="${food.strMeal}">
                <p>Category: ${food.strCategory}</p>
                 <p>Area: ${food.strArea}</p>
                 <p>Instructions: ${food.strInstructions.slice(0,100)}</p>
                 <button id="closeModalButton" class="btn btn-primary">Close</button>

            `;
            const foodModal = new bootstrap.Modal(document.getElementById('foodModal'));
            foodModal.show();
        })
        .catch((error) => {
            console.error('Error fetching food details: ', error);
        });
};

document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    const container = document.getElementById("card_view");
    if (searchInput.trim() !== "") {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.meals) {
                    display_food(data.meals);
                } else {
                    container.innerHTML = `
                        <div class="text-center fs-5">
                           <i class="fa-regular fa-face-sad-tear"></i>
                            <p class="sorry" >Sorry, Your Searching Food is Not Found...</p>
                        </div>`;
                     container.classList.remove('d-none'); // visible 
                 }
             })
             .catch((error) => {
                 console.error('Found the Searching error ', error);
             });
    } else {
        container.classList.add('d-none');  // display invisible 
    } 
});
