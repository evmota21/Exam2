const API_TOKEN = "1";
let errorHandling = document.querySelector( '.errorHandling' );

function getMeals(mealQuery){
    let url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealQuery}`;

    let settings = {
        method : 'GET'
    }

    let results = document.querySelector( '.js-search-results' );

    fetch( url, settings )
        .then( response => {
            if ( response.ok ){
                return response.json();
            }
        })
        .then( responseJSON => {

            results.innerHTML = "";
            errorHandling.innerHTML = "";
            console.log(responseJSON);
            results.innerHTML = `<div> Meal id: ${responseJSON.meals[0].idMeal}, Meal Area : ${responseJSON.meals[0].strArea}, instructions : ${responseJSON.meals[0].strInstructions} </div> <img href="${responseJSON.meals[0].strMealThumb}"/>`;
        })
        .catch( err => {
            errorHandling.innerHTML = "Meal not found";
        })
}


function watchMealForm(){
    let getMealForm = document.querySelector( '.js-search-form' );
    getMealForm.addEventListener( 'submit' , (event) => {
        event.preventDefault();
        let mealQuery = document.getElementById( 'query' ).value;

        getMeals(mealQuery);
    })
}

function init(){
    watchMealForm();
}

init();