document.addEventListener('DOMContentLoaded', () => {

    /*
     * @tweakable The password to access the page.
     */
    const pagePassword = "siemprejuntos";

    // --- Password Protection Logic ---
    let CORRECT_PASSWORD_HASH = '';

    const passwordOverlay = document.getElementById('password-overlay');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const togglePasswordButton = document.getElementById('toggle-password');
    const errorMessage = document.getElementById('error-message');
    const container = document.querySelector('.container');

    // Function to hash a string using SHA-256
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    // Hash the correct password on page load so the @tweakable value is used
    hashString(pagePassword).then(hash => {
        CORRECT_PASSWORD_HASH = hash;
    });

    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const enteredPassword = passwordInput.value;
        // Ensure the correct hash has been generated before checking
        if (!CORRECT_PASSWORD_HASH) return;

        const enteredPasswordHash = await hashString(enteredPassword);

        if (enteredPasswordHash === CORRECT_PASSWORD_HASH) {
            // Correct password
            passwordOverlay.style.opacity = '0';
            setTimeout(() => {
                passwordOverlay.classList.add('hidden');
                container.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                initializeApp(); // Start the main application
            }, 500);
        } else {
            // Incorrect password
            passwordInput.classList.add('error');
            errorMessage.classList.remove('hidden');
            setTimeout(() => {
                passwordInput.classList.remove('error');
            }, 500);
            passwordInput.value = '';
        }
    });

    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Toggle icon/text
        togglePasswordButton.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // --- Main Application Logic (runs after successful login) ---
    function initializeApp() {
        /**
         * @tweakable Configuration for each card.
         * To unlock a card manually, change its 'unlockDate' to a date in the past (e.g., '2020-01-01T00:00:00').
         * You can also edit the 'content' of each letter here. The content can be HTML.
         */
        const cardConfig = [
            {
                unlockDate: '2025-06-24T23:25:00', // Card 1
                content: `<h3>Hola mi niña,</h3><p>hoy es el primer mensaje/texto que te escribo de muuuuuchos que te voy escribir, a ver tampoco son tantos en vrd. Te los escribo porq me hace mucha ilusion que veas mis mensajes cariñosos, y me gusta mucho escribirtelo porq me sirve para poder expresarme mejor y hacerte saber como estoy. Me encanta que hoy te lo hayas pasado super bien en tu primer dia del viaje, yo ya sabia que te lo ibas a pasar bien amor. Ayer era normal que no tuvieras muchas ganas porque al principio da uun poco de pereza, pero luego ya veras que va a ser uno de los viajes que mas recuerdes. Aprovecha mucho a estar con tus amigas, con tus amigos, a la gente que conoces del insti, porque el año que viene vas a empezar una nueva etapa por asi decirlo ( aunque podras seguir viendolos sabes, pero no sera igual ) quiero que te lo pases genial y que disfrtes al maximo. Si tus amigas a veces te agobian o te molestan o te picas o algo quiero que dejes de lado esas cosas porq estos viajes estan para disfrutar, no para eso. 

de verdad que amor no puedo parar de pensar en ti, no se que me pasa estos dias, pero estoy como super enamorado de ti. Es una sensacion que cada vez es mayor, es que nunca he querido a nadie como tu. No quiero ser pesado diciendote todo esto. Te quiero como a nadie enserio. Solo quiero tener en mi vida a alguien como, no quiero pasar mi adolescencia liandome con mil chicas ni estando de lios ni mierdas, lo unico que quiero es poder estar contigo. Se que tu eres la chica con la que quiero estar y la que de verdad quiero. De verdad que lo que me haces sentir no lo hace nadie. Quiero que podamos estar mejor porque estamos pasando una epoca un poco mala, a mi me esta costando mucho llevar todo y por eso muchas veces me rallo y le doy mil vueltas a todos, ya sabes como soy. Estoy intentando llevar todo lo mejor que puedo pero muchas veces es dificil no rallarse amor, y mas en una persona q le da mil vueltas a la minima cosa, entiende que quiza a veces me pase esto. Estoy trabajando en mi, en no rallarme tanto estos dias y disfrtar mas todo. 

De verdad que te quiero muchisimo, ayer cuando te di el ultimo abrazo a ldespedirnos senti como muchisimas mariposas en la barriga, no me quiero enrollar mucho, pero se que quiero estar contigo. Te quiero arantxa, daria todo lo que hiciera falta por ti. No puedo quererte mas. 

disfruta muchisimo el viaje y ya me vas contando, no quiero que sea una preocupacion para ti el escribirme, yo estos dias voy a centrarme en el gimnasio y en leer y salir con mis amigos para poder tener la mente algo mas ocupada y no pensar tanto en mil mierdas. Te quiero muchisimo, lo unico que quiero en mi vida es que seas feliz. 

no hay nadie como tu en el mundo, eres unica. mi unico deseo en la vida es poder volver a estar bien juntos</p>`
            },
            {
                unlockDate: '2025-06-25T23:40:00', // Card 2
                content: `<h3>Hola, Preciosa,</h3><p>Hoy, en nuestra segunda carta, no podía dejar de pensar en todas nuestras primeras veces. ¿Recuerdas nuestro primer viaje juntos? Esa sensación de aventura, de descubrir nuevos lugares contigo a mi lado, es algo que atesoro con todo mi ser. Cada risa compartida, cada mirada cómplice, cada mano sostenida se ha convertido en un pilar fundamental de mi felicidad. Esos recuerdos no son solo momentos pasados; son la base sobre la que construimos nuestro futuro.\n\nPienso en el futuro y me emociono. Imagino todos los lugares que aún no hemos explorado, todas las comidas que no hemos probado, todas las canciones que bailaremos. Pero lo más importante es que en cada una de esas visiones, estás tú. Mi amor por ti crece con cada recuerdo que creamos y con cada sueño que compartimos. Gracias por ser mi compañera de aventuras. No puedo esperar a crear miles de recuerdos más contigo. Te quiero hasta el infinito y más allá.</p>`
            },
            {
                unlockDate: '2025-06-26T23:40:00', // Card 3
                content: `<h3>Mi Vida,</h3><p>Hoy quiero dedicarte esta carta a ti, a la persona increíble que eres. A menudo me encuentro admirando no solo tu belleza exterior, que me deja sin aliento, sino la belleza de tu alma. Admiro tu fuerza, la forma en que enfrentas los desafíos con una valentía que me inspira. Admiro tu bondad, tu capacidad innata para cuidar de los demás y hacer del mundo un lugar un poco mejor con tu simple presencia. Admiro tu inteligencia, la forma en que tu mente funciona, tus ideas, tus pasiones.\n\nMe has enseñado tanto sobre el amor, la paciencia y la vida misma. Contigo, he aprendido a ser una mejor persona. Me motivas a ser más comprensivo, más valiente y más abierto. Ver el mundo a través de tus ojos es un regalo, porque ves la magia en las pequeñas cosas y me has enseñado a verla también. Gracias por ser exactamente como eres: perfectamente imperfecta, maravillosamente tú. Te amo por cada detalle que te conforma.</p>`
            },
            {
                unlockDate: '2025-06-27T23:40:00', // Card 4
                content: `<h3>Reina Mía,</h3><p>¿Alguna vez te he contado sobre mis sueños? No los que tengo cuando duermo, sino los que tengo con los ojos bien abiertos. Todos te incluyen. Sueño con despertar a tu lado cada mañana por el resto de mi vida, con el simple lujo de ver tu rostro ser lo primero que ilumine mi día. Sueño con construir un hogar contigo, no solo de paredes y un techo, sino un refugio lleno de risas, amor, comprensión y el aroma de café por las mañanas.\n\nSueño con viajar por el mundo contigo, pero también sueño con disfrutar de los domingos perezosos en el sofá, viendo películas sin hacer nada más. Sueño con apoyarte en tus metas y celebrar tus triunfos como si fueran míos. Sueño con sostener tu mano cuando seamos viejitos, con las mismas mariposas en el estómago que siento hoy. Eres la protagonista de todos mis planes, la pieza que le da sentido a mi futuro. Gracias por darme un futuro por el que soñar despierto. Te amo, mi amor.</p>`
            },
            {
                unlockDate: '2025-06-28T23:40:00', // Card 5
                content: `<h3>Mi Cielo,</h3><p>El mundo a veces puede ser un lugar caótico y ruidoso. Hay días llenos de estrés, de prisas, de incertidumbre. Pero luego pienso en ti, y todo se calma. Eres mi refugio, mi puerto seguro en medio de cualquier tormenta. Tu abrazo tiene el poder de disipar todas mis preocupaciones, y tu voz es la melodía que tranquiliza mi alma. En tus brazos, me siento en casa, sin importar en qué parte del mundo estemos.\n\nEsa sensación de paz que me das es uno de los regalos más preciados que he recibido. Contigo he aprendido que el amor no es solo la pasión y la emoción, sino también la calma, el apoyo y la seguridad. Eres mi ancla y mis alas. Me das la estabilidad para mantenerme firme y la confianza para volar alto. Por cada momento de paz, por cada preocupación que has aliviado, y por ser mi santuario personal, te doy las gracias desde el fondo de mi corazón. Mi amor por ti es tan sereno y profundo como la paz que me traes.</p>`
            },
            {
                unlockDate: '2025-06-29T23:40:00', // Card 6
                content: `<h3>Amor de mi vida,</h3><p>Hoy me siento abrumado por la gratitud. Agradecido por el día en que nuestros caminos se cruzaron, agradecido por cada conversación, cada risa, cada lágrima compartida. Has transformado mi mundo de maneras que nunca creí posibles. Antes de ti, mi vida era en blanco y negro, y tú llegaste con una paleta infinita de colores vibrantes y pintaste un universo nuevo para mí.\n\nEstoy agradecido por tu paciencia en mis días malos y por tu euforia en los buenos. Estoy agradecido por la forma en que me miras, como si fuera la única persona en el mundo. Prometo nunca dar por sentado tu amor. Prometo cuidarte, honrarte y amarte con cada fibra de mi ser, en los días soleados y en los nublados. Juntos, somos un equipo invencible, capaces de superar cualquier obstáculo. Eres mi todo, y mi gratitud por tenerte es tan infinita como mi amor por ti.</p>`
            },
            {
                unlockDate: '2025-06-30T23:40:00', // Card 7
                content: `<h3>Para Siempre, Mi Amor,</h3><p>Hemos llegado al final de esta semana de cartas, pero esto no es un final, sino el comienzo de un nuevo capítulo. Estas siete cartas son solo un torpe intento de poner en palabras un sentimiento que es más grande que el universo: mi amor por ti. Si cada estrella en el cielo fuera una razón por la que te amo, el cielo nocturno no sería suficiente para contarlas todas. Eres mi pasado, mi presente y, sobre todo, mi futuro.\n\nPrometo seguir escribiéndote cartas, no en una web, sino en el día a día, con mis acciones, con mi apoyo, con mi devoción. Prometo seguir demostrándote cuánto significas para mí, no solo durante una semana, sino por el resto de nuestras vidas. Eres la historia de amor que siempre quise vivir. Gracias por esta semana, gracias por tu amor, gracias por ser tú. Eres y serás siempre mi más grande y verdadero amor. Te amo, hoy y para siempre.</p>`
            }
        ];

        const cardsContainer = document.getElementById('cardsContainer');
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-letter-content');
        const closeModal = document.querySelector('.close-button');
        
        let countdownInterval;

        function createCards() {
            cardsContainer.innerHTML = ''; // Limpiar cartas existentes
            const now = new Date();
            const unlockDates = cardConfig.map(card => new Date(card.unlockDate));
            const nextUnlockIndex = unlockDates.findIndex(date => now < date);

            for (let i = 0; i < cardConfig.length; i++) {
                const unlockDate = unlockDates[i];
                const isUnlocked = now >= unlockDate;
                const card = document.createElement('div');
                card.className = 'card' + (isUnlocked ? ' unlocked' : ' locked');
                card.dataset.day = i + 1;

                const iconSrc = isUnlocked ? 'heart.png' : 'lock.png';
                let statusHTML;

                if (isUnlocked) {
                    statusHTML = `<div class="card-status">Desbloqueado</div>`;
                } else if (i === nextUnlockIndex) {
                    statusHTML = `<div class="card-status card-countdown" data-unlock-date="${unlockDate.toISOString()}"></div>`;
                } else {
                    statusHTML = `<div class="card-status">Bloqueado</div>`;
                }

                card.innerHTML = `
                    <div class="card-face card-front">
                        <img src="${iconSrc}" alt="icon" class="card-icon">
                        <div class="card-day">Día ${i + 1}</div>
                        ${statusHTML}
                    </div>
                `;
                
                if (isUnlocked) {
                    card.addEventListener('click', () => {
                        modalContent.innerHTML = cardConfig[i].content;
                        modal.style.display = 'flex';
                    });
                }

                cardsContainer.appendChild(card);
            }

            startCountdown();
        }
        
        function startCountdown() {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }

            const countdownElement = document.querySelector('.card-countdown');
            if (!countdownElement) {
                return;
            }

            const unlockDate = new Date(countdownElement.dataset.unlockDate);

            countdownInterval = setInterval(() => {
                const now = new Date();
                const timeLeft = unlockDate - now;

                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    countdownElement.innerHTML = "¡Desbloqueando!";
                    setTimeout(createCards, 1000); // Recargar cartas
                    return;
                }

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                countdownElement.innerHTML = `
                    ${days}d ${hours}h ${minutes}m ${seconds}s
                `;
            }, 1000);
        }

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        createCards();
    }
});
