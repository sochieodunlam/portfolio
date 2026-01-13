const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
console.log(`Viewport Width: ${screenWidth}px`);
console.log(`Viewport Height: ${screenHeight}px`);


function createGrid(boxNumber) {
    for (let x = 0; x < boxNumber; x++) {
        const box = document.createElement("div");
        box.classList.add('grid-item')
        box.id = x + 1
        gridContainer.append(box);
    }
}


// Creating the grid depending on page size
const ratio = screenWidth/screenHeight
const colNum = 100
const rowNum = Math.round(colNum/ratio)
const area = colNum * rowNum

const gridContainer = document.getElementById("grid-container");
gridContainer.style.gridTemplateColumns = `repeat(${colNum}, 1fr)`; 
gridContainer.style.gridTemplateRows = `repeat(${rowNum}, 1fr)`

createGrid(area); 


startingPoint = Math.round(Math.random() * area) + 1 // starts at a random box on screen
infectedBoxes = [startingPoint]
archivedBoxes = []
fadedBoxes = []
deadBoxes = []

function infect() {
    if (archivedBoxes) {
        for (box in archivedBoxes) {
            if (archivedBoxes.length < 20) {
                break
            }
            else {
                const arcBox = document.getElementById(`${archivedBoxes[box]}`)
                arcBox.style.opacity = "0.5"
                fadedBoxes.push(archivedBoxes[box])
                archivedBoxes.splice(box, 1)
            }
        }
        for (box in fadedBoxes) {
            if (fadedBoxes.length < 20) {
                break
            }
            else {
                const fadeBox = document.getElementById(`${fadedBoxes[box]}`)
                fadeBox.style.cssText = '';
                fadeBox.style.backgroundColor = "rgba(255, 255, 255, 0)"
                fadeBox.style.border = "1px solid rgba(255, 255, 255, 0.5)";
                deadBoxes.push(fadedBoxes[box])
                fadedBoxes.splice(box, 1)
            }
        }
        
        for (box in deadBoxes) {
            if (deadBoxes.length < 500) {
                break
            }
            else {
                const deadBox = document.getElementById(`${deadBoxes[box]}`)
                deadBox.style.border = "1px solid rgba(0, 0, 0, 0.5)";
                deadBoxes.splice(box, 1)

            }
        }
    }


    for (box in infectedBoxes) {
        moves = [infectedBoxes[box] + 1, infectedBoxes[box] - 1, infectedBoxes[box] - colNum, infectedBoxes[box] + colNum] // right, left, up, down
        moves = moves.filter(function(move) {
            return move > 1 && move < area && !archivedBoxes.includes(move)
        })

        let x = Math.floor(Math.random() * (moves.length))

        if (moves.length == 0) {
            startingPoint = Math.round(Math.random() * area) + 1
            infectedBoxes = [startingPoint]
            break;
        }

        if (x == 0) { 
            infectedBoxes.push(moves[0])
            const newBox = document.getElementById(`${moves[0]}`)
            newBox.style.backgroundColor = "rgba(255, 142, 189, 1)";
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[0])
        
        }

        if (x == 1) { 
            infectedBoxes.push(moves[1]) 
            const newBox = document.getElementById(`${moves[1]}`)
            newBox.style.backgroundColor = "rgba(133, 255, 133, 1)";
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[1])
        }
        if (x == 2) { 
            infectedBoxes.push(moves[2]) 
            const newBox = document.getElementById(`${moves[2]}`)
            newBox.style.backgroundColor = "rgba(206, 142, 255, 1)";
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[2])
        }

        if (x == 3) { 
            infectedBoxes.push(moves[3]) 
            const newBox = document.getElementById(`${moves[3]}`)
            newBox.style.backgroundColor = "rgba(142, 217, 255, 1)";
            newBox.style.border = "1px solid rgba(0, 162, 255, 1)";
            infectedBoxes.splice(box, 1)
            archivedBoxes.push(moves[3])
        }
    }

    setTimeout(function(){
        infect(infectedBoxes[box]);
    }, 50);
}


infect()



