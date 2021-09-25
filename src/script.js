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

if (getParameterByName('page',window.location.href) == null){
    urlCharacters = "https://rickandmortyapi.com/api/character"
}else{
    urlCharacters = "https://rickandmortyapi.com/api/character/?" + "page=" + getParameterByName('page',window.location.href)
}

function pagination(next,prev,pages){
    paginationConfig.next = parseInt(getParameterByName('page',next))
    paginationConfig.prev = parseInt(getParameterByName('page',prev))
    paginationConfig.actual = parseInt(getParameterByName('page',window.location.href))
    console.log(parseInt(getParameterByName('page',window.location.href)))
    console.log(next)
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

fetch(urlCharacters, {method: "GET"})
    .then(response =>response.json())
    .then(response => {
        $("#pagination").html(pagination(response.info.next,response.info.prev,response.info.pages))
        for (let i = 0; i < response.results.length; i++){
            $("#card-container").append(`
                <div id="${response.results[i].id}" class="card cardR col-12 col-sm-4 col-lg-2" style="width: 18rem;">
                    <img src= "${response.results[i].image}" class="card-img-top" alt="..." style="margin-top: 10px;">
                    <div class="card-body">
                        <h5 class="card-title title-card-character">${response.results[i].name}</h5>
                        <div style="display:flex;flex-direction: column;">
                            <span><img src="../assets/img/icon-gender.png">${response.results[i].gender}</span>
                            <span><img src="../assets/img/icon-address.png">${response.results[i].location.name}</span>
                            <span><img src="../assets/img/icon-heart-beat.png">${response.results[i].status}</span>
                            <span><img src="../assets/img/icon-human.png">${response.results[i].species}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <button type="button" class="btn btn-primary" id="btnmore" onclick="more('+ index +')">View more</button>
                    </div>
                </div>

            `)
        }
    })