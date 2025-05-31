//LordCat 5/29/2025

Array.from(document.querySelector(".navbar").children)
.filter(node=>node.id)
.forEach(node=>node.addEventListener('click',()=>window.pageRenderer.renderPage(node.id)))

document.getElementById("social-discord").addEventListener('click',()=>window.open("https://discord.com/users/1164322893438648401"))
document.getElementById("social-github").addEventListener('click',()=>window.open("https://github.com/LordCat0"))

const catImages = ["catmunch.gif", "catpet.gif", "catyes.gif"]

document.querySelector(".cat-image").src = `./assets/${catImages[Math.floor(Math.random() * 3)]}`
document.querySelector(".cat-image").onclick = () => document.querySelector('.cat-sound').play()

window.pageRenderer.renderPage('home')