const libraryId = "patheryLibraryId";

const butt = document.createElement('a');
butt.href='#';
butt.className = "nav";

const updateExtension = async () => {
    const lib = document.getElementById(libraryId) != null;
    lib ? removeExt(): loadExt();
    butt.innerText = !lib ? "Remove extension" : "Add extension";
};


const loadExt = async () => {
    localStorage.setItem("extEnabled", true);
    if(document.getElementById(libraryId)){
        return;
    }

    const response = await fetch('https://raw.githubusercontent.com/WuTheFWasThat/midnighttherapy/master/pathery-full.js');
    if(response.ok) {
        const child = document.createElement('script');
        child.id = libraryId
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

butt.innerText = document.getElementById(libraryId) ? "Remove extension" : "Add extension";
butt.addEventListener('click', updateExtension, false);
document.getElementById('topbarContent').appendChild(butt);
