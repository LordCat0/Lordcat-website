//LordCat 9/6/25

Array.from(document.querySelector(".navbar").children)
.filter(node=>node.id)
.forEach(node=>node.addEventListener('click',()=>window.pageRenderer.renderPage(node.id)))

document.getElementById("social-discord").addEventListener('click',()=>window.open("https://discord.com/users/1164322893438648401"))
document.getElementById("social-github").addEventListener('click',()=>window.open("https://github.com/LordCat0"))

const catImages = ["catmunch.gif", "catpet.gif", "catyes.gif"]

document.querySelector(".cat-image").src = `./assets/${catImages[Math.floor(Math.random() * 3)]}`
document.querySelector(".cat-image").onclick = () => document.querySelector('.cat-sound').play()

document.querySelector(".search").addEventListener('input', (event) => {
    Array.from(document.querySelectorAll(".weblist-card")).forEach(element => element.toggleAttribute("hidden",!element.dataset.name.startsWith(event.target.value)))
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
