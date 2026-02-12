window.onload = () => {
    // BOTÓN SALTAR
    const skipBtn = document.getElementById("skip-button");
    skipBtn.addEventListener("click", () => {
        // Ocultar heartbeat y video
        heartbeatIntro.style.display = "none";
        videoLayer.style.display = "none";

        // Detener audios
        stopAllYearAudios();
        heartbeat.pause();
        flatline.pause();
        tapeDistortion.pause();
        tapeReproducer.pause();
        breathing.pause();

        // Mostrar chat directo
        startValentineChat();
    });


    /* =========================
       ELEMENTOS
    ========================= */
    const glass = document.getElementById("glass-tv");
    const circle = document.getElementById("crt-circle");
    const bars = document.getElementById("bars");
    const videoLayer = document.getElementById("video-layer");
    const video = document.getElementById("bg-video");
    const final = document.getElementById("final");
    const title = final.querySelector("h1");

    const heartbeatIntro = document.getElementById("heartbeat-intro");
    const hbImg1 = document.getElementById("hb-img-1");
    const hbImg2 = document.getElementById("hb-img-2");
    const hbLine = document.getElementById("heartbeat-line");
    const hbText = document.getElementById("hb-text");

    video.muted = true;

    let showTimeout, hideTimeout, videoTimeout;
    let fadeInterval = null;
    const FADE_DURATION = 800; // ms (puedes cambiarlo)
    const VIDEO_DURATION = 8000;      // duración real del video
    const AUDIO_FADE_OUT_AT = 7600;

    /* =========================
       SONIDOS
    ========================= */

    const flatline = new Audio("beep.mp3");
    flatline.volume = 0.08;

    const heartbeat = new Audio("latido.mp3");
    heartbeat.volume = 1;

    const tapeDistortion = new Audio("tape_distortion.mp3");
    tapeDistortion.volume = 0.05;

    const tapeReproducer = new Audio("tape_play.mp3");
    tapeReproducer.volume = 0.7;

    const breathing = new Audio("respiracion.mp3");
    breathing.volume = 0.25;

    const AUDIO_LEVELS = {
        coro: 0.05,
        a2024: 0.20,
        a2025: 0.18,
        a2026: 0.22
    };


    const yearAudios = [
        new Audio("coro.mp3"),
        new Audio("audio2024.mp3"),
        new Audio("audio2025.mp3"),
        new Audio("audio2026.mp3")
    ];

    yearAudios[0].maxVolume = AUDIO_LEVELS.coro;
    yearAudios[1].maxVolume = AUDIO_LEVELS.a2024;
    yearAudios[2].maxVolume = AUDIO_LEVELS.a2025;
    yearAudios[3].maxVolume = AUDIO_LEVELS.a2026;


    /* =========================
       IMÁGENES HEARTBEAT
    ========================= */
    const heartbeatImages = [
        "img1.jpeg",
        "img2.jpeg",
        "img3.jpeg",
        "img4.jpeg",
        "img5.jpeg",
        "img6.jpeg",
        "img7.jpeg",
        "img8.jpeg",
        "img9.jpeg",
        "img10.jpeg",
    ];

    let hbIndex = 0;

    /* =========================
       VIDEOS
    ========================= */
    const videos = [
        { src: "vid.mp4", text: "2023" },
        { src: "vid2.mp4", text: "2024" },
        { src: "vid3.mp4", text: "2025" },
        { src: "vid4.mp4", text: "2026" }
    ];

    const shutdownVideo = "apagado.mp4";

    let index = 0;

    /* =========================
       ESTADO INICIAL
    ========================= */
    bars.style.display = "none";
    videoLayer.style.display = "none";
    final.style.opacity = "0";

    /* =========================
       ❤️ INICIO HEARTBEAT
    ========================= */
    startFlatlineIntro();
    function startFlatlineIntro() {

        hbImg1.style.display = "none";
        hbImg2.style.display = "none";
        document.querySelector(".heartbeat-text").style.opacity = "0";

        hbLine.style.opacity = "1";
        hbLine.style.transition = "none";
        hbLine.style.transform = "translateX(-100%)";

        flatline.currentTime = 0;
        flatline.play().catch(() => { });

        /* ▶️ AVANCE LENTO (2.8s) */
        setTimeout(() => {
            hbLine.style.transition = "transform 2.8s linear";
            hbLine.style.transform = "translateX(0%)";
        }, 50);

        /* ⏳ A los 2.2s empieza a retroceder suave */
        setTimeout(() => {
            hbLine.style.transition = "transform 2s ease-out";
            hbLine.style.transform = "translateX(-8%)";
        }, 2000);

        /* 🌫 Se desvanece muy lentamente */
        setTimeout(() => {
            hbLine.style.transition = "opacity 1.2s ease-out";
            hbLine.style.opacity = "0";
        }, 2800);

        /* ❤️ Inicia latidos */
        setTimeout(() => {
            startHeartbeatIntro();
        }, 4000);
    }


    function startHeartbeatIntro() {

        hbImg1.style.display = "block";
        hbImg2.style.display = "block";
        document.querySelector(".heartbeat-text").style.opacity = "1";

        heartbeat.currentTime = 0;
        heartbeat.play().catch(() => { });

        const totalDuration = 10000; // 10s
        const extraPause = 1000;     // pausa final

        let time = 0;
        let imgIndex = 0;

        function nextCycle() {

            if (time >= totalDuration || imgIndex >= heartbeatImages.length) {

                // fundido lento
                heartbeatIntro.style.transition = "opacity 1s ease-out";
                heartbeatIntro.style.opacity = "0";

                setTimeout(() => {
                    heartbeatIntro.style.display = "none";
                    startCRTSequence();
                }, 1000);

                return;
            }

            /* PREPARAR */
            hbImg1.src = heartbeatImages[imgIndex];
            hbImg2.src = heartbeatImages[imgIndex + 1];

            hbImg1.className = "";
            hbImg2.className = "";

            hbImg1.style.visibility = "visible";
            hbImg2.style.visibility = "visible";

            /* ❤️ TUM 1 */
            setTimeout(() => {
                hbImg1.classList.add("beat");
            }, 250);

            /* ❤️ TUM 2 */
            setTimeout(() => {
                hbImg2.classList.add("beat");
            }, 500);

            /* 💨 DESVANECER */
            setTimeout(() => {
                hbImg1.classList.remove("beat");
                hbImg2.classList.remove("beat");

                hbImg1.classList.add("fade");
                hbImg2.classList.add("fade");
            }, 900);

            /* NEGRO LIMPIO */
            setTimeout(() => {
                hbImg1.style.visibility = "hidden";
                hbImg2.style.visibility = "hidden";
                hbImg1.className = "";
                hbImg2.className = "";
            }, 1000);

            imgIndex += 2;
            time += 2000;

            setTimeout(nextCycle, 2000);
        }


        nextCycle();
    }

    /* =========================
       CRT + BARRAS
    ========================= */
    function startCRTSequence() {


        /* 🔊 Respiración normal */
        breathing.currentTime = 0;
        breathing.play().catch(() => { });

        const reviveLight = document.getElementById("revive-light");

        setTimeout(() => {
            reviveLight.classList.remove("active"); // reset
            void reviveLight.offsetWidth;           // reinicia animación
            reviveLight.classList.add("active");
        }, 1000);


        /* 📺 Mostrar barras (MISMO MOMENTO que antes: 1300ms) */
        setTimeout(() => {
            circle.style.display = "none";
            glass.style.display = "none";

            bars.style.display = "block";
            bars.style.opacity = "0";
            bars.style.transition = "opacity 0.6s ease-in-out";

            requestAnimationFrame(() => {
                bars.style.opacity = "1";
            });

            /* 🔊 Distorsión exactamente donde estaba */
            tapeDistortion.currentTime = 0;
            tapeDistortion.play().catch(() => { });

        }, 2800);

        /* ⏳ Mantiene EXACTAMENTE los 5300ms originales */
        setTimeout(() => {

            bars.style.transition = "opacity 0.8s ease-in-out";
            bars.style.opacity = "0";

            /* 🔇 apagar distorsión junto con las barras */
            fadeOutAudio(tapeDistortion, 800);

            setTimeout(() => {
                tapeDistortion.pause();
                tapeDistortion.currentTime = 0;

                bars.style.display = "none";
                playTransition(playMainVideo);
            }, 800);

        }, 5300);
    }


    /* =========================
       TRANSICIÓN
    ========================= */
    function playTransition(callback) {
        ocultarTexto();
        videoLayer.style.display = "block";

        tapeReproducer.currentTime = 0;
        tapeReproducer.play().catch(() => { });

        playVideo("transition2.mp4", null, false, 750, callback);
    }

    /* =========================
       VIDEOS PRINCIPALES
    ========================= */

    function fadeInAudio(audio, duration = FADE_DURATION) {
        clearInterval(fadeInterval);

        const targetVolume = audio.maxVolume ?? 1;

        audio.volume = 0;
        audio.play().catch(() => { });

        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = targetVolume / steps;

        fadeInterval = setInterval(() => {
            if (audio.volume < targetVolume) {
                audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
            } else {
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }


    function fadeOutAudio(audio, duration = FADE_DURATION) {
        if (!audio || audio.paused) return;

        clearInterval(fadeInterval);

        const startVolume = audio.volume;
        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = startVolume / steps;

        fadeInterval = setInterval(() => {
            if (audio.volume > 0) {
                audio.volume = Math.max(0, audio.volume - volumeStep);
            } else {
                audio.pause();
                audio.currentTime = 0;
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }




    function stopAllYearAudios() {
        yearAudios.forEach(audio => {
            fadeOutAudio(audio);
        });
    }


    function playYearAudio(index) {
        stopAllYearAudios();

        const audio = yearAudios[index];
        if (audio) {
            fadeInAudio(audio);
        }
    }

    function playMainVideo() {
        if (index >= videos.length) return;

        const { src, text } = videos[index];
        videoLayer.style.display = "block";

        // 🔊 AUDIO DEL AÑO
        playYearAudio(index);

        playVideo(src, text, true, VIDEO_DURATION, () => {

            stopAllYearAudios();

            index++;

            // 🔥 SI YA TERMINÓ 2026
            if (index >= videos.length) {

                // 🎬 Transición extra
                playTransition(() => {

                    // 📺 Video final apagado
                    playVideo(shutdownVideo, null, false, 3000, () => {
                        videoLayer.style.transition = "transform 0.6s ease, opacity 0.6s ease";
                        videoLayer.style.transform = "scaleY(0.02)";
                        videoLayer.style.opacity = "0";

                        setTimeout(() => {
                            startValentineChat();
                        }, 1200);
                    });

                });

            } else {
                playTransition(playMainVideo);
            }
        });

        // ⏳ Fade out del audio antes de terminar
        setTimeout(() => {
            stopAllYearAudios();
        }, AUDIO_FADE_OUT_AT);
    }


    video.onpause = () => {
        stopAllYearAudios();
    };

    function playVideo(src, texto, mostrarTexto, durationMs, onFinish) {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        clearTimeout(videoTimeout);

        ocultarTexto();

        /* =========================
           🎬 MODO DE PANTALLA
           SOLO APAGADO = FULLSCREEN
        ========================= */
        if (src === shutdownVideo) {
            // 📺 APAGADO → fullscreen + audio activado
            videoLayer.classList.add("fullscreen");
            video.muted = false;
            video.volume = 1;

        } else {
            // 🎬 AÑOS → modo cine + sin audio del video
            videoLayer.classList.remove("fullscreen");
            video.muted = true;
        }

        video.pause();
        video.src = src;
        video.load();

        video.onloadeddata = () => {
            video.currentTime = 0;
            video.play().catch(() => { });

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


    /* =========================
       TEXTO FINAL
    ========================= */
    function mostrarTextoFinal(texto) {
        title.textContent = texto;
        final.style.opacity = "1";
    }

    function ocultarTexto() {
        final.style.opacity = "0";
    }
};
function startValentineChat() {

    const section = document.getElementById("valentine-section");
    if (!section) return;

    document.body.classList.add("mac-screen-active");

    const messages = [
        { id: "msg1", text: "Desde que te conocí, muchas cosas cambiaron." },
        { id: "msg2", text: "No fue algo exagerado, fue en lo cotidiano." },
        { id: "msg3", text: "Este sería ya nuestro tercer San Valentín juntos." },
        { id: "msg4", text: "Y me doy cuenta de lo importantes que se volvieron esos momentos." },
        { id: "msg5", text: "Pequeños detalles… pero significan mucho para mí." }
    ];

    section.style.display = "flex";

    const reply = document.getElementById("reply");
    reply.textContent = "";

    // limpiar mensajes
    messages.forEach(msg => {
        const el = document.getElementById(msg.id);
        el.textContent = "";
        el.parentElement.style.display = "none";
    });

    reply.parentElement.style.display = "none";

    function typeMessage(elementId, text, callback) {

        const el = document.getElementById(elementId);
        if (!el) return;

        const container = el.parentElement;
        container.style.display = "block";

        // Mostrar "escribiendo..." dentro del mensaje
        el.innerHTML = `
            <span class="writing-text">
                escribiendo<span class="dots">...</span>
            </span>
        `;

        // Tiempo de "escribiendo..."
        setTimeout(() => {
            el.textContent = text;
            waMessages.scrollTop = waMessages.scrollHeight;
            if (callback) setTimeout(callback, 700);
        }, 1200);
    }


    function showNextMessage(index) {
        if (index >= messages.length) {
            showReply();
            return;
        }

        typeMessage(messages[index].id, messages[index].text, () => {
            showNextMessage(index + 1);
        });
    }

    function showReply() {
        const input = document.getElementById("chatInput");
        input.focus();
        input.value = "";

        let text = "Claro que sí.";
        let i = 0;

        const typing = setInterval(() => {
            input.value += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(typing);
                

            }

            // ⬇️ AQUÍ VA EL CAMBIO DE CHECK A AZUL
            setTimeout(() => {
                const check = replyContainer.querySelector("i");
                if (check) {
                    check.classList.add("read");
                }
            }, 2000);
        }, 40);
    }


    setTimeout(() => {
        showNextMessage(0);
    }, 800);
}

function scrollToBottom() {
    const anchor = document.getElementById("chat-anchor");
    if (anchor) {
        anchor.scrollIntoView({ behavior: "instant" });
    }
}


const input = document.getElementById("chatInput");
const messagesBox = document.getElementById("waMessages");

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        const msg = document.createElement("div");
        msg.className = "message sent";
        msg.innerHTML = `
            <p>${text}</p>
            <span class="msg-meta">
                <span class="msg-time">${time}</span>
                <i class="fa-solid fa-check"></i>
            </span>
        `;

        messagesBox.appendChild(msg);
        input.value = "";

        // scroll abajo
        requestAnimationFrame(() => {
            messagesBox.scrollTop = messagesBox.scrollHeight;
        });

        // ✔ segundo check (entregado)
        setTimeout(() => {
            const icon = msg.querySelector("i");
            icon.className = "fa-solid fa-check-double";
        }, 500);

        // ✔✔ azul (leído)
        setTimeout(() => {
            const icon = msg.querySelector("i");
            icon.classList.add("read");
        }, 1000);
    }
});
