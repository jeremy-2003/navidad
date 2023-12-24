// Establecer la fecha de Navidad (25 de diciembre)
const christmasDate = new Date('December 25, 2023 00:00:00').getTime();

// Variables globales
let countdownInterval;
let isGiftButtonEnabled = false;

// Función para actualizar el contador y verificar si se llegó a 0
function updateCountdown() {
    const now = new Date().getTime();
    const distance = christmasDate - now;

    if (distance <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '0d 0h 0m 0s'; // Mostrar directamente 0 cuando llega a cero
        isGiftButtonEnabled = true;
        document.getElementById('giftButton').removeAttribute('disabled');
        document.getElementById('giftButton').classList.add('active-gift');
        document.getElementById('topTitle').innerHTML = "¡Feliz Navidad mi amor!<br>F ❤ J";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}


// Función para abrir el regalo y mostrar el popup
function openGift() {
    if (isGiftButtonEnabled) {
        // Agrega aquí la lógica específica para mostrar la carta
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
    }
}


// Variables para gestionar los mensajes divididos
const messages = [
    "¡Feliz Navidad!\nAquí está la primera parte de tu carta de Navidad...",
    "Espero que esta temporada te llene de alegría y amor...",
    "Con todo mi cariño,\n[Tu Nombre]"
];
let currentMessageIndex = 0;

// Función para navegar entre mensajes
function navigateMessages(direction) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    currentMessageIndex += direction;

    // Deshabilitar el botón de retroceso si es el primer mensaje
    prevBtn.disabled = currentMessageIndex === 0;
    prevBtn.style.display = prevBtn.disabled ? 'none' : 'block';  

    // Deshabilitar el botón de avanzar si es el último mensaje
    nextBtn.disabled = currentMessageIndex === messages.length - 1;
    nextBtn.style.display = nextBtn.disabled ? 'none' : 'block';  
    if (currentMessageIndex < 0) {
        currentMessageIndex = 0;
    } else if (currentMessageIndex >= messages.length) {
        currentMessageIndex = messages.length - 1;
    }

    updatePopupText();
}


// Función para actualizar el texto del popup con el efecto de typeWriter
function updatePopupText() {
    const popupText = document.getElementById('popup-text');
    const currentMessage = messages[currentMessageIndex];
    typeWriter(currentMessage, popupText);
}


// Función para mostrar el popup con transición gradual
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Espera un breve momento antes de añadir la clase
    setTimeout(function () {
        popup.classList.add('active');
        updatePopupText(); // Muestra el primer mensaje al abrir el popup

        // Deshabilitar el botón de retroceso si es el primer mensaje
        const prevBtn = document.getElementById('prevBtn');
        prevBtn.disabled = true;
        prevBtn.style.display = 'none';  // Ocultar la flecha izquierda

        // Habilitar el botón de avanzar si hay más de un mensaje
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.disabled = messages.length <= 1;
    }, 10);
}


// Función para cerrar el popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// Función para cambiar el fondo entre dos imágenes
function changeBackground() {
    const body = document.body;
    const topTitle = document.getElementById('topTitle'); // Agregamos esta línea para obtener el elemento del título

    const currentBackground = body.style.backgroundImage;

    if (currentBackground.includes('fondo1')) {
        body.style.backgroundImage = 'url("img/fondo2.jpg")';
        topTitle.style.color = '#e44d26'; // Cambiamos el color a rojo cuando se usa fondo2
    } else if (currentBackground.includes('fondo2')) {
        body.style.backgroundImage = 'url("img/fondo3.jpg")';
        topTitle.style.color = '#00ff00'; // Cambiamos el color a verde cuando se usa fondo3
    } else {
        body.style.backgroundImage = 'url("img/fondo1.jpg")';
        topTitle.style.color = '#e44d26'; // Volvemos a cambiar a rojo cuando se usa fondo1
    }
}



// Ocultar el popup y establecer el fondo inicial al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    // Establecer el fondo inicial
    document.body.style.backgroundImage = 'url("img/fondo1.jpg")';

    // Cambiar automáticamente el fondo cada 10 segundos
    setInterval(changeBackground, 10000);

    // Iniciar el intervalo del contador
    countdownInterval = setInterval(updateCountdown, 1000);
});

function openGift() {
    if (isGiftButtonEnabled) {
        const destelloContainer = document.getElementById('destelloContainer');
        destelloContainer.style.display = 'block';

        setTimeout(function () {
            destelloContainer.style.display = 'none';
            showPopup();
        }, 4000); // Ajusta el tiempo según la duración de la animación de destello
    }
}

