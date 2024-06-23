const areas = document.querySelectorAll("area");
const mapImage = document.getElementById("mapIMG");
const svgOverlay = document.getElementById("svgOverlay");

function resizeImageMap() {
    const widthRatio = mapImage.clientWidth / mapImage.naturalWidth;
    const heightRatio = mapImage.clientHeight / mapImage.naturalHeight;

    areas.forEach(area => {
        const originalCoords = area.coords.split(',').map(Number);
        const newCoords = originalCoords.map((coord, index) => {
            return (index % 2 === 0) ? coord * widthRatio : coord * heightRatio;
        });
        area.coords = newCoords.join(',');
    });

    map.style.transform = `scale(1)`;

    updateOverlay();
}

function initializeImageMap() {
    areas.forEach(area => {
        area.dataset.originalCoords = area.coords;
    });
    resizeImageMap();
}

function updateOverlay() {

    while (svgOverlay.firstChild) {
        svgOverlay.removeChild(svgOverlay.firstChild);
    }

    areas.forEach((area, index) => {
        const coords = area.coords.split(',').map(Number);
        const points = [];
        for (let i = 0; i < coords.length; i += 2) {
            points.push([coords[i], coords[i + 1]]);
        }

        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", points.map(p => p.join(',')).join(' '));
        polygon.setAttribute("class", "area-fill");

        svgOverlay.appendChild(polygon);
    });

    Array.from(svgOverlay.children).forEach((polygon,index)=>{
        polygon.addEventListener("pointerdown", function () {
            popupScreen.style.display = 'flex';
            zoomAble = false;
            BluePrintShow(index);
        });
    })
}

document.addEventListener("DOMContentLoaded", initializeImageMap);