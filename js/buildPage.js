var buttonNext, buttonBack;
var idCount = 0;

function AddRows(id_1, id_2, countRes, countPage, currentPage, imgArr, priceArr, titleArr, summaryArr, keywordsArr, property_typeArr, bathroom_numberArr, bedroom_numberArr, datasource_nameArr, latitudeArr, longitudeArr){
    var page = document.getElementById(id_2);
    if(countPage == undefined){
        page.innerHTML = 'Error';
    }
    else{
        page.innerHTML = currentPage + " from " + countPage;
    }
    var resBody = document.getElementById(id_1);
    var container = document.createElement('div');
    container.id = "container";
    for(var i=0; i<countRes; i++, idCount++){
        var row = document.createElement('div');
        var resSearch = document.createElement('div');
        var ref = document.createElement('a');
        var listingList = document.createElement('div');
        var picture = document.createElement('div');
        var price = document.createElement('span');
        var title = document.createElement('span');
        var like = document.createElement('div');
        var summary = document.createElement('span');
        var keywords = document.createElement('span');
        var property_type = document.createElement('span');
        var bathroom_number = document.createElement('span');
        var bedroom_number = document.createElement('span');

        row.className = "rows";
        resSearch.className = "content";
        listingList.className = "listing-list";
        picture.className = "picture";
        price.className = "price";
        title.className = "title";
        like.className = "like";
        summary.className = "summary";
        keywords.className = "keywords";
        property_type.className = "property_type";
        bathroom_number.className = "bathroom_number";
        bedroom_number.className = "bedroom_number";
        picture.className = "picture";

        imgArr[i] = "url(" + imgArr[i] + ")";
        picture.style.background = imgArr[i];
        price.innerHTML = priceArr[i];      
        title.innerHTML = titleArr[i];
        summary.innerHTML = summaryArr[i];
        keywords.innerHTML = keywordsArr[i];
        property_type.innerHTML = property_typeArr[i];
        if(bathroom_numberArr[i] == ""){bathroom_number.innerHTML = "bathrooms: no inf.";}
        else if (bathroom_numberArr[i] != ""){bathroom_number.innerHTML = "bathrooms: " + bathroom_numberArr[i];}
        if(bedroom_numberArr[i] == ""){bedroom_number.innerHTML = "bedrooms: no inf.";}
        else if(bedroom_numberArr[i] != ""){bedroom_number.innerHTML = "bedrooms: " + bedroom_numberArr[i];}

        like.id = "like" + idCount;
        row.id = "row" + idCount;
        picture.id = "pic" + idCount;

        listingList.appendChild(picture);
        listingList.appendChild(price);
        listingList.appendChild(title);
        listingList.appendChild(property_type);
        listingList.appendChild(bathroom_number);
        listingList.appendChild(bedroom_number);
        listingList.appendChild(summary);
        listingList.appendChild(keywords);
        ref.appendChild(listingList);
        ref.appendChild(like);
        resSearch.appendChild(ref);
        row.appendChild(resSearch);
        container.appendChild(row);
        resBody.appendChild(container);
        addToFavourite(idCount, row, container, buttonBack, buttonNext, page, countPage, currentPage, like, property_typeArr[i], latitudeArr[i], longitudeArr[i], titleArr[i], imgArr[i], datasource_nameArr[i], priceArr[i], bedroom_numberArr[i], bathroom_numberArr[i]);
        ShowMap('pic', imgArr[i], datasource_nameArr[i], priceArr[i], bedroom_numberArr[i], bathroom_numberArr[i], idCount, property_typeArr[i], latitudeArr[i], longitudeArr[i], titleArr[i]);
    }
}

function DelNode(countRes){
    var container = document.getElementById('container');   
    var resBody = document.getElementById('result');     
    resBody.removeChild(container);
    return countRes=0;
}

function GoToPage(currentPage, countPage){
    buttonNext = document.getElementById('pull-right');
    buttonBack = document.getElementById('pull-left');
    if(currentPage == 1){buttonBack.disabled=true;}
    else{buttonBack.disabled=false;}
    if(currentPage >= countPage){buttonNext.disabled=true;}
    else if(countPage == 0 || countPage == null){buttonNext.disabled=true;}
    else{
        buttonNext.disabled=false;
        buttonBack.style.visibility = 'visible';
        buttonNext.style.visibility = 'visible';
    }
}

function ShowMap(id, imgArr, datasource_nameArr, priceArr, bedroom_numberArr, bathroom_numberArr, idCount, property_typeArr, latitudeArr, longitudeArr, titleArr){
    var body = document.getElementById('body');
    document.getElementById(id + idCount).onclick = function(){
        var shadowWindow = document.createElement('div');
        var modalWindow = document.createElement('div');
        var close = document.createElement('div');
        var border = document.createElement('div');
        var picture = document.createElement('div');
        var datasource_name = document.createElement('span');
        var price = document.createElement('span');
        var bedroom_number = document.createElement('span');
        var bathroom_number = document.createElement('span');
        var property_type = document.createElement('span');
        var googleMap = document.createElement('div');

        close.id = 'close' + idCount;

        shadowWindow.className = 'shadowWindow';
        modalWindow.className = 'modalWindow';
        border.className = 'border';
        close.className = 'close';
        picture.className = 'pictureModal';
        datasource_name.className = "nameModal";
        price.className = "infModal";
        bedroom_number.className = 'infModal';
        bathroom_number.className = 'infModal';
        property_type.className = 'infModal';
        googleMap.className = 'gMap';

        picture.style.background = imgArr;
        datasource_name.innerHTML = datasource_nameArr;
        price.innerHTML = "Price: " + priceArr;
        if(bathroom_numberArr == ""){bathroom_number.innerHTML = "Bathrooms: no inf.";}
        else if (bathroom_numberArr != ""){bathroom_number.innerHTML = "Bathrooms: " + bathroom_numberArr;}
        if(bedroom_numberArr == ""){bedroom_number.innerHTML = "Bedrooms: no inf.";}
        else if(bedroom_numberArr != ""){bedroom_number.innerHTML = "Bedrooms: " + bedroom_numberArr;}
        property_type.innerHTML = "Property type: " + property_typeArr;
        var temp = latitudeArr.toString().indexOf('.');
        if (temp != '-1') {
            temp = latitudeArr.toString().split('.');
            latitudeArr = temp[0] + ','  +temp[1];
        }
        var temp2 = latitudeArr.toString().indexOf('.');
        if (temp2 != '-1') {
            temp2 = longitudeArr.toString().split('.');
            longitudeArr= temp2[0] + ',' + temp2[1];
        }
        var myLatLng = {lat: parseFloat(latitudeArr), lng: parseFloat(longitudeArr)};        
        var map = new google.maps.Map(googleMap, {
            center: myLatLng,     
            zoom: 10
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: titleArr
        });        
       
        border.appendChild(close);
        modalWindow.appendChild(border);
        modalWindow.appendChild(picture);
        modalWindow.appendChild(datasource_name);
        modalWindow.appendChild(price);
        modalWindow.appendChild(property_type);
        modalWindow.appendChild(bedroom_number);
        modalWindow.appendChild(bathroom_number);
        modalWindow.appendChild(googleMap);
        shadowWindow.appendChild(modalWindow);
        body.appendChild(shadowWindow);
        CloseMap(idCount, shadowWindow, body);
    }
}

function CloseMap(idCount, shadowWindow, body){
    document.getElementById('close' + idCount).onclick = function(){
        body.removeChild(shadowWindow);
    }
}