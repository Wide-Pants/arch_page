
const scrollContainer = document.getElementById('scroll-container');
const scrollBar = document.getElementById('scroll-bar');
const scrollCursor = document.getElementById('scroll-cursor');

let isPointerDown = false;
let floor = 1;
let firstY;

scrollCursor.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    e.preventDefault();
    firstY = e.clientY - scrollCursor.getBoundingClientRect().top;

    document.addEventListener('pointermove', onPointermove);
    document.addEventListener('pointerup', onPointerUp);
        function onPointermove(e){
        const rect = scrollBar.getBoundingClientRect().top
        let cursorTop = e.clientY - firstY - rect;

        const scrollHeight = scrollBar.offsetHeight;
        const cursorHeight = scrollCursor.offsetHeight;

        if (cursorTop < 0) cursorTop = 0;
        if (cursorTop > scrollHeight - cursorHeight) cursorTop = scrollHeight - cursorHeight;

        const positionFraction = cursorTop / scrollHeight;

        console.log(cursorTop, positionFraction);

        let newTop;

        if (positionFraction >= 0.75 && floor != 1) {
            newTop = scrollHeight - cursorHeight;
            BluePrintShow(1)
            floor = 1;
        } else if (positionFraction >= 0.5 && floor != 2) {
            newTop = scrollHeight * 2 / 3 - cursorHeight / 2;
            BluePrintShow(2)
            floor = 2;
        } else if (positionFraction >= 0.25 && floor != 3) {
            newTop = scrollHeight / 3 - cursorHeight / 2;
            BluePrintShow(3); floor = 3;
        } else if (floor != 4) { newTop = 0; BluePrintShow(4); floor = 4; }

        scrollCursor.style.marginTop = `${newTop}px`;
    };
    function onPointerUp(){
        isPointerDown = false;
        document.removeEventListener('pointermove', onPointermove);
        document.removeEventListener('pointerup', onPointerUp);

    }
});

scrollBar.addEventListener('pointerdown', (e) => {
    if (isPointerDown) return;
    e.preventDefault();

    const scrollHeight = scrollBar.offsetHeight;
    const cursorHeight = scrollCursor.offsetHeight;
    const pointerPosition = e.offsetY;

    const positionFraction = pointerPosition / scrollHeight;

    let newTop;

    if (positionFraction >= 0.75 && floor != 1) {
        newTop = scrollHeight - cursorHeight;
        BluePrintShow(1)
        floor = 1;
    } else if (positionFraction >= 0.5 && floor != 2) {
        newTop = scrollHeight * 2 / 3 - cursorHeight / 2;
        BluePrintShow(2)
        floor = 2;
    } else if (positionFraction >= 0.25 && floor != 3) {
        newTop = scrollHeight / 3 - cursorHeight / 2;
        BluePrintShow(3); floor = 3;
    } else if (floor != 4) { newTop = 0; BluePrintShow(4); floor = 4; }

    scrollCursor.style.marginTop = `${newTop}px`;
});

