const map = document.getElementById("map");
const backZone = document.getElementById("back-zone");
const bluePrint = document.getElementById(`bluePrint`);

const ZOOM_SPEED = 0.1;
let bluePrint_zoom = 1;
let isMouseDown = false;
let startX, startY;
let scrollLeft, scrollDown;
let initialDistance;
var isPinching =false;

bluePrint.addEventListener('touchstart', function (event) {
    console.log(`이벤트 인식`+event.target)
    if (event.touches.length === 2) {
        isPinching = true;
        initialDistance = getDistance(event.touches);
    } else {
        isPinching = false;
        initialDistance = null;
    }
},{ passive: false });

bluePrint.addEventListener('touchmove', function (event) {
    if(!isZoomable) return;
    if (isPinching && event.touches.length === 2) {
        event.preventDefault(); // 기본 확대/축소 동작 방지
        const currentDistance = getDistance(event.touches);
        if (currentDistance > initialDistance) {
            if (bluePrint_zoom < 2) {
                bluePrint.style.transform = `scale(${bluePrint_zoom += ZOOM_SPEED})`;
                const scaledWidth = bluePrint.offsetWidth * bluePrint_zoom;
                const scaledHeight = bluePrint.offsetHeight * bluePrint_zoom;

                // offsetX와 offsetY를 정확하게 계산
                const offsetX = (scaledWidth - containerWidth) / 2;
                const offsetY = (scaledHeight - containerHeight) / 2;
                blueprintZone.scrollLeft = offsetX;
                blueprintZone.scrollTop = offsetY;
            }
        } else if (currentDistance < initialDistance) {
            if (bluePrint_zoom > 1) {
                bluePrint.style.transform = `scale(${bluePrint_zoom -= ZOOM_SPEED})`;
                const scaledWidth = bluePrint.offsetWidth * bluePrint_zoom;
                const scaledHeight = bluePrint.offsetHeight * bluePrint_zoom;

                // offsetX와 offsetY를 정확하게 계산
                const offsetX = (scaledWidth - containerWidth) / 2;
                const offsetY = (scaledHeight - containerHeight) / 2;
                console.log(offsetX, offsetY)
                blueprintZone.scrollLeft = offsetX;
                blueprintZone.scrollTop = offsetY;
            }
        }
        initialDistance = currentDistance;
    }
},{ passive: false });

bluePrint.addEventListener('touchend', function (event) {
    if (event.touches.length < 2) {
        isPinching = false;
        initialDistance = null;
    }
});
bluePrint.addEventListener('touchcancel', function (event) {
    if (event.touches.length < 2) {
        isPinching = false;
        initialDistance = null;
    }
});

backZone.addEventListener('pointerdown', (e) => {

    e.preventDefault();
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