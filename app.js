const colorPicker = document.getElementById('colorpicker')
const convasColor = document.getElementById('convasColor')
const fontSize = document.getElementById('font-size')
const canvas = document.getElementById('mycanvas')
const clearButton = document.getElementById('clearButton')
const saveButton = document.getElementById('saveButton')
const retriveButton = document.getElementById('retriveButton')
const background = document.getElementById('Background')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 500;

colorPicker.addEventListener('change',(e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})
canvas.addEventListener('mousedown',(e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) { 
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});
canvas.addEventListener('mouseup',(e) => {
    isDrawing = false;
})

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

fontSize.addEventListener('change',(e) => {
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click', () => {    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})
saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL())
    let link = document.createElement('a')
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
})

retriveButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents')

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})

