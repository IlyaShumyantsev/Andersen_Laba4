var favouriteCount = 0;
var resBodyCopy = document.getElementById('result');
var containerCopy = document.createElement('div');
var favourite = document.getElementById('favourite');

function addToFavourite(idCount, row, container, buttonBack, buttonNext, page, countPage, currentPage, like, property_typeArr, latitudeArr, longitudeArr, titleArr, imgArr, datasource_nameArr, priceArr, bedroom_numberArr, bathroom_numberArr){
     document.getElementById('like' + idCount).onclick = function(){
         like.className = 'delete';
         like.id = 'copyLike' + idCount;
         document.getElementById('pic' + idCount).id = 'copyPic' + idCount;
         var copyNode = row.cloneNode(true)
         BuildFavouriteList(copyNode);
         like.className = 'like';
         like.id = 'like' + idCount;
         document.getElementById('copyPic' + idCount).id = 'pic' + idCount;
         like.style.backgroundImage = 'url(img/like-touch.png)';
         like.style.pointerEvents = 'none';
         hideContainer(container, buttonBack, buttonNext, page, countPage, currentPage, property_typeArr, latitudeArr, longitudeArr, titleArr, imgArr, datasource_nameArr, priceArr, bedroom_numberArr, bathroom_numberArr, idCount);
         favouriteCount = favouriteCount + 1;
         favourite.innerHTML = "Favourite: " + favouriteCount;
         DeleteFavourite(containerCopy, idCount, copyNode);
    }
    hideContainer(container, buttonBack, buttonNext, page, countPage, currentPage);
};

function DeleteFavourite(containerCopy, idCount, copyNode){
    document.getElementById('like' + idCount).style.pointerEvents = "auto";
    document.getElementById('like' + idCount).style.pointerEvents = 'none';
    document.getElementById('copyLike' + idCount).onclick = function(){
        containerCopy.removeChild(copyNode);
        favouriteCount = favouriteCount - 1;
        favourite.innerHTML = "Favourite: " + favouriteCount;
        document.getElementById('like' + idCount).removeAttribute('style');
        document.getElementById('like' + idCount).className = 'like';
    }    
}

function BuildFavouriteList(copyNode){
    containerCopy.id = "containerCopy";
    containerCopy.style.display = 'none';
    containerCopy.appendChild(copyNode);
    resBodyCopy.appendChild(containerCopy);
}

function hideButtons(){
    buttonBack.style.display = 'block';
    buttonNext.style.display = 'block';
    containerCopy.style.display = 'none';
    container.style.display = 'block';
}

function hideContainer(container, buttonBack, buttonNext, page, countPage, currentPage, property_typeArr, latitudeArr, longitudeArr, titleArr, imgArr, datasource_nameArr, priceArr, bedroom_numberArr, bathroom_numberArr, idCount){
    document.getElementById('favourite').onclick = function(){
        container.style.display = 'none';
        buttonBack.style.display = 'none';
        buttonNext.style.display = 'none';
        page.innerHTML = "Favourite";
        containerCopy.style.display = 'block';
    }
    document.getElementById('main').onclick = function(){
        containerCopy.style.display = 'none';
        container.style.display = 'block';
        buttonBack.style.display = 'block';
        buttonNext.style.display = 'block';
        page.innerHTML = currentPage + " from " + countPage;
    }
    try{
        ShowMap('copyPic', imgArr, datasource_nameArr, priceArr, bedroom_numberArr, bathroom_numberArr, idCount, property_typeArr, latitudeArr, longitudeArr, titleArr);
    } catch(Exception){}
}