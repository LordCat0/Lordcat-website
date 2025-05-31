//LordCat 5/30/2025

window.pageRenderer = {}

window.pageRenderer.hideAllPages = () => {
    document.querySelector('.homepage').setAttribute("hidden", '')
    document.querySelector('.weblist').setAttribute("hidden", '')
}

window.pageRenderer.renderPage = (pageId) => {
    window.pageRenderer.hideAllPages()
    switch(pageId){
        case 'home':
            document.querySelector('.homepage').removeAttribute("hidden")
            break;
        
    }
}