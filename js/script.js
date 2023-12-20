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
        document.getElementById('topTitle').textContent = "¡Feliz Navidad mi amor!";
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

// Función para mostrar el popup con transición gradual
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Espera un breve momento antes de añadir la clase
    setTimeout(function () {
        popup.classList.add('active');
    }, 10);

    // Mensaje que se animará con efecto de escritura
    const message = "¡Feliz Navidad!\nAquí está tu carta de Navidad...\nCon todo mi amor, [Tu Nombre]";

    // Iniciar el efecto de escritura en el párrafo del popup
    typeWriter(message);
}

// Función para cerrar el popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// Función para cambiar el fondo entre dos imágenes
function changeBackground() {
    const body = document.body;
    const currentBackground = body.style.backgroundImage;

    if (currentBackground.includes('fondo1')) {
        body.style.backgroundImage = 'url("img/fondo2.jpg")';
    } else if (currentBackground.includes('fondo2')) {
        body.style.backgroundImage = 'url("img/fondo3.jpg")';
    } else {
        body.style.backgroundImage = 'url("img/fondo1.jpg")';
    }
}


// Ocultar el popup y establecer el fondo inicial al cargar la página
document.addEventListener('DOMContentLoaded', function() {
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