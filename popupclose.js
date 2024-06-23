const closeButton = document.getElementById(`close_button`);
const popupScreen = document.getElementById('popUpBackground');

closeButton.addEventListener('click', (e)=>{
    popupScreen.style.display = 'none';
    zoomAble = true;
})