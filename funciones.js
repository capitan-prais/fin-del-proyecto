document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    // Crear elementos de audio para los botones
    const soundSiguiente = new Audio('audio/seleccion.mp3'); // Cambia a tu archivo de sonido
    const soundAnterior = new Audio('audio/seleccion.mp3');   // Cambia a tu archivo de sonido

    carousels.forEach((carousel) => {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        // Crear contenedor para los indicadores
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.classList.add('indicators');

        // Función para mostrar el elemento actual
        const mostrarElemento = () => {
            items.forEach((item, index) => {
                item.style.display = index === currentIndex ? 'block' : 'none';
            });

            // Actualizar el estado de los indicadores
            Array.from(indicatorsContainer.children).forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        };

        // Inicializar los indicadores
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (i === currentIndex) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                currentIndex = i;
                mostrarElemento();
            });
            indicatorsContainer.appendChild(indicator);
        }

        // Inicializar el carrusel mostrando el primer elemento
        mostrarElemento();

        // Función para avanzar al siguiente elemento
        const siguiente = () => {
            soundSiguiente.currentTime = 0; // Reinicia el sonido
            soundSiguiente.play();         // Reproduce el sonido
            currentIndex = (currentIndex + 1) % totalItems;
            mostrarElemento();
        };

        // Función para retroceder al elemento anterior
        const anterior = () => {
            soundAnterior.currentTime = 0; // Reinicia el sonido
            soundAnterior.play();          // Reproduce el sonido
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            mostrarElemento();
        };

        // Crear y agregar botones de navegación
        const btnSiguiente = document.createElement('button');
        btnSiguiente.classList.add('btn', 'btn-siguiente');
        btnSiguiente.innerHTML = '&#10095;';
        btnSiguiente.addEventListener('click', siguiente);

        const btnAnterior = document.createElement('button');
        btnAnterior.classList.add('btn', 'btn-anterior');
        btnAnterior.innerHTML = '&#10094;';
        btnAnterior.addEventListener('click', anterior);

        // Insertar botones y contenedor de indicadores en el carrusel
        const carouselContainer = carousel.closest('.carousel-container');
        carouselContainer.appendChild(btnAnterior);
        carouselContainer.appendChild(btnSiguiente);
        carouselContainer.appendChild(indicatorsContainer);
    });
});


// aqui le daremos vida al buscador //////////////////////////////////////7

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    const searchInput = document.getElementById('buscador');
    const mensajeError = document.getElementById('mensajeError');
    const sugerencias = document.getElementById('sugerencias');
    const spinner = document.getElementById('spinner');
    const toggleThemeButton = document.getElementById('toggleTheme');
    const noResultsDiv = document.getElementById('no-results'); // Nuevo contenedor

    // Inicialmente ocultar mensaje de error
    mensajeError.style.display = 'none';

    // Mostrar sugerencias dinámicas
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        sugerencias.innerHTML = ''; // Limpia sugerencias previas

        if (!query) {
            sugerencias.style.display = 'none';
            return;
        }

        let suggestionsFound = false;

        carousels.forEach((carousel) => {
            const items = carousel.querySelectorAll('.carousel-item');
            items.forEach((item) => {
                const titulo = item.querySelector('.titulodepelicula').textContent.toLowerCase();

                if (titulo.includes(query)) {
                    const li = document.createElement('li');
                    li.textContent = titulo;
                    li.addEventListener('click', () => {
                        searchInput.value = titulo; // Autocompleta el buscador
                        sugerencias.style.display = 'none';
                        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); // Ejecuta la búsqueda
                    });
                    sugerencias.appendChild(li);
                    suggestionsFound = true;
                }
            });
        });

        sugerencias.style.display = suggestionsFound ? 'block' : 'none';
    });

    // Búsqueda al presionar Enter
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') { // Detectar la tecla Enter
            const query = searchInput.value.trim().toLowerCase();
            let found = false;

            if (!query) {
                mensajeError.style.display = 'block';
                mensajeError.classList.add('visible');

                // Ocultar el mensaje de error después de 4 segundos
                setTimeout(() => {
                    mensajeError.style.display = 'none';
                    mensajeError.classList.remove('visible');
                }, 2500);

                return;
            } else {
                mensajeError.style.display = 'none';
                mensajeError.classList.remove('visible');
            }

            spinner.style.display = 'block'; // Mostrar spinner

            setTimeout(() => {
                spinner.style.display = 'none'; // Ocultar spinner

                carousels.forEach((carousel) => {
                    const items = carousel.querySelectorAll('.carousel-item');
                    items.forEach((item) => {
                        const titulo = item.querySelector('.titulodepelicula').textContent.toLowerCase();

                        if (titulo.includes(query)) {
                            items.forEach((itm) => itm.style.display = 'none'); // Ocultar todos los elementos
                            item.style.display = 'block'; // Mostrar el elemento encontrado

                            const carouselContainer = carousel.closest('.carousel-container');
                            carouselContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

                            found = true;
                        }
                    });
                });

                if (!found) {
                    noResultsDiv.innerHTML = `
                        <p>No encontramos nada para "<b>${query}</b>". 😔</p>
                        <img src="https://i3.wp.com/c.tenor.com/x9-7KZEXRD4AAAAC/bob-esponja-patricio-estrella.gif" alt="No encontrado" />
                    `;
                    noResultsDiv.classList.remove('hidden');
                    noResultsDiv.style.display = 'block';

                    setTimeout(() => {
                        noResultsDiv.style.display = 'none'; // Ocultar después de unos segundos
                    }, 5000);
                }
            }, 1000); // Simula tiempo de carga
        }
    });
});



