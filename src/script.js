var paginationConfig = {
    next: null,
    prev: null,
    actual: null
}

var urlCharacters = ""

function getParameterByName(name,url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName('search',window.location.href) == null) {
    APIAllCharacter()
}else{
    APIFindCharacter(getParameterByName('search',window.location.href))
}

if (getParameterByName('page',window.location.href) == null){
    urlCharacters = "https://rickandmortyapi.com/api/character"
}else{
    urlCharacters = "https://rickandmortyapi.com/api/character/?" + "page=" + getParameterByName('page',window.location.href)
}

function pagination(next,prev,pages){
    paginationConfig.next = parseInt(getParameterByName('page',next))
    paginationConfig.prev = parseInt(getParameterByName('page',prev))
    paginationConfig.actual = parseInt(getParameterByName('page',window.location.href))
    if (prev == null){
        return `
            <li class="page-item disabled">
            <a class="page-link" href="" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item active">
                <a class="page-link" href="">1</a>
            </li>
            <li class="page-item" aria-current="page">
                <a class="page-link" href="/?page=${paginationConfig.next}">${paginationConfig.next}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="/?page=${paginationConfig.next + 1}">${paginationConfig.next + 1}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="/?page=${paginationConfig.next}">Next</a>
            </li>
        `
    } else if (pages == parseInt(getParameterByName('page',window.location.href))){
        return `
            <li class="page-item">
            <a class="page-link" href="/?page=${paginationConfig.prev}" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="/?page=${paginationConfig.actual - 2}">${paginationConfig.actual - 2}</a>
            </li>
            <li class="page-item" aria-current="page">
                <a class="page-link" href="/?page=${paginationConfig.actual - 1}">${paginationConfig.actual - 1}</a>
            </li>
            <li class="page-item active">
                <a class="page-link" href="/?page=${paginationConfig.actual}">${paginationConfig.actual}</a>
            </li>
            <li class="page-item disabled">
                <a class="page-link" href="">Next</a>
            </li>
        `
    }else {
        return `
            <li class="page-item">
            <a class="page-link" href="/?page=${paginationConfig.prev}" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="/?page=${paginationConfig.actual - 1}">${paginationConfig.actual - 1}</a>
            </li>
            <li class="page-item active" aria-current="page">
                <a class="page-link" href="/?page=${paginationConfig.actual}">${paginationConfig.actual}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="/?page=${paginationConfig.actual + 1}">${paginationConfig.actual + 1}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="/?page=${paginationConfig.next}">Next</a>
            </li>
        `
    }
}

function textReduction(text){
    if (text.length > 15){
        return (text.substring(0, 15) + "...")
    }else {
        return text
    }
}

function search(){
    window.open(`/?search=${document.getElementById("searchInput").value}`, "_self")
}

function APIAllCharacter(){
    urlCharacters = "https://rickandmortyapi.com/api/character"
    fetch(urlCharacters, {method: "GET"})
        .then(response =>response.json())
        .then(response => {
            $("#pagination").html(pagination(response.info.next,response.info.prev,response.info.pages))
            for (let i = 0; i < response.results.length; i++){
                $("#card-container").append(`
                <div class="col-md-4 col-lg-3">
                    <div class="card card-character">
                        <div class="card-back-effect"></div>
                        <div class="card-body">
                            <img src= "${response.results[i].image}" class="card-img-top" style="margin-top: 10px;">
                            <h5 class="card-title title-card-character">${textReduction(response.results[i].name)}</h5>
                            <div class="info-card-character" style="display:flex;flex-direction: column;">
                                <span><img src="../assets/img/icon-gender.png">${response.results[i].gender}</span>
                                <span><img src="../assets/img/icon-address.png">${textReduction(response.results[i].location.name)}</span>
                                <span><img src="../assets/img/icon-heart-beat.png">${response.results[i].status}</span>
                                <span><img src="../assets/img/icon-human.png">${response.results[i].species}</span>
                            </div>
                            <div class="card" style="border: none;border-radius: .50rem;">
                                <button style="background-color: #0D7B32;outline: none;border: none;" type="button" class="btn btn-primary" id="btnmore" onclick="more('+ index +')">View more</button>
                            </div>
                        </div>
                    </div>
                </div>

                `)
            }
        })
}

function APIFindCharacter(name){
    urlCharacters = `https://rickandmortyapi.com/api/character/?name=${name}`
    fetch(urlCharacters, {method: "GET"})
        .then(response =>response.json())
        .then(response => {
            $("#pagination").html("")
            for (let i = 0; i < response.results.length; i++){
                $("#card-container").append(`
                <div class="col-md-4 col-lg-3">
                    <div class="card card-character">
                        <div class="card-back-effect"></div>
                        <div class="card-body">
                            <img src= "${response.results[i].image}" class="card-img-top" style="margin-top: 10px;">
                            <h5 class="card-title title-card-character">${textReduction(response.results[i].name)}</h5>
                            <div class="info-card-character" style="display:flex;flex-direction: column;">
                                <span><img src="../assets/img/icon-gender.png">${response.results[i].gender}</span>
                                <span><img src="../assets/img/icon-address.png">${textReduction(response.results[i].location.name)}</span>
                                <span><img src="../assets/img/icon-heart-beat.png">${response.results[i].status}</span>
                                <span><img src="../assets/img/icon-human.png">${response.results[i].species}</span>
                            </div>
                            <div class="card" style="border: none;border-radius: .50rem;">
                                <button style="background-color: #0D7B32;outline: none;border: none;" type="button" class="btn btn-primary" id="btnmore" onclick="more('+ index +')">View more</button>
                            </div>
                        </div>
                    </div>
                </div>

                `)}
        })
}

function APIResidents(residentsList,id){
    for (let x = 0; x < residentsList.length; x++){
        fetch(residentsList[x], {method: "GET"})
            .then(response =>response.json())
            .then(response =>{
                $(`#location${id}`).append(`<img style="border-radius: 100%;margin: 5px;border: 2px solid #0D7B32;" width="50px" src="${response.image}">`)
            })
    }
}

function APIAllLocations(){
    var actualID = null
    urlCharacters = "https://rickandmortyapi.com/api/location"
    fetch(urlCharacters, {method: "GET"})
        .then(response =>response.json())
        .then(response => {
            for (let i = 0; i < response.results.length; i++){
                actualID = response.results[i].id
                $("#card-location-container").append(`
                <div class="card card-character" style="width: 80vw;">
                    <h5 class="card-header title-card-character">${response.results[i].name}</h5>
                    <div class="card-body">
                    <h5 class="card-title">${response.results[i].type} - ${response.results[i].dimension}</h5>
                    <div id="location${actualID}" style="display: flex;flex-wrap: wrap;">
                    </div>
                    </div>
                </div>
                `)
                APIResidents(response.results[i].residents, actualID)
            }
        })
}

APIAllLocations()