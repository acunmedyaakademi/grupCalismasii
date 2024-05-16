const recipesList = document.querySelector('.recipes-list');
const searchForm = document.querySelector('.search-form');
const BASE_URL = "https://dummyjson.com";

async function fetchDummyJson(endpoint){
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data;
}

async function listRecipes(){
    const tarifler = await fetchDummyJson("recipes");
    console.log(tarifler)
    for (const tarif of tarifler.recipes) {
        recipesList.innerHTML += 
        `
        <div class="recipe" data-recipeid=${tarif.id}>
            <a href="#" data-recipeid=${tarif.id}>
                <img class="recipe-img" src="${tarif.image}" alt="">
                <h3>${tarif.name}</h3>
            </a>
        </div>
        `;
    };
    const recipeCard = document.querySelectorAll('.recipe');
    
    for (const card of recipeCard) {
        card.addEventListener('click',openRecipe);
    }
}

async function openRecipe(e){
    e.preventDefault();
    let clickedRecipeId = e.target.closest('.recipe').dataset.recipeid;

    const tarif = await fetchDummyJson(`recipes/${clickedRecipeId}`);
    console.log(tarif);
    const recipeDialog = document.querySelector('.recipe-dialog');
    recipeDialog.innerHTML = 
    `
    <button class="close-dialog">X</button>
    <div class="recipe-container">
        <img class="recipe-img" src="${tarif.image}" alt="">
        <h3>${tarif.name}</h3>
        <h4 class="cooking-time"></h4>
        <h3>İçindekiler</h3>
        <ul class="icindekiler-listesi">

        </ul>
        <h3>Talimatlar</h3>
        <ol class="talimatlar-listesi">
        
        </ol>
    </div>
    `;

    const icindekilerListesi = document.querySelector('.icindekiler-listesi');
    for (const icindekiler of tarif.ingredients) {
        console.log(icindekiler);
        icindekilerListesi.innerHTML += 
        `
        <li>${icindekiler}</li>
        `
    }

    const talimatlarListesi = document.querySelector('.talimatlar-listesi');
    for (const talimatlar of tarif.instructions) {
        talimatlarListesi.innerHTML += 
        `
        <li>${talimatlar}</li>
        `
    }
    recipeDialog.showModal();

    const closeModalBtn = document.querySelector('.close-dialog');

    closeModalBtn.addEventListener('click',() => closeDialog(recipeDialog))
}

function closeDialog(recipeDialog){
    recipeDialog.close();
}

searchForm.addEventListener('submit',handleSearchForm);

async function handleSearchForm(e){
    e.preventDefault();
    const searchValue = searchForm["search"].value
    console.log(searchValue);
    const data = await fetchDummyJson(`recipes/search?q=${searchValue}`);
    return listSearchedRecipes(data);
}

async function listSearchedRecipes(data){
    recipesList.innerHTML = "";
    for (const recipe of data.recipes) {
        recipesList.innerHTML += 
        `
        <div class="recipe" data-recipeid=${recipe.id}>
            <a href="#" data-recipeid=${recipe.id}>
                <img class="recipe-img" src="${recipe.image}" alt="">
                <h3>${recipe.name}</h3>
            </a>
        </div>
        `
    }

    const recipeCard = document.querySelectorAll('.recipe');
    
    for (const card of recipeCard) {
        card.addEventListener('click',openRecipe);
    }
    
}

listRecipes();

