const map = document.getElementById("map");
const backZone = document.getElementById("back-zone");
const bluePrint = document.getElementById(`bluePrint`);

const ZOOM_SPEED = 0.05;
let bluePrint_zoom = 1;
let isMouseDown = false;
let startX, startY;
let scrollLeft, scrollDown;
let initialDistance;
var isPinching = false;
function getDistance(touches) {
    const [touch1, touch2] = touches;
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

bluePrint.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        isPinching = true;
        initialDistance = getDistance(event.touches);
    } else {
        isPinching = false;
        initialDistance = null;
    }
});

window.addEventListener('touchmove', function (event) {
    if (isPinching && event.touches.length === 2) {
        event.preventDefault();
        const currentDistance = getDistance(event.touches);
        if (currentDistance > initialDistance) {
            if (bluePrint_zoom < 2) {
                bluePrint.style.transform = `scale(${bluePrint_zoom += ZOOM_SPEED})`;

                const currentScrollLeft = blueprintZone.scrollLeft;
                const currentScrollTop = blueprintZone.scrollTop;

                // 현재 화면 중앙 좌표
                const currentCenterX = currentScrollLeft + containerWidth / 2;
                const currentCenterY = currentScrollTop + containerHeight / 2;

                // 새로운 스케일링 후 중앙 좌표
                const newCenterX = currentCenterX * bluePrint_zoom;
                const newCenterY = currentCenterY * bluePrint_zoom;

                // 새로운 스케일링 후 스크롤 위치
                const offsetX = newCenterX - containerWidth / 2;
                const offsetY = newCenterY - containerHeight / 2;

                blueprintZone.scrollLeft = offsetX;
                blueprintZone.scrollTop = offsetY;
            }
        } else if (currentDistance < initialDistance) {
            if (bluePrint_zoom > 1) {
                bluePrint.style.transform = `scale(${bluePrint_zoom -= ZOOM_SPEED})`;
                const currentScrollLeft = blueprintZone.scrollLeft;
                const currentScrollTop = blueprintZone.scrollTop;

                // 현재 화면 중앙 좌표
                const currentCenterX = currentScrollLeft + containerWidth / 2;
                const currentCenterY = currentScrollTop + containerHeight / 2;

                // 새로운 스케일링 후 중앙 좌표
                const newCenterX = currentCenterX * bluePrint_zoom;
                const newCenterY = currentCenterY * bluePrint_zoom;

                // 새로운 스케일링 후 스크롤 위치
                const offsetX = newCenterX - containerWidth / 2;
                const offsetY = newCenterY - containerHeight / 2;

                blueprintZone.scrollLeft = offsetX;
                blueprintZone.scrollTop = offsetY;
            }
        }
        initialDistance = currentDistance;
    }
}, { passive: false });

window.addEventListener('touchend', function (event) {
    if (event.touches.length < 2) {
        isPinching = false;
        initialDistance = null;
    }
});
window.addEventListener('touchcancel', function (event) {
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