// Función para el efecto de escritura
function typeWriter(text) {
    const popupText = document.getElementById('popup-text');
    popupText.innerText = ''; // Limpiar el contenido actual

    let index = 0;

    function type() {
        if (index < text.length) {
            if (text.charAt(index) === ' ') {
                // Agregar código de espacio HTML para representar espacios
                popupText.innerHTML += '&nbsp;';
            } else {
                popupText.innerText += text.charAt(index);
            }
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}




const puzzleContainer = document.getElementById('puzzle');
const initialPuzzleState = [
    ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'],
    ['img/4.jpg', 'img/5.jpg', 'img/6.jpg'],
    ['img/7.jpg', 'img/8.jpg', 'img/empty.jpg']
];

let currentPuzzleState = [...initialPuzzleState];
let isPuzzleSolved = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializePuzzle() {
    puzzleContainer.innerHTML = '';

    currentPuzzleState = [...initialPuzzleState];

    if (!isPuzzleSolved) {
        const flattenedPuzzle = currentPuzzleState.flat();
        shuffleArray(flattenedPuzzle);

        for (let i = 0; i < currentPuzzleState.length; i++) {
            for (let j = 0; j < currentPuzzleState[i].length; j++) {
                currentPuzzleState[i][j] = flattenedPuzzle[i * currentPuzzleState.length + j];
            }
        }
    }

    currentPuzzleState.forEach((row, rowIndex) => {
        row.forEach((imageName, colIndex) => {
            const cell = document.createElement('div');
            cell.className = 'puzzle-cell';

            if (imageName !== 'img/empty.jpg') {
                const img = document.createElement('img');
                img.src = imageName;
                img.className = 'puzzle-img'; // Agrega una clase para el estilo de la imagen
                img.style.width = '100%'; // Establece el ancho de la imagen
                img.style.height = '100%'; // Establece la altura de la imagen
                cell.appendChild(img);
            }

            cell.addEventListener('click', () => moveTile(rowIndex, colIndex));
            puzzleContainer.appendChild(cell);
        });
    });

    isPuzzleSolved = false;

    // Deshabilita el botón al inicio
    document.getElementById('siguienteBtn').disabled = true;
}

function moveTile(row, col) {
    if (!isPuzzleSolved) {
        // Busca la posición del espacio vacío ('img/empty.jpg')
        const emptyRow = currentPuzzleState.findIndex(row => row.includes('img/empty.jpg'));
        const emptyCol = currentPuzzleState[emptyRow].indexOf('img/empty.jpg');

        if (isValidMove(row, col, emptyRow, emptyCol)) {
            swapTiles(row, col, emptyRow, emptyCol);
            updatePuzzleView();
            checkPuzzleSolved();
        }
    }
}

function isValidMove(row, col, emptyRow, emptyCol) {
    return (
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
}

function swapTiles(row1, col1, row2, col2) {
    const temp = currentPuzzleState[row1][col1];
    currentPuzzleState[row1][col1] = currentPuzzleState[row2][col2];
    currentPuzzleState[row2][col2] = temp;
}

function updatePuzzleView() {
    puzzleContainer.innerHTML = '';

    currentPuzzleState.forEach((row, rowIndex) => {
        row.forEach((imageName, colIndex) => {
            const cell = document.createElement('div');
            cell.className = 'puzzle-cell';

            if (imageName !== 'img/empty.jpg') {
                const img = document.createElement('img');
                img.src = imageName;
                img.className = 'puzzle-img'; // Agrega una clase para el estilo de la imagen
                img.style.width = '100%'; // Establece el ancho de la imagen
                img.style.height = '100%'; // Establece la altura de la imagen
                cell.appendChild(img);
            }

            cell.addEventListener('click', () => moveTile(rowIndex, colIndex));
            puzzleContainer.appendChild(cell);
        });
    });
}


function checkPuzzleSolved() {
    const flattenedState = currentPuzzleState.flat();
    const emptyIndex = flattenedState.indexOf('img/empty.jpg');

    // Verifica si todos los elementos están en la posición correcta en relación con 'img/empty.jpg'
    const isSolved = flattenedState.every((imageName, index) => {
        if (imageName === 'img/empty.jpg') {
            return index === flattenedState.length - 1; // 'img/empty.jpg' debe estar en la última posición
        } else {
            const expectedImage = `img/${index + 1}.jpg`;
            return imageName === expectedImage;
        }
    });
    const filtered = flattenedState.filter((_, index) => index !== emptyIndex);
    console.log(filtered);
    const siguienteBtn = document.getElementById('siguienteBtn');
    console.log(flattenedState);
    console.log(emptyIndex);
    console.log(isSolved);
    if (isSolved) {
        isPuzzleSolved = true;
        puzzleContainer.classList.add('puzzle-solved');
        siguienteBtn.style.display = 'block';
        siguienteBtn.disabled = false;
        console.log("resuelto");
    } else {
        isPuzzleSolved = false;
        puzzleContainer.classList.remove('puzzle-solved');
        siguienteBtn.disabled = true;
        console.log("falta");
    }
}

initializePuzzle();

document.getElementById('siguienteBtn').addEventListener('click', function () {
    openNewPage();
});

function redireccionarOtroHTML() {
    window.location.href = 'hearth.html';
}