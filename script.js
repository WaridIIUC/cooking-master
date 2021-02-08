const searchButton = document.getElementById("search-button");              //get search button
searchButton.addEventListener("click", function () {
    const searchedMeal = document.getElementById("search-input").value;     //get searched meal
    loadAllSearchedMealData(searchedMeal);                                  //pass searched meal for fetched data
})

const loadAllSearchedMealData = searchedMeal => {
    if(searchedMeal != ""){
        clearSearchedElement();                                                 //call this function for clear previous search
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)   //fetch all searched meal data
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);                                       //call this function to display searched meals data by passing data
        })
        .catch(error => {                                                   //catch for if there has no searched result
            displayWarning("No searched Result found!");                    //give a warning message by passing message to display warning function
        })
    }
    else{
        displayWarning("Please write your food on Search");
    }
}

const displayMeals = meals => {                                             //function for display all searched meal info
    const mealsDiv = document.getElementById("all-searched-meals-display-div"); //get parent div where other child append
    hideElement("all-searched-meals-display-div");                       //hide previous all searched meal.  
    hideElement("single-meal-details-div");                         //hide previous single meal info.
    meals.forEach(meal => {                                         //loop start to add each div & elements
        const mealDiv = document.createElement("div");              //child div for meal
        mealDiv.className = "meal-div";
        mealDiv.onclick = event => {                                //add onclick event each meal div by idMeal
            getSingleMealId(meal.idMeal);                           //call this function to display single meal info & pass idMeal
        }
        const mealInfo = `
            <img src = "${meal.strMealThumb}" class="rounded-top"/>
            <h6>${meal.strMeal}</h6>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.append(mealDiv);                   
    });
}

const getSingleMealId = mealId => {                                     
    const fetchApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    loadSingleMealData(fetchApi);                                       //call function for load single meal info
}

const loadSingleMealData =  fetchApi => {
    fetch(fetchApi)
        .then(res => res.json())
        .then(data => {
            displaySingleMealInfo(data.meals[0]);                   //pass meals[0] to display single meal info
        })
}

const displaySingleMealInfo = meal => {
    const singleMealInfo = meal;
    const singleMealDetailsDiv = document.getElementById("single-meal-details-div");     //get parent div
    const mealInfo = `
            <img src = "${singleMealInfo.strMealThumb}" class="rounded-top"/>
            <h3 class="p-4">${singleMealInfo.strMeal}</h3>
            <p>Ingredients</p>
        `
    singleMealDetailsDiv.innerHTML = mealInfo;
    const ingredients = getAllIngredients(singleMealInfo);          //get all ingredients & measures in an array
    const ul = document.createElement("ul");                        
    ingredients.forEach(ingredient => {
                                                //check if any ingredients is empty or null
        if(ingredient != "null null" && ingredient != "null " && ingredient != " null" && ingredient.length > 2){
            const li = document.createElement("li");
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${ingredient}`;
            ul.appendChild(li);
        }  
    });
    singleMealDetailsDiv.appendChild(ul);
}

const getAllIngredients = meal => {             //this function used for make all ingredients & measures of specific meal 
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

const displayWarning = warningMessage => {
    const searchWarning = document.getElementById("search-warning-h1");     //get warning h1 
    searchWarning.innerText = warningMessage;
    hideElement("all-searched-meals-display-div");                       //hide previous all searched meal.  
    hideElement("single-meal-details-div");                                 //hide previous single meal info.
}

const hideElement = elementId => {          //call this function to hide specific element by pass it's id 
    const element = document.getElementById(elementId);
    element.innerHTML ="";
}

const clearSearchedElement = () => {
    const searchWarning = document.getElementById("search-warning-h1");     //get search warning h1 for show warning if no search found
    searchWarning.innerText = "";                                        //erase previous warning 
    const searchInput = document.getElementById("search-input");            //search input box
    searchInput.value = "";                                                 //clear previous searched meal
}