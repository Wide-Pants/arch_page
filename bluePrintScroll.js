
const scrollCursor = document.getElementById(`scroll-cursor`)
scrollCursor.addEventListener('drag',(e)=>{
    console.log('드래그');
})
scrollCursor.addEventListener(`dragstart`,(e)=>{
    e.preventDefault();
    console.log('드래그 시작')
})
scrollCursor.addEventListener(`dragend`,(e)=>{
    e.preventDefault()
})