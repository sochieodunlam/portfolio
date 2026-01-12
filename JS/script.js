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

// console.log(rowNum) 
// console.log(colNum) 


const startingPoint = Math.round(Math.random() * area) + 1
console.log(startingPoint)
infectedBoxes = [startingPoint]

function infect() {
if (infectedBoxes.length > 3) {
            infectedBoxes.shift()
        }
    for (box in infectedBoxes) {
        // box left/right
        let x = Math.random()
        console.log(x)
        if (x <= 0.2) { // right
            infectedBoxes.push(infectedBoxes[box] + 1)
            console.log(infectedBoxes)
            const newBox = document.getElementById(`${infectedBoxes[box] + 1}`)
            newBox.style.backgroundColor = "red";
            infectedBoxes.splice(box, 1)
        }

        if (x > 0.2 && x <= 0.4) { // left
            infectedBoxes.push(infectedBoxes[box] - 1)
            console.log(infectedBoxes)
            const newBox = document.getElementById(`${infectedBoxes[box] - 1}`)
            newBox.style.backgroundColor = "red";
            infectedBoxes.splice(box, 1)
        }
        if (x > 0.4 && x <= 0.6) { // up
            infectedBoxes.push(infectedBoxes[box] - colNum)
            const newBox = document.getElementById(`${infectedBoxes[box] - colNum}`)
            newBox.style.backgroundColor = "red";
            infectedBoxes.splice(box, 1)
            console.log(infectedBoxes)
        }

        if (x > 0.6 && x <= 0.8) { // down
            infectedBoxes.push(infectedBoxes[box] + colNum)
            const newBox = document.getElementById(`${infectedBoxes[box] + colNum}`)
            newBox.style.backgroundColor = "red";
            infectedBoxes.splice(box, 1)
            console.log(infectedBoxes)
        }
        else if (x > 0.99) { // right & up
            infectedBoxes.push(infectedBoxes[box] + 1)
            infectedBoxes.push(infectedBoxes[box] - colNum)
            let newBox1 = document.getElementById(`${infectedBoxes[box] - colNum}`)
            let newBox2 = document.getElementById(`${infectedBoxes[box] + 1}`);
            newBox1.style.backgroundColor = "red";
            newBox2.style.backgroundColor = "red";
            infectedBoxes.splice(box, 1)

        }

        

    }

    setTimeout(function(){
        for (box in infectedBoxes) {
            infect(infectedBoxes[box]);
    }
    }, 100);

}


infect()

