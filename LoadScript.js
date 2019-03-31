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

const loadButt = document.createElement('a');
loadButt.className = "nav"
loadButt.innerText = "Load";
loadButt.addEventListener('click', loadExt, false);
document.getElementById('topbarContent').appendChild(loadButt);

const removeButt = document.createElement('a');
removeButt.className = "nav"
removeButt.innerText = "Remove";
removeButt.addEventListener('click', removeExt, false);
document.getElementById('topbarContent').appendChild(removeButt);