// Seleccionar todas las imágenes de todos los carruseles
const images = document.querySelectorAll('.carousel img');
const videoContainer = document.getElementById('videoContainer'); // Contenedor del video
const video = document.getElementById('video'); // Elemento de video
const videoSource = document.getElementById('videoSource'); // Fuente del video
const feedback = document.getElementById('feedback'); // Contenedor de feedback

// Añadir evento de clic a cada imagen
images.forEach(image => {
    image.addEventListener('click', function () {
        const videoFile = image.getAttribute('data-video'); // Obtener la URL del video
        if (videoFile) {
            videoSource.src = videoFile; // Asignar la fuente del video
            video.load(); // Cargar el video
            video.play(); // Reproducir el video
            videoContainer.style.display = 'block'; // Mostrar el contenedor del video
        } else {
            alert('No hay video asignado a esta imagen.');
        }
    });
});

// Botón para cerrar el video
const closeVideoButton = document.getElementById('closeVideoButton');
closeVideoButton.addEventListener('click', () => {
    video.pause(); // Pausar el video
    video.currentTime = 0; // Reiniciar el video
    videoContainer.style.display = 'none'; // Ocultar el contenedor del video
    feedback.style.display = 'none'; // Ocultar el feedback
});

// Manejador de errores para el video
video.addEventListener('error', () => {
    alert('El video no se pudo cargar.');
});

// Mostrar feedback al finalizar el video
video.addEventListener('ended', () => {
    feedback.style.display = 'block'; // Mostrar la sección de feedback
});

// Manejo de feedback
const likeButton = document.querySelector('.like');
const dislikeButton = document.querySelector('.dislike');

likeButton.addEventListener('click', () => {
    alert('¡Gracias por tu Me gusta! 😊');
    handleFeedback('like');
});

dislikeButton.addEventListener('click', () => {
    alert('Gracias por tu opinión. Mejoraremos. 😔');
    handleFeedback('dislike');
});

// Función para manejar el feedback
function handleFeedback(opinion) {
    console.log(`El usuario seleccionó: ${opinion}`); // Muestra la opinión en la consola

    // Opcional: Enviar al servidor
    // fetch('https://tu-servidor.com/guardar-feedback', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ opinion: opinion })
    // })
    // .then(response => response.json())
    // .then(data => console.log('Feedback guardado:', data))
    // .catch(error => console.error('Error al guardar el feedback:', error));

    feedback.style.display = 'none'; // Ocultar los botones después de dar feedback
}





// activa o cierra el menu lateral al achicar la pagina /////////////////////////

const menu = document.querySelector('.menu');
const btn = document.querySelector('.menu-btn');
const icon = document.querySelector('.menu-icon'); // Icono dentro del botón

btn.addEventListener('click', () => {
    menu.classList.toggle('active');

    // Cambiar el ícono según el estado del menú
    if (menu.classList.contains('active')) {
        icon.src = 'imagenes/cancelar.png'; // Ícono cuando el menú está abierto
    } else {
        icon.src = 'imagenes/menu.png'; // Ícono cuando el menú está cerrado
    }
});


    


// le da sonido a los botones   ////////////////////////////////////////////////////     

type="text/javascript">
    $(document).ready(function() {
        // Establecer volumen para todos los sonidos
        $('audio').each(function() {
            this.volume = 0.4; // Ajusta el volumen (0.0 a 1.0)
        });

        $('.menu-i').mouseup(function() {
            $('audio')[1].play();
        });

        $('.imagenpeli').mouseenter(function() {
            $('audio')[5].play();
        });

        $('.buscador-container').mouseup(function() {
            $('audio')[4].play();
        });

        $('.n').mousedown(function() {
            $('audio')[6].play();
        });
    });


