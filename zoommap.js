const map = document.getElementById("map");
const backZone = document.getElementById("back-zone");
const bluePrint = document.getElementById(`bluePrint`)
var zoomAble = true;

let map_zoom = 1;
const ZOOM_SPEED = 0.1;
let bluePrint_zoom = 1;
let isMouseDown = false;
let startX, startY;
let scrollLeft, scrollDown;

window.addEventListener('resize', function (event) {
    console.log('Window resized');
    event.preventDefault();
});

// 제스처 시작 이벤트 리스너
window.addEventListener('gesturestart', function (event) {
    console.log('Gesture started');
    event.preventDefault();
});

// 제스처 변경 이벤트 리스너
window.addEventListener('gesturechange', function (event) {
    console.log('Gesture changed', event.scale);
    if (zoomAble) {
        if (event.scale > 1) {
            map.style.transform = `scale(${map_zoom += ZOOM_SPEED})`;
        } else {
            if (map_zoom > 1) {
                map.style.transform = `scale(${map_zoom -= ZOOM_SPEED})`;
            }
        }
    }else{
        if (event.scale > 1) {
            bluePrint.style.transform = `scale(${bluePrint_zoom += ZOOM_SPEED})`;
        } else {
            if (bluePrint_zoom > 1) {
                bluePrint.style.transform = `scale(${bluePrint_zoom -= ZOOM_SPEED})`;
            }
        }
    }
});

backZone.addEventListener('pointerdown', (e) => {

    e.preventDefault();
    console.log("마우스 다운!")
    isMouseDown = true;

    startX = e.pageX - backZone.offsetLeft;
    startY = e.pageY - backZone.offsetTop;

    scrollLeft = backZone.scrollLeft;
    scrollTop = backZone.scrollTop;
})

backZone.addEventListener('pointermove', (e) => {
    if (!isMouseDown) return;

    e.preventDefault();
    const x = e.pageX - backZone.offsetLeft;
    const y = e.pageY - backZone.offsetTop;
    const walkLeft = (x - startX) * 1;
    const walkTop = (y - startY) * 1;

    backZone.scrollLeft = scrollLeft - walkLeft;
    backZone.scrollTop = scrollTop - walkTop;

})

backZone.addEventListener('pointerup', () => {
    isMouseDown = false;
})