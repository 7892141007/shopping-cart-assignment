window.addEventListener("DOMContentLoaded", displayCategories);



async function getCategories() {
    return fetch('http://localhost:4000/categories').then((response)=> {
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Resource not found !");
        }
    });
}

async function displayCategories() {
    let categories = await getCategories();
    for (const category of categories) {
        createCategories(category)
    }
}

function createCategories(category){
    let categorySec = document.createElement('div');
    categorySec.setAttribute('class', 'category-section');

    let imageSec = document.createElement('div');
    imageSec.setAttribute('class', 'image-section');

    let imageEl = document.createElement('img');
    imageEl.setAttribute('src', category.imageUrl);
    imageEl.setAttribute('alt', category.name);

    imageSec.append(imageEl);

    let categoryDescriptionSec = document.createElement('div');
    categoryDescriptionSec.setAttribute('class', 'category-description-section');

    let categoryHeading = document.createElement('h2');
    categoryHeading.innerHTML = category.name;

    let categoryDesc = document.createElement('p');
    categoryDesc.setAttribute('class', 'category-desc');
    categoryDesc.innerHTML = category.description;

    let categoryButton = document.createElement('button');
    categoryButton.setAttribute('class', 'category-button-key');
    categoryButton.innerText = `Explore ${category.key}`;
    categoryButton.setAttribute('onclick', '(handleCategory())');

    categoryDescriptionSec.append(categoryHeading);
    categoryDescriptionSec.append(categoryDesc);
    categoryDescriptionSec.append(categoryButton);

    categorySec.appendChild(imageSec);
    categorySec.appendChild(categoryDescriptionSec);

    document.querySelector('#main-section').appendChild(categorySec);
}

function handleCategory() {
    window.location.href = '/products';
}



