//LordCat 9/6/2025

pageRenderer = {}
pageRenderer.weblist = {}

pageRenderer.fetch = (url, type, callback) => fetch(url).then(res => res[type]().then(data => callback(data)))

pageRenderer.renderGameViewer = (item) => {
    sessionStorage.setItem("loaded-page", `view:${item.name}`)
    document.querySelector(".weblist").setAttribute("hidden",'')
    document.querySelector(".ribbon").setAttribute("hidden",'')
    document.querySelector(".title").textContent = item.name
    document.querySelector(".thumbnail").src = `./assets/thumbnails/${item.thumbnail}`
    if(item.description){
        document.querySelector(".description p").textContent = item.description
        document.querySelector(".description").removeAttribute("hidden")
    }else{
        document.querySelector(".description").setAttribute("hidden","")
    }
    document.querySelector(".play-icon").onclick=()=> {
        console.log("playing")
        document.querySelector(".game-embed").src = `./player.html?project=${item.projectFile}`
        document.querySelector(".play-icon").setAttribute("hidden",'')
        document.querySelector(".thumbnail").setAttribute("hidden",'')
        document.querySelector(".game-embed").removeAttribute("hidden")
    }
    document.querySelector(".game-viewer").removeAttribute("hidden")
}

pageRenderer.weblist.render = (jsonData,type) => {
    document.querySelector(".ribbon").removeAttribute("hidden")
    const templateItem = document.querySelector('.weblist-template')
    const weblist = document.querySelector('.weblist')
    if(!Array.isArray(jsonData)) throw new Error(`Invalid weblist array: ${jsonData}`)
    document.querySelector(".extoptions").toggleAttribute("hidden",type!==3)
    jsonData.forEach(item => {
        const clone = templateItem.content.cloneNode(true)
        const card = clone.querySelector('div')

        card.classList.add('weblist-card')
        card.dataset.name = item.name
        if(type===3) card.setAttribute('wide', '')
        clone.querySelector('img').src = `./assets/thumbnails/${item.thumbnail}`
        clone.querySelector('span').textContent = item.name
        if(type===3){card.onclick=()=>{
            const selectedOption = document.querySelector('input[name="extoptions"]:checked')?.value;
            switch(selectedOption){
                case 'Download File':
                    const a = document.createElement('a')
                    a.download = `${item.name}.js`
                    a.href = `./extensions/${item.extensionFile}`
                    a.click()
                    a.remove()
                    break;
                case 'Copy Extension':
                    pageRenderer.fetch(`./extensions/${item.extensionFile}`,'text',(code)=> navigator.clipboard.writeText(code))
                    alert("Copied to clipboard!")
                    break;
                case 'Copy URL':
                    navigator.clipboard.writeText(`${location.host}/extensions/${item.extensionFile}`)
                    alert("Copied to clipboard!")
                    break;
                default:
                    console.warn(`Unknown download type: ${selectedOption}`)
                    break;
            }
        }}else if(type===2){card.onclick=()=>{
            window.open(item.link)
        }}else if(type===1){card.onclick=()=>{
            pageRenderer.renderGameViewer(item)
        }}
        weblist.append(clone)
    })
    document.querySelector('.weblist').removeAttribute("hidden")
}

pageRenderer.weblist.unrender = () => {
    document.querySelector('.weblist').setAttribute("hidden", '')
    document.querySelector(".ribbon").setAttribute("hidden","")
    document.querySelector(".game-viewer").setAttribute("hidden","")
    document.querySelector(".game-embed").src = "about:blank"
    Array.from(document.querySelectorAll('.weblist-card')).forEach(element => element.remove())
}

pageRenderer.hideAllPages = () => {
    pageRenderer.weblist.unrender()
    document.querySelector('.homepage').setAttribute("hidden", '')
}

pageRenderer.renderPage = (pageId) => {
    sessionStorage.setItem("loaded-page", pageId)
    pageRenderer.hideAllPages()
        if(pageId.startsWith('view:')){
        fetch(`./games/manifest.json`).then(res => 
            res.json().then(json => {
                pageRenderer.renderGameViewer(json.filter(i => i.name = pageId.split('view:')[1]).pop())
            }))
        return
    }
    switch(pageId){
        case 'home':
            document.querySelector('.homepage').removeAttribute("hidden")
            break;
        case 'games':
            window.pageRenderer.fetch(`./games/manifest.json`, 'json', (data) => {
                pageRenderer.weblist.render(data,1)
            })
            break;
        case 'tools':
            window.pageRenderer.fetch(`./tools/manifest.json`, 'json', (data) => {
                pageRenderer.weblist.render(data,2)
            })
            break;
        case 'extensions':
            window.pageRenderer.fetch(`./extensions/manifest.json`, 'json', (data) => {
                pageRenderer.weblist.render(data,3)
            })
            /*pageRenderer.weblist.render(Array(30).fill({
        "id": "projectinterfaces-ext",
        "name": "Project Interfaces",
        "thumbnail": "ProjectInterfacesExtension.png",
        "extensionFile": "ProjectInterfaces.js"
    }),3)*/
            document.querySelector('.weblist-card')
            break;

        default:
            console.warn(`No page found for ${pageId}`)
    }
}
pageRenderer.setElementTemporary = (element) => {
    
}
