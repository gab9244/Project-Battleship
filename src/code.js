//Primeira parte do jogo
const body = document.getElementById('body')
const header = document.createElement('header');
let logo = document.createElement('img')
logo.src = '/imagens/bs_logo.46ed26ed.png'

const formulario = document.createElement('form')
formulario.action = '#'
formulario.method = 'get'

const inputDiv = document.createElement('div')
inputDiv.setAttribute('id', 'inputDiv')

let input = document.createElement('input')
input.type = 'text'
input.required = true


let startGame = document.createElement('button')
startGame.textContent = 'Start Game'
startGame.setAttribute('id','startGame')

//Segunda parte do jogo
//player será o corpo do tabuleiro enquanto divs seram os quadrados do tabuleiro
const GamePage = document.createElement('div')
GamePage.setAttribute('id','GamePage')

const playerName = document.createElement('h1')

const options = document.createElement('div')
options.setAttribute('id','options')

const flipButton = document.createElement('button')
flipButton.textContent = 'Flip'

const startButton = document.createElement('button')
startButton.textContent = 'Start'

const buttonsContainer = document.createElement('div')
buttonsContainer.setAttribute('id','buttonsContainer')

buttonsContainer.append(flipButton,startButton)

//A função flip serve para mudar os barcos da horizontal para a vertical e vise-versa
let angle = 0
function flip(){
   const optionShips= Array.from(document.querySelectorAll('#options div'))
   angle = angle === 0 ? 90 : 0
   optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`)
}
flipButton.addEventListener('click',flip)

//Os barcos que ficam na barra options
 const carrirPreview = document.createElement('div')
carrirPreview.setAttribute('class', 'carrir-preview')
carrirPreview.setAttribute('draggable','true')

 const battleshipPreview = document.createElement('div')
battleshipPreview.setAttribute('class', 'battleship-preview')
battleshipPreview.setAttribute('draggable','true')

const cruiserPreview = document.createElement('div')
cruiserPreview.setAttribute('class', 'cruiser-preview')
cruiserPreview.setAttribute('draggable','true')

 const submarinePreview = document.createElement('div')
submarinePreview.setAttribute('class', 'submarine-preview')
submarinePreview.setAttribute('draggable','true')

 const destroyerPreview = document.createElement('div')
destroyerPreview.setAttribute('class', 'destroyer-preview')
destroyerPreview.setAttribute('draggable','true')

const getDraggable = document.querySelectorAll('#options div')
getDraggable.forEach(draggableShips =>{
    draggableShips.addEventListener('dragend',()=>{
    })

    draggableShips.addEventListener('dragstart', (draggableShips) =>{
        if(angle === 90){draggableShips.style.transform = 'rotate(90deg)'} 
    })
})

options.append(carrirPreview,battleshipPreview,cruiserPreview,submarinePreview,destroyerPreview)

const player = document.createElement('div')
player.setAttribute('id', 'player')
GamePage.style.display = 'none'

const playerDiv = document.createElement('div')
playerDiv.setAttribute('id','playerDiv')
playerDiv.append(playerName,player,options,buttonsContainer)

const computer = document.createElement('div')
computer.setAttribute('id', 'computer')

startGame.addEventListener('click',()=>{
   if(input.value.length > 1){
    header.style.display = 'none'
    GamePage.style.display = 'flex'
    playerName.textContent = input.value
}
})
//Código para criar as 100 divs  e colocalas dentro do tabuleiro    
function makePlayerBoard(){
    for(let i = 0; i<100; i++){
        let divs = document.createElement('div')
        divs.setAttribute('id', [i])
        const selectDivs = document.querySelectorAll('#player div')
        selectDivs.forEach(div =>{
            div.addEventListener('dragover', e=>{
                e.preventDefault()
            })
        })

        player.appendChild(divs)
       
    }

    for(const element of player.children){
        element.addEventListener('click',()=>{
            element.style.backgroundColor = 'red'
        })
    }}
    makePlayerBoard()

    function makeComputerBoard(){
        
        for(let i = 0; i<100; i++){
            let divs = document.createElement('div')
            divs.setAttribute('id', [i])
            computer.appendChild(divs)
           
        }
    
        for(const element of computer.children){
            element.addEventListener('click',()=>{
                element.style.backgroundColor = 'red'
            })
        }
    }
    makeComputerBoard()

GamePage.append(playerDiv,computer)
inputDiv.appendChild(input)
formulario.append(input,startGame)
header.append(logo,inputDiv,formulario)

body.append(header,GamePage)

class shipFactory{
    constructor(name,lenght){
        this.name = name
        this.length = lenght
    }

}

const destroyer = new shipFactory('destroyer',2)
const submarine = new shipFactory('submarine',3)
const cruiser = new shipFactory('cruiser',3)
const battleship = new shipFactory('battleship',4)
const carrir = new shipFactory('carrir',5)


const ships = [destroyer, submarine, cruiser, battleship,carrir]
//Agora adicionaremos os barcos aleatóriamente ao tabuleiro do computador

function addShipPiece(ship){
    //Pegue todos os quadrados de um dos tabuleiros
    const allBoardBlocks = document.querySelectorAll('#computer div')
    //randomBolean retorna true ou false aleatóriamente
    let randomBolean = Math.random() < 0.5;
    let isHorizontal = randomBolean;
    let randomStartIndex = Math.floor(Math.random() * 100);

    let validStart = isHorizontal ? randomStartIndex <= 100 - ship.length ? randomStartIndex : 100 - ship.length :
    //handle vertical
    randomStartIndex <= 100 - 10 * ship.length ? randomStartIndex :
    randomStartIndex - ship.length * 10 + 10 

    let shipBlocks = []

    for(let i = 0; i < ship.length; i++){
        if(isHorizontal){
            shipBlocks.push(allBoardBlocks[Number(validStart) + i])
        }
        else {
            shipBlocks.push(allBoardBlocks[Number(validStart) + i *10 ])
        }
    }
    let valid
    if(isHorizontal){
        shipBlocks.every((_shipBlock, index) => valid = shipBlocks[0].id % 10 !== 10 -
        (shipBlocks.length - (index + 1)))
    }
    else {
        shipBlocks.every((_shipBlock, index) => valid = shipBlocks[0].id < 90 + (10 * index + 1))
    }

    const notTaken =shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

    if(valid && notTaken){
        shipBlocks.forEach(shipBlock =>{
            shipBlock.classList.add(ship.name)
            shipBlock.classList.add('taken')
        })
    } else {
        addShipPiece(ship)
    }

    
}

ships.forEach( ship => addShipPiece(ship))
