const closeButton = document.getElementById(`close_button`);
const popupScreen = document.getElementById('popUpBackground');
const blueprintZone = document.getElementById(`blueprint-zone`);
const scrollZone = document.getElementById(`scroll-zone`);


popupScreen.addEventListener('click', (e)=>{
    console.log(e.target)
    if((e.target!=blueprintZone && e.target!=blueprintZone.children[0] && e.target!=blueprintZone.children[0].children[0] && e.target != scrollZone&& e.target != scrollZone.children[0].children[0]&& e.target != scrollZone.children[0].children[1])){
    popupScreen.style.display = 'none';
    zoomAble = true;}
})