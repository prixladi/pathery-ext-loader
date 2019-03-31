// ==UserScript==
// @name         Pathery extension loader
// @namespace    https://github.com/prixladi
// @version      0.3
// @description  SHamyr pathery extension loader
// @author       SHamyr
// @match        https://www.pathery.com/*
// @grant        none
// ==/UserScript==


const loadExt = async () => {
    const librartyId = "patheryLibrary";

    localStorage.setItem("extEnabled", true);
    if(document.getElementById(librartyId))
        return;

    const response = await fetch('https://raw.githubusercontent.com/WuTheFWasThat/midnighttherapy/master/pathery-full.js');
    if(response.ok) {
        const child = document.createElement('script');
        child.id = librartyId
        child.text = await response.text();
        document.head.appendChild(child);
    }
    else {
        alert('Unable to load extension, more info in console.');
        console.log(response);
    }
    console.log("Pathery extension added");
};

const removeExt = async () => {
    localStorage.removeItem("extEnabled");
    window.location.reload();
    console.log("Pathery extension removed.");
};

if(localStorage.getItem("extEnabled")) {
    loadExt();
}

const loadButt = document.createElement('button');
loadButt.className = "nav"
loadButt.innerText = "Load";
loadButt.style.fontSize = "0.8em";
loadButt.style.width = "3.5em";
loadButt.style.height = "2em";
loadButt.style.color = 'white';
loadButt.style.background='#000000'
loadButt.addEventListener('click', () => loadExt(), false);
document.getElementById('topbarContent').appendChild(loadButt);

const removeButt = document.createElement('button');
removeButt.innerText = "Remove";
removeButt.style.fontSize = "0.8em";
removeButt.style.width = "4.5em";
removeButt.style.height = "2em";
removeButt.style.color = 'white';
removeButt.style.background='#000000'
removeButt.addEventListener('click', () => removeExt(), false);
document.getElementById('topbarContent').appendChild(removeButt);
