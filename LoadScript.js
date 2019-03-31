const libraryId = "patheryLibraryId";

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
    const center = () => {
        const center = document.getElementsByClassName("wrapper pathery-assist-wrapper");

        if(center && center[0]){
            center[0].className = "wrapper";
        }
    }

    const repairTopBar = () => {
        const topbar = document.getElementById('topbarContent');
        const children = topbar.childNodes;
        let newNodes = [];
        children.forEach(x => newNodes.push(x.cloneNode(true)));

        while (topbar.hasChildNodes()) {
            topbar.removeChild(topbar.lastChild);
        }

        newNodes = newNodes.filter(x => !/.*(beta|ugli|blue|#).*/.test(x.href));

        const chat = document.createElement('a');
        chat.href='chat';
        chat.className = "nav";
        chat.innerText = "Chat";

        newNodes.forEach(x => {
            if(x.text == "Pathery home") {
                x.text = "Home";
            }

            topbar.appendChild(x)
        });

        topbar.insertBefore(chat, topbar.children[3]);
        topbar.appendChild(createExt());
    }

    const removeLeftBar = () => {
        const leftBar = document.getElementById("mt_left_bar");
        if(leftBar){
            leftBar.parentNode.removeChild(leftBar);
        }
    }

    removeLeftBar();
    center();
    repairTopBar();

    if(lib){
        lib.parentNode.removeChild(lib);
    }
    localStorage.removeItem("extEnabled");

    console.log("Pathery extension removed.");
};

const createExt = () => {
    const ext = document.createElement('a');
    ext.href='#';
    ext.className = "nav";

    ext.addEventListener('click', async () => {
        const lib = document.getElementById(libraryId);
        lib ? removeExt(lib): await loadExt();
        ext.innerText = !lib ? "Remove extension" : "Add extension";
    }, false);

    ext.innerText = "Add extension";
    return ext;
}

const ext = createExt();
document.getElementById('topbarContent').appendChild(ext);

if(localStorage.getItem("extEnabled")) {
    if(!document.getElementById(libraryId)){
        loadExt();
    }

    ext.innerText = "Remove extension";
}
