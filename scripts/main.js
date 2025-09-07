//LordCat 9/6/25

let navbarOpened = true;
const navbar = document.querySelector('nav');
const navcontainer = document.querySelector('.navbar');
const mainContent = document.querySelector('.mainContent');

Array.from(document.querySelector(".navbar").children)
.filter(node=>node.id)
.forEach(node=>node.addEventListener('click',()=>window.pageRenderer.renderPage(node.id)))

document.getElementById("social-discord").addEventListener('click', () => window.open("https://discord.gg/FTJKVcTqnM"));
document.getElementById("social-github").addEventListener('click', () => window.open("https://github.com/LordCat0"));
document.querySelector(".navbar-toggle").onclick = () => {
    if(navbarOpened){
        navcontainer.hidden = true;
        navbar.style.width = '20px';
        document.body.style.setProperty('--main-content-offset', '50px');
    }else{
        navbar.style.width = '200px';
        navcontainer.removeAttribute('hidden');
        document.body.style.setProperty('--main-content-offset', '230px');
    }
    navbarOpened = !navbarOpened
}

const catImages = ["catmunch.gif", "catpet.gif", "catyes.gif"]

document.querySelector(".cat-image").src = `./assets/${catImages[Math.floor(Math.random() * 3)]}`
document.querySelector(".cat-image").onclick = () => document.querySelector('.cat-sound').play()

document.querySelector(".search").addEventListener('input', (event) => {
    Array.from(document.querySelectorAll(".weblist-card")).forEach(element => element.toggleAttribute("hidden",!element.dataset.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
})

if(localStorage.getItem("checked-extension-option")){
    document.querySelector(`input[value='${localStorage.getItem("checked-extension-option")}']`).setAttribute("checked","")
}else{
    document.querySelector("input[value='Download File']").setAttribute("checked","")
}

document.querySelector(".extoptions").addEventListener('input', (event) => localStorage.setItem("checked-extension-option",event.target.value))
document.querySelector(".fullscreen-icon").addEventListener('click',()=>document.querySelector(".frame").requestFullscreen())

window.searchParameters = new URLSearchParams(window.location.search)

if(location.hash != ''){
    pageRenderer.renderPage(location.hash.slice(1));
    history.replaceState(null, '', window.location.pathname + window.location.search)
}else if(sessionStorage.getItem('loaded-page')){
    pageRenderer.renderPage(sessionStorage.getItem('loaded-page'))
}else{
    pageRenderer.renderPage('home')
}
