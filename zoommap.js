const map = document.getElementById("map");
const backZone = document.getElementById("back-zone");
var zoomAble = true;

let map_zoom = 1;
const ZOOM_SPEED = 0.1;
let bluePrint_zoom = 1;
let isMouseDown = false;
let startX, startY;
let scrollLeft, scrollDown;

// function preventBrowserZoom() {
//     function listener(event) {
//         // 핀치 줌의 경우 두 개 이상의 이벤트가 발생한다

//         event.preventDefault(); // preventDefault를 사용하려면 passive를 false로 해줘야합니다.

//     }

//     document.addEventListener("pointermove", listener, { passive: false });
// }
// preventBrowserZoom();

document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function (e) {
    if (e.touches.length > 1 && initialPinchDistance) {
        const newPinchDistance = getDistance(e.touches[0], e.touches[1]);
        const pinchRatio = newPinchDistance / initialPinchDistance;

        zoomLevel = pinchRatio;
        updateBackgroundSize();

        e.preventDefault();

    }
}, { passive: false });

document.addEventListener('touchend', function (e) {
    if (e.touches.length < 2) {
        initialPinchDistance = null;
    }
}, { passive: false });

function getDistance(touch1, touch2) {
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2));
}
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


