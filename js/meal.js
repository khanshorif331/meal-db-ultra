const searchFood = ()=>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    
    // clear data
    searchField.value=''

    // error handling with if else
    if(searchText == ''){
        alert('Plz enter someting to search')
    }
    else{

         // load data
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
    `
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data.meals))
    }
}


const displaySearchResult = meals => {
    console.log(meals);
    if(meals == null){
        alert('Food not available.Plzz enter something else')
    }
    else{
        const searchResult = document.getElementById('search-result')
        // searchResult.innerHTML = ''
        searchResult.textContent = ''
        if(meals.length == 0){
        console.log(meals.length);
        const div = document.createElement('div')
        div.innerHTML = `
        <p>Plz search something else</p>
        `
        searchResult.appendChild(div)
        }
        else{
            meals.forEach(meal =>{
            // console.log(meal);
            const div=document.createElement('div')
            div.classList.add('col')
            div.innerHTML =`
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                </div>
              </div>
            `
            searchResult.appendChild(div)
        })
    }
    }    
}


const loadMealDetail = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=> displayMealDetail(data.meals[0]))
}


const displayMealDetail = meal=>{
    console.log(meal);
    const mealDetails = document.getElementById('meal-details')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML =  `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `
    mealDetails.appendChild(div)
}