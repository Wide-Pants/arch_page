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
let centerX,centerY
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
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        centerX = (touch1.clientX + touch2.clientX) / 2;
        centerY = (touch1.clientY + touch2.clientY) / 2;
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
                // 현재 스크롤 위치 가져오기
                const currentScrollLeft = blueprintZone.scrollLeft;
                const currentScrollTop = blueprintZone.scrollTop;

                // 터치 포인트 기준 현재 화면 좌표 계산
                const relativeCenterX = currentScrollLeft + centerX;
                const relativeCenterY = currentScrollTop + centerY;

                // 줌 적용 후 새로운 좌표 계산
                const newCenterX = relativeCenterX * bluePrint_zoom;
                const newCenterY = relativeCenterY * bluePrint_zoom;

                // 새로운 스크롤 위치 계산
                const offsetX = newCenterX - centerX;
                const offsetY = newCenterY - centerY;

                blueprintZone.scrollLeft = offsetX;
                blueprintZone.scrollTop = offsetY;
            }
        } else if (currentDistance < initialDistance) {
            if (bluePrint_zoom > 1) {
                bluePrint.style.transform = `scale(${bluePrint_zoom -= ZOOM_SPEED})`;
                 // 현재 스크롤 위치 가져오기
                 const currentScrollLeft = blueprintZone.scrollLeft;
                 const currentScrollTop = blueprintZone.scrollTop;
 
                 // 터치 포인트 기준 현재 화면 좌표 계산
                 const relativeCenterX = currentScrollLeft + centerX;
                 const relativeCenterY = currentScrollTop + centerY;
 
                 // 줌 적용 후 새로운 좌표 계산
                 const newCenterX = relativeCenterX * bluePrint_zoom;
                 const newCenterY = relativeCenterY * bluePrint_zoom;
 
                 // 새로운 스크롤 위치 계산
                 const offsetX = newCenterX - centerX;
                 const offsetY = newCenterY - centerY;
 
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