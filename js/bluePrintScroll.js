
const scrollContainer = document.getElementById('scroll-container');
const scrollBar = document.getElementById('scroll-bar');
const scrollCursor = document.getElementById('scroll-cursor');

let isPointerDown = false;
let floor = 1;
let firstY;

scrollCursor.addEventListener('pointerdown', onPointerDown);
scrollCursor.addEventListener('touchstart', onPointerDown);

function onPointerDown(e) {
    isPointerDown = true;
    e.preventDefault();
    
    // 터치 이벤트와 포인터 이벤트를 모두 지원
    let clientY = e.clientY || e.touches[0].clientY;
    
    firstY = clientY - scrollCursor.getBoundingClientRect().top;
    let newTop;
    let cursorTop;
    const scrollHeight = scrollBar.offsetHeight;
    const cursorHeight = scrollCursor.offsetHeight;
    
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    document.addEventListener('pointerleave', onPointerUp);

    function onPointerMove(e) {
        // 터치 이벤트와 포인터 이벤트를 모두 지원
        let clientY = e.clientY || e.touches[0].clientY;
        const rect = scrollBar.getBoundingClientRect().top;
        cursorTop = clientY - firstY - rect;

        if (cursorTop < 0) cursorTop = 0;
        if (cursorTop > scrollHeight - cursorHeight) cursorTop = scrollHeight - cursorHeight;

        scrollCursor.style.marginTop = `${cursorTop}px`;
    }

    function onPointerUp() {
        const positionFraction = cursorTop / scrollHeight;
        if (positionFraction >= 0.75) {
            newTop = scrollHeight - cursorHeight;
            floor = 1;
        } else if (positionFraction >= 0.5) {
            newTop = scrollHeight * 2 / 3 - cursorHeight / 2;
            floor = 2;
        } else if (positionFraction >= 0.25) {
            newTop = scrollHeight / 3 - cursorHeight / 2;
            floor = 3;
        } else {
            newTop = 0;
            floor = 4;
        }
        scrollCursor.style.marginTop = `${newTop}px`;
        BluePrintShow(floor);
        isPointerDown = false;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('touchend', onPointerUp);
        document.removeEventListener('pointerleave', onPointerUp);
    }
}

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

