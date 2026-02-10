window.onload = () => {
    const glass = document.getElementById("glass-tv");
    const circle = document.getElementById("crt-circle");
    const bars = document.getElementById("bars");
    const videoLayer = document.getElementById("video-layer");
    const video = document.getElementById("bg-video");
    const final = document.getElementById("final");
    const title = final.querySelector("h1");

    video.muted = true;

    let showTimeout, hideTimeout, videoTimeout;

    /* =========================
       SONIDOS
    ========================= */
    const tapeDistortion = new Audio("tape_distortion.mp3");
    tapeDistortion.volume = 0.6;

    const tapeReproducer = new Audio("tape_play.mp3");
    tapeReproducer.volume = 0.7;

    /* =========================
       VIDEOS
    ========================= */
    const videos = [
        { src: "vid.mp4", text: "2023" },
        { src: "vid2.mp4", text: "2024" },
        { src: "vid3.mp4", text: "2025" },
        { src: "vid4.mp4", text: "2026" }
    ];

    let index = 0;

    bars.style.display = "none";
    videoLayer.style.display = "none";
    final.style.opacity = "0";

    /* =========================
       ENCENDIDO CRT
    ========================= */
    setTimeout(() => {
        circle.style.transition = "clip-path 1.6s ease-out";
        circle.style.clipPath = "circle(150% at 50% 50%)";
    }, 2500);

    /* =========================
       BARRAS (4s)
    ========================= */
    setTimeout(() => {
        circle.style.display = "none";
        glass.style.display = "none";
        bars.style.display = "block";

        tapeDistortion.currentTime = 0;
        tapeDistortion.play().catch(() => {});
    }, 3300);

    /* =========================
       TRANSICIÓN INICIAL
    ========================= */
    setTimeout(() => {
        bars.style.display = "none";
        playTransition(playMainVideo);
    }, 7300);

    /* =========================
       FUNCIONES
    ========================= */

    function playTransition(callback) {
        ocultarTexto();
        videoLayer.style.display = "block";

        tapeReproducer.currentTime = 0;
        tapeReproducer.play().catch(() => {});

        playVideo("transition2.mp4", null, false, 750, callback); // ⬅ 0.75s
    }

    function playMainVideo() {
        if (index >= videos.length) return;

        const { src, text } = videos[index];
        videoLayer.style.display = "block";

        playVideo(src, text, true, 8000, () => { // ⬅ 8s
            index++;
            if (index < videos.length) {
                playTransition(playMainVideo);
            }
        });
    }

    function playVideo(src, texto, mostrarTexto, durationMs, onFinish) {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        clearTimeout(videoTimeout);

        ocultarTexto();

        video.pause();
        video.src = src;
        video.load();

        video.onloadeddata = () => {
            video.currentTime = 0;
            video.play().catch(() => {});

            if (mostrarTexto && texto) {
                showTimeout = setTimeout(() => {
                    mostrarTextoFinal(texto);
                }, 500);

                hideTimeout = setTimeout(() => {
                    ocultarTexto();
                }, durationMs - 500);
            }

            videoTimeout = setTimeout(() => {
                video.pause();
                if (onFinish) onFinish();
            }, durationMs);
        };
    }

    function mostrarTextoFinal(texto) {
        title.textContent = texto;
        final.style.opacity = "1";
    }

    function ocultarTexto() {
        final.style.opacity = "0";
    }
};
