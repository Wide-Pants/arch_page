
let isMouseDown_dp = false;
let startX_bp, startY_bp;
let scrollLeft_bp, scrollDown_bp;

blueprintZone.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    console.log("마우스 다운!")
    isMouseDown_dp = true;

    startX_bp = e.pageX - blueprintZone.offsetLeft;
    startY_bp = e.pageY - blueprintZone.offsetTop;

    scrollLeft_bp = blueprintZone.scrollLeft;
    scrollTop_bp = blueprintZone.scrollTop;
})

blueprintZone.addEventListener('pointermove', (e) => {
    if (!isMouseDown_dp) return;

    e.preventDefault();
    const x = e.pageX - blueprintZone.offsetLeft;
    const y = e.pageY - blueprintZone.offsetTop;
    const walkLeft = (x - startX_bp) * 1;
    const walkTop = (y - startY_bp) * 1;

    bluePrint.scrollLeft = scrollLeft_bp - walkLeft;
    bluePrint.scrollTop = scrollTop_bp - walkTop;

})

blueprintZone.addEventListener('pointerup', () => {
    isMouseDown_dp = false;
})
