const map = document.getElementById("map");
const backZone = document.getElementById("back-zone");
const bluePrint = document.getElementById(`bluePrint`);
var zoomAble = true;

const ZOOM_SPEED = 0.1;
let bluePrint_zoom = 1;
let isMouseDown = false;
let startX, startY;
let scrollLeft, scrollDown;
let initialDistance;

window.addEventListener('resize', function (event) {
    event.preventDefault();
});

window.addEventListener('d', function (event) {
    event.preventDefault();
});

// 제스처 시작 이벤트 리스너
window.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});

// 제스처 변경 이벤트 리스너
window.addEventListener('gesturechange', function (event) {
    event.preventDefault();
});
blueprintZone.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'touch') {
        // 두 손가락이 눌렸는지 확인
        if (event.pointerId === 1) {
            initialDistance = null;
        }
    }
},{ passive: false });

blueprintZone.addEventListener('pointermove', function (event) {
    event.preventDefault();
    if (event.pointerType === 'touch') {
        const touches = Array.from(event.getCoalescedEvents());
        if (touches.length === 2) {
            const currentDistance = getDistance(touches);
            if (initialDistance === null) {
                initialDistance = currentDistance;
            } else {
                const containerWidth = blueprintZone.offsetWidth;
                const containerHeight = blueprintZone.offsetHeight;
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
        }
    }
},{ passive: false });

window.addEventListener('pointerup', function (event) {
    if (event.pointerType === 'touch') {
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