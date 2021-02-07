
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
    const searchMeal = document.getElementById("search-input").value;
    loadData(searchMeal);
})

const loadData = searchedMeal => {
    const searchWarning = document.getElementById("search-warning-h1");
    searchWarning.innerText = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error => {
            searchWarning.innerText = "No searched Result found!";
            const singleMealDiv = document.getElementById("single-meal-details-div");
            singleMealDiv.innerHTML ="";
        })
}


const displayMeals = meals => {
    const mealsDiv = document.getElementById("meals-div");
    mealsDiv.innerHTML = "";
    const searchInput = document.getElementById("search-input");
    searchInput.value = "";
    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];
        const mealDiv = document.createElement("div");
        mealDiv.className = "meal-div";
        mealDiv.onclick = event => {
        getSingleMealId(meal.idMeal);  
        }
        const mealInfo = `
            <img src = "${meal.strMealThumb}" class="rounded-top"/>
            <h6>${meal.strMeal}</h6>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.append(mealDiv);
        //console.log(meal);
    }
}



const getSingleMealId = mealId => {
    const fetchApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    loadData2(fetchApi);
}

const loadData2 =  fetchApi => {
    fetch(fetchApi)
        .then(res => res.json())
        .then(data => {
            displaySingleMealInfo(data.meals[0]);
        })
        .catch(error => {
            alert("hello");
            const searchWarning = document.getElementById("search-warning-h1");
            searchButton.innerText = "No searched Result found!";
        })

}

const displaySingleMealInfo = meal => {
    const singleMealInfo = meal;
    const singleMealDetailsDiv = document.getElementById("single-meal-details-div");
    const mealInfo = `
            <img src = "${singleMealInfo.strMealThumb}" class="rounded-top"/>
            <h3 class="p-4">${singleMealInfo.strMeal}</h3>
            <p>Ingredients</p>
        `
    singleMealDetailsDiv.innerHTML = mealInfo;
    const ingredients = getAllIngredients(singleMealInfo);
    console.log(ingredients);
    const ul = document.createElement("ul");
    ingredients.forEach(ingredient => {
        if(ingredient != "null null" && ingredient != "null " && ingredient != " null" && ingredient.length > 2){
            const li = document.createElement("li");
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${ingredient}`;
            ul.appendChild(li);
        }  
    });
    singleMealDetailsDiv.appendChild(ul);

}

const getAllIngredients = meal => {
    const ingredientList = [];
    ingredientList.push(meal.strMeasure1 + " " + meal.strIngredient1);
    ingredientList.push(meal.strMeasure2 + " " + meal.strIngredient2);
    ingredientList.push(meal.strMeasure3 + " " + meal.strIngredient3);
    ingredientList.push(meal.strMeasure4 + " " + meal.strIngredient4);
    ingredientList.push(meal.strMeasure5 + " " + meal.strIngredient5);
    ingredientList.push(meal.strMeasure6 + " " + meal.strIngredient6);
    ingredientList.push(meal.strMeasure7 + " " + meal.strIngredient7);
    ingredientList.push(meal.strMeasure8 + " " + meal.strIngredient8);
    ingredientList.push(meal.strMeasure9 + " " + meal.strIngredient9);
    ingredientList.push(meal.strMeasure10 + " " + meal.strIngredient10);
    ingredientList.push(meal.strMeasure11 + " " + meal.strIngredient11);
    ingredientList.push(meal.strMeasure12 + " " + meal.strIngredient12);
    ingredientList.push(meal.strMeasure13 + " " + meal.strIngredient13);
    ingredientList.push(meal.strMeasure14 + " " + meal.strIngredient14);
    ingredientList.push(meal.strMeasure15 + " " + meal.strIngredient15);
    ingredientList.push(meal.strMeasure16 + " " + meal.strIngredient16);
    ingredientList.push(meal.strMeasure17 + " " + meal.strIngredient17);
    ingredientList.push(meal.strMeasure18 + " " + meal.strIngredient18);
    ingredientList.push(meal.strMeasure19 + " " + meal.strIngredient19);
    ingredientList.push(meal.strMeasure20 + " " + meal.strIngredient20);
    return ingredientList;
}
