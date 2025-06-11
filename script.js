document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const heroSection = document.querySelector('.hero');
    const mainContent = document.getElementById('main-content');
    const secretContent = document.getElementById('secret-content');
    const footer = document.getElementById('footer');
    const revealButton = document.getElementById('reveal-button');
    
    const countdownContainer = document.getElementById('countdown');
    const countdownTitle = document.getElementById('countdown-title');
    
    // --- DATA ALVO ---
    const countdownDate = new Date("June 11, 2025 15:30:50").getTime();

    // --- FUNÇÕES PRINCIPAIS ---

    // Função para revelar o conteúdo secreto
    function revealSecretContent() {
        // Mostra a mensagem, galeria, música e rodapé
        secretContent.classList.remove('hidden');
        footer.classList.remove('hidden');
        footer.classList.add('visible'); // Adiciona animação de fade in
        startObserver(); // Inicia as animações de scroll
    }

    // Função para atualizar a contagem regressiva
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
        } else {
            // Se o tempo acabou, para tudo e revela o site
            clearInterval(countdownInterval);
            countdownTitle.innerHTML = "Feliz Dia dos Namorados meu Amor, Te Amo !";
            countdownContainer.innerHTML = "❤️";
            countdownContainer.style.fontSize = "3rem";
            revealSecretContent();
        }
    }

    // --- LÓGICA DE INICIALIZAÇÃO ---

    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        // CENÁRIO 1: A data já passou
        heroSection.classList.add('hidden'); // Esconde a tela de abertura
        mainContent.classList.remove('hidden'); // Mostra o conteúdo principal
        countdownTitle.innerHTML = "Feliz Dia dos Namorados meu amor, Te Amo!";
        countdownContainer.innerHTML = "❤️";
        countdownContainer.style.fontSize = "3rem";
        revealSecretContent(); // Revela o conteúdo secreto imediatamente
    } else {
        // CENÁRIO 2: A data ainda não chegou
        // O botão revela apenas a contagem regressiva
        revealButton.addEventListener('click', () => {
            heroSection.style.opacity = '0';
            setTimeout(() => {
                heroSection.classList.add('hidden');
                mainContent.classList.remove('hidden'); // Mostra o main, que só tem a contagem visível
            }, 1500);
        });

        // Inicia o contador
        var countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    // --- LÓGICA DO MODAL DA GALERIA (sem alterações) ---
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const closeModal = document.querySelector('.close-button');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = image.src;
        });
    });
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == modal) modal.style.display = 'none';
    });
    
    // --- LÓGICA DE ANIMAÇÃO DE SCROLL (sem alterações) ---
    function startObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elementsToAnimate = document.querySelectorAll('.panel');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
});