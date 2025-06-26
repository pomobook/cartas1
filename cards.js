/*
 * This file manages the main application logic after login:
 * creating the letter cards, handling unlocking, countdowns, and the modal view.
 */

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
                content: `<h3>Hola, Preciosa,</h3><p>No se si estas leyendo mis cartas pero igualmente las puedes leer cuando quieras. Hoy ya es el segundo texto de 7. Mi niña espero que te lo estes pasando super bien en este viaje, quiero que disfrutes al maximo todo mi amor. Ya sabes que lo unico que quiero en la vida es que seas feliz, es lo que unico que quiero. Para mi estan siendo dias dificiles porque aunque solo llevemos 2 dias sin vernos, para mi es una eternidad jajaja, tengo muchisimas ganas de verte, no paro de pensar en ti amor. siento que estoy super enamorado de ti.

Me esta ayudando mucho no hablar tanto en realidad, porque siento que no estoy teniendo tanta dependencia en hablar todo el rato, siento que antes dependia un poco en ello y creo que no era sano. siento que no hace falta q estemos hablando todo el rato para poder estar juntos y enamorados. De verdad mi niña que te quiero muchisimo.

Hoy he estado mucho mejor que ayer, ayer la verdad que me ralle muuuucho, pero hoy he estado mejor, con mis amigos en la piscina y eso, eso me ayuda mazo a tener la mente ocupada y estar mejor.

Cuando hable con Rial de lo de su novia por la noche me ralle mazo. Pero porque hoy en dia es como que es super dificil tener a una persona que te quiera de verdad y que quiera estar contigo, es como que esta de moda irse con mil chicos a la vez y poner los cuernos mil veces. Yo amor ya sabes que confio en ti, aunque hay veces que tengo bajones de autoestima y eso hace q me ralle un poco, pero yo se que no lo harias. De todas formas, algo que quiero decir, es que si lo haces o si te empieza a gustar o a molar alguien, quiero que me lo digas, creo que es mejor decir las cosas antes que ocultarlas, ya que puede ser peor. Lo mas importante en una relacion me parece la comunicacion y es algo que tenemos que ir arreglando con el tiempo.

Cada dia que pasa te quiero mas, eres la niña con la que siempre soñe, espero que poco a poco podamos seguir mejorando. Te quiero como a nadie enserio, daria todo lo que fuera por ti. No se como expresarte todo lo que te quiero enserio, es que estoy super enamorad (siento que fueran como los primeros dias jajajaj) Tengo mazo sentimientos y no paro de pensar en ti.</p>`
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

// DOM elements for the cards and modal
const cardsContainer = document.getElementById('cardsContainer');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-letter-content');
const closeModalButton = modal.querySelector('.close-button');

let countdownInterval;

function openModal(content) {
    modalContent.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Dynamically creates and renders the cards based on their unlock status
function createCards() {
    cardsContainer.innerHTML = ''; // Clear existing cards
    const now = new Date();
    const unlockDates = cardConfig.map(card => new Date(card.unlockDate));
    const nextUnlockIndex = unlockDates.findIndex(date => now < date);

    cardConfig.forEach((config, i) => {
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
            card.addEventListener('click', () => openModal(config.content));
        }

        cardsContainer.appendChild(card);
    });

    startCountdown(); // (Re)start the countdown for the next card
}

// Manages the countdown timer for the next unlockable card
function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const countdownElement = document.querySelector('.card-countdown');
    if (!countdownElement) return;

    const unlockDate = new Date(countdownElement.dataset.unlockDate);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = unlockDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "¡Desbloqueando!";
            setTimeout(createCards, 1000); // Rerender cards after a short delay
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

/**
 * Initializes the main card-based application.
 */
export function initCards() {
    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    createCards();
}
