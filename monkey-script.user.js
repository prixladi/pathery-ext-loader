// ==UserScript==
// @name         Pathery extension loader
// @namespace    https://github.com/prixladi
// @version      0.5
// @description  SHamyr pathery extension loader
// @author       SHamyr
// @match        https://www.pathery.com/*
// @grant        none
// ==/UserScript==

const libraryId = "patheryLibraryId";

const butt = document.createElement('a');
butt.href='#';
butt.className = "nav";

const loadExt = async () => {
    localStorage.setItem("extEnabled", true);

    const response = await fetch('https://raw.githubusercontent.com/WuTheFWasThat/midnighttherapy/master/pathery-full.js');
    if(!response.ok) {
        alert('Unable to load extension, more info in console.');
        console.log(response);
        return;
    }

    const child = document.createElement('script');
    child.id = libraryId
    child.text = await response.text();
    document.head.appendChild(child);
    console.log("Pathery extension added");
};

const removeExt = (lib) => {
    if(lib){
        lib.parentNode.removeChild(lib);
    }

    localStorage.removeItem("extEnabled");
    window.location.reload();
    console.log("Pathery extension removed.");
};

butt.addEventListener('click', async () => {
    const lib = document.getElementById(libraryId);
    lib ? removeExt(lib): loadExt(lib);
    butt.innerText = !lib ? "Remove extension" : "Add extension";
}, false);

document.getElementById('topbarContent').appendChild(butt);

if(localStorage.getItem("extEnabled")) {
    if(document.getElementById(libraryId)){
        loadExt();
    }

    butt.innerText = "Remove extension";
}
else {
    butt.innerText = "Add extension";
}
