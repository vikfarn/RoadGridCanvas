let canvasXSize = 20;
let canvasYSize = 15;
let squareSize = 20;

let interSections = [];
let interSectionSelected;
let roads = [];

let canvas = document.getElementById("main-canvas");
let ctx = canvas.getContext("2d"); 


setUpCanvas();
drawGrid();


//---------------------------------Drawing----------------------------------------
function setUpCanvas(){
    squareSize = (window.innerWidth/1.5)/canvasXSize;
    ctx.canvas.width  = window.innerWidth /1.5;
    canvasYSize = Math.round(window.innerHeight /squareSize /1.1);
        ctx.canvas.height = squareSize*canvasYSize;
    // console.log(canvas.style.width);
    // console.log(canvas.width);
    // canvas.height = canvas.style.height;
    // canvas.width = canvas.style.width;

}

function drawGrid(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let x = 0; x < canvasXSize; x++ ){
        for(let y = 0; y < canvasYSize; y++ )
        {
            if((y + x) % 2 == 0){
                ctx.fillStyle = "#00FF00";
            }else{
                ctx.fillStyle = "#7FFF00";
            }
            ctx.fillRect( x *squareSize, y * squareSize, squareSize - 1, squareSize - 1);
        }    
    }
    drawRoadLines();
    drawIntersections();
    drawRoads();
    
}
function drawIntersections(){
    ctx.fillStyle = "#808080"
    interSections.forEach((interSection) => {
        ctx.beginPath();
        ctx.arc(interSection.x*squareSize + squareSize/2, interSection.y*squareSize + squareSize/2, squareSize/2 - 3, 0, Math.PI*2, false);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    })
   
    if(interSectionSelected){
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(interSectionSelected.x*squareSize + squareSize/2, interSectionSelected.y*squareSize + squareSize/2, squareSize/2 - 3, 0, Math.PI*2, false);
        ctx.fill();
    }
    
}

function drawRoads(){
    ctx.beginPath();
    roads.forEach((road) =>{
        console.log(road.startPoint.x)
        ctx.moveTo(road.startPoint.x*squareSize + squareSize/2, road.startPoint.y*squareSize + squareSize/2);
        ctx.lineTo(road.endPoint.x*squareSize + squareSize/2, road.endPoint.y*squareSize + squareSize/2);
    });
    ctx.closePath();
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = squareSize / 2.1;
    ctx.stroke();
   
}
function drawRoadLines(){
    ctx.beginPath();
    roads.forEach((road) =>{
        console.log(road.startPoint.x)
        ctx.moveTo(road.startPoint.x*squareSize + squareSize/2, road.startPoint.y*squareSize + squareSize/2);
        ctx.lineTo(road.endPoint.x*squareSize + squareSize/2, road.endPoint.y*squareSize + squareSize/2);
    });
    ctx.closePath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = squareSize / 1.5;
    ctx.stroke();
}


//--------------------------Functionality-----------------------------------

function addIntersection(event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = Math.round((event.clientX - rect.left)/squareSize) - 1; 
    let y = Math.round((event.clientY - rect.top)/squareSize) - 1; 
    if(interSections.filter((interSection) =>{ return interSection.x == x && interSection.y == y}).length == 0){
        interSections.push({x: x, y:y})
    }
    drawGrid();
} 

function removeIntersection(event) {
    let rect = canvas.getBoundingClientRect(); 
    let x = Math.round((event.clientX - rect.left)/squareSize) - 1; 
    let y = Math.round((event.clientY - rect.top)/squareSize) - 1; 
    interSections = interSections.filter((interSection) => !(interSection.x == x && interSection.y == y))
    drawGrid();
}

function updateRoadCreating(event){
    let rect = canvas.getBoundingClientRect(); 
    let x = Math.round((event.clientX - rect.left)/squareSize) - 1; 
    let y = Math.round((event.clientY - rect.top)/squareSize) - 1; 
    if(interSections.filter((interSection) =>{ return interSection.x == x && interSection.y == y}).length != 0){
        if(interSectionSelected){
           addRoad(x, y) 
        }else{
            interSectionSelected = {x: x, y:y}
        }
    }
    console.log(roads);
    drawGrid();
}

function addRoad(x,y ){
    roads.push({startPoint : {x:x,y:y}, endPoint : {x: interSectionSelected.x, y: interSectionSelected.y}})
    interSectionSelected = null;
}

function selectRoad(event){
    let rect = canvas.getBoundingClientRect(); 
    let x = (event.clientX - rect.left)/squareSize;
    let y = (event.clientY - rect.top)/squareSize;
    console.log("X: " + x)
    console.log("Y: " + y)
}

canvas.addEventListener("mousedown", function(e) 
{ 
    if(document.getElementById("create-intersections").checked){
       addIntersection(e);
    }
    if(document.getElementById("remove-intersections").checked){
        removeIntersection(e);
    }
    if(document.getElementById("create-roads").checked){
        updateRoadCreating(e);
    }else{
        selectRoad(e);
    }
    
    
}); 
 