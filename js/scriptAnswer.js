var searchParams={
    city,
    country,
    price_high,
    price_low,
    bedroom_number_min,
    bedroom_number_max,
    bathroom_number_min,
    bathroom_number_max,
    room_number_min,
    room_number_max,
    property_type
};

var countRes, countPage, currentPage = 1;
var imgArr = new Array();
var priceArr = new Array();
var titleArr = new Array();
var summaryArr = new Array();
var keywordsArr = new Array();
var property_typeArr = new Array();
var bathroom_numberArr = new Array();
var bedroom_numberArr = new Array();
var datasource_nameArr = new Array();
var latitudeArr = new Array();
var longitudeArr = new Array();

document.getElementById('searchButton').onclick = function(){
    if(countRes > 0){
        DelNode(countRes);
    }
    currentPage = 1;
    StartSearch('search-form', currentPage);
}

document.getElementById('pull-right').onclick = function(){
    DelNode(countRes);
    currentPage = currentPage + 1;
    StartSearch('search-form', currentPage);
}

document.getElementById('pull-left').onclick = function(){
    DelNode(countRes);
    currentPage = currentPage - 1;
    StartSearch('search-form', currentPage);
}

function StartSearch(id, currentPage) {
    document.getElementById('preloader').style.visibility = 'visible';
    document.getElementById('preloader_preload').style.visibility = 'visible';
    loadSearchParams();
    var requestUrl = "https://api.nestoria." + searchParams.country + "/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=" + currentPage + "&place_name=" + searchParams.city;
    if(searchParams.price_high != ""){requestUrl = requestUrl + "&price_max=" + searchParams.price_high;}
    if(searchParams.price_low != ""){requestUrl = requestUrl + "&price_min=" + searchParams.price_low;}
    if(searchParams.bedroom_number_min != ""){requestUrl = requestUrl + "&bedroom_min=" + searchParams.bedroom_number_min;}
    if(searchParams.bedroom_number_max != ""){requestUrl = requestUrl + "&bedroom_max=" + searchParams.bedroom_number_max;}
    if(searchParams.room_number_min != ""){requestUrl = requestUrl + "&room_min=" + searchParams.room_number_min;}
    if(searchParams.room_number_max != ""){requestUrl = requestUrl + "&room_max=" + searchParams.room_number_max;}
    if(searchParams.bathroom_number_min != ""){requestUrl = requestUrl + "&bathroom_min=" + searchParams.bathroom_number_min;}
    if(searchParams.bathroom_number_max != ""){requestUrl = requestUrl + "&bathroom_min=" + searchParams.bathroom_number_max;}
    if(searchParams.property_type != "all"){requestUrl = requestUrl + "&property_type=" + searchParams.property_type;}
    console.log(requestUrl);
    scriptRequest(requestUrl, LoadContent, fail);
}

function loadSearchParams(){
    searchParams.country = document.getElementById('country').value;
    searchParams.city = document.getElementById('city').value;
    searchParams.price_high = document.getElementById('price_high').value;
    searchParams.price_low = document.getElementById('price_low').value;
    searchParams.bedroom_number_min = document.getElementById('bedroom_number_min').value;
    searchParams.bedroom_number_max = document.getElementById('bedroom_number_max').value;
    searchParams.room_number_min = document.getElementById('room_number_min').value;
    searchParams.room_number_max = document.getElementById('room_number_max').value;
    searchParams.bathroom_number_min = document.getElementById('bathroom_number_min').value;
    searchParams.bathroom_number_max = document.getElementById('bathroom_number_max').value;
    searchParams.property_type = document.getElementById('property_type').value;
}

function LoadContent(data) {
    try{
        countRes = data.response.listings.length;
        countPage = data.response.total_pages;
        currentPage = data.response.page;
        for(var i=0; i < countRes; i++){
            imgArr[i] = data.response.listings[i].img_url;
            priceArr[i] = data.response.listings[i].price_formatted;
            titleArr[i] = data.response.listings[i].title;
            summaryArr[i] = data.response.listings[i].summary;
            keywordsArr[i] = data.response.listings[i].keywords;
            property_typeArr[i] = data.response.listings[i].property_type;
            bathroom_numberArr[i] = data.response.listings[i].bathroom_number;
            bedroom_numberArr[i] = data.response.listings[i].bedroom_number;
            datasource_nameArr[i] = data.response.listings[i].datasource_name;
            latitudeArr[i] = data.response.listings[i].latitude;
            longitudeArr[i] = data.response.listings[i].longitude;
        }
    } catch(Exception){}
    document.getElementById("preloader").style.visibility = 'hidden';
    document.getElementById("preloader_preload").style.visibility = 'hidden';
    GoToPage(currentPage, countPage);
    //imgAddres = data.response.listings[0].img_url;
    //alert(data.response.listings.length);
    //alert("Принят запрос от " + data.request.location + "\n" + addres);
    AddRows('result', 'page', countRes, countPage, currentPage, imgArr, priceArr, titleArr, summaryArr, keywordsArr, property_typeArr, bathroom_numberArr, bedroom_numberArr, datasource_nameArr, latitudeArr, longitudeArr);
    //alert("Принят запрос от " + data.response.listings[0].listing_type);
    hideButtons();
}

function fail(url) {
    alert('Ошибка при запросе ' + url);
    document.getElementById("preloader").style.visibility = 'hidden';
    document.getElementById("preloader_preload").style.visibility = 'hidden';
}