let rootFolder;
const bpModal = document.getElementById(`bpModal`);
function openBlueprint(num) {
    isZoomable = true;
    bluePrint_zoom = 1;

    bluePrint.style.transform = `scale(1)`;
    rootFolder = `${num}Bidg`;
    if (num > 2) {
        scrollZone.style.display = `none`;
        bpModal.style.marginLeft = `105px`
    }

    else {
        scrollZone.style.display = 'flex';
        bpModal.style.marginLeft = `0px`
        const scrollHeight = scrollBar.offsetHeight;
        const cursorHeight = scrollCursor.offsetHeight;
        scrollCursor.style.marginTop = `${scrollHeight - cursorHeight}px`;
        floor = 1;
    }

    BluePrintShow(1);
}


function BluePrintShow(num) {
    bluePrint.style.transform = `scale(1)`;
    bpIMG.src = `Bidgs/${rootFolder + '/' + num}F.png`;
}