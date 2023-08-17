let hamburger = document.querySelector(".hamburger");
let hamburgerMenu = document.querySelector(".hamburgerMenu");
let hamburgerShadow = document.querySelector(".hamburgerShadow");


hamburger.addEventListener("click", hamburgerToggle);


function hamburgerToggle(){
    hamburger.classList.toggle("hToggle");
    hamburgerMenu.classList.toggle("open");
    hamburgerShadow.classList.toggle("shadowToggle");
}