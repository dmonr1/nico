window.onload = () => {
   
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
    const FADE_DURATION = 800; 
    const VIDEO_DURATION = 8000;      
    const AUDIO_FADE_OUT_AT = 7900;

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
        coro: 0.2,
        coro2: 0.20,
        coro3: 0.18,
        coro4: 0.22
    };

    const yearAudios = [
        new Audio("coro.mp3"),
        new Audio("coro2.mp3"),
        new Audio("coro3.mp3"),
        new Audio("coro4.mp3")
    ];

    yearAudios[0].maxVolume = AUDIO_LEVELS.coro;
    yearAudios[1].maxVolume = AUDIO_LEVELS.coro2;
    yearAudios[2].maxVolume = AUDIO_LEVELS.coro3;
    yearAudios[3].maxVolume = AUDIO_LEVELS.coro4;

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

    const videos = [
        { src: "vid.mp4", text: "2023" },
        { src: "vid2.mp4", text: "2024" },
        { src: "vid3.mp4", text: "2025" },
        { src: "vid4.mp4", text: "2026" }
    ];

    const shutdownVideo = "apagado.mp4";

    let index = 0;

    bars.style.display = "none";
    videoLayer.style.display = "none";
    final.style.opacity = "0";

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

        setTimeout(() => {
            hbLine.style.transition = "transform 2.8s linear";
            hbLine.style.transform = "translateX(0%)";
        }, 50);

        setTimeout(() => {
            hbLine.style.transition = "transform 2s ease-out";
            hbLine.style.transform = "translateX(-8%)";
        }, 2000);

        setTimeout(() => {
            hbLine.style.transition = "opacity 1.2s ease-out";
            hbLine.style.opacity = "0";
        }, 2800);

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

        const totalDuration = 10000; 
        const extraPause = 1000;     

        let time = 0;
        let imgIndex = 0;

        function nextCycle() {

            if (time >= totalDuration || imgIndex >= heartbeatImages.length) {

                heartbeatIntro.style.transition = "opacity 1s ease-out";
                heartbeatIntro.style.opacity = "0";

                setTimeout(() => {
                    heartbeatIntro.style.display = "none";
                    startCRTSequence();
                }, 1000);

                return;
            }

            hbImg1.src = heartbeatImages[imgIndex];
            hbImg2.src = heartbeatImages[imgIndex + 1];

            hbImg1.className = "";
            hbImg2.className = "";

            hbImg1.style.visibility = "visible";
            hbImg2.style.visibility = "visible";

            setTimeout(() => {
                hbImg1.classList.add("beat");
            }, 250);

            setTimeout(() => {
                hbImg2.classList.add("beat");
            }, 500);

            setTimeout(() => {
                hbImg1.classList.remove("beat");
                hbImg2.classList.remove("beat");

                hbImg1.classList.add("fade");
                hbImg2.classList.add("fade");
            }, 900);

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

    function startCRTSequence() {

        breathing.currentTime = 0;
        breathing.play().catch(() => { });

        const reviveLight = document.getElementById("revive-light");

        setTimeout(() => {
            reviveLight.classList.remove("active"); 
            void reviveLight.offsetWidth;           
            reviveLight.classList.add("active");
        }, 1000);

        setTimeout(() => {
            circle.style.display = "none";
            glass.style.display = "none";

            bars.style.display = "block";
            bars.style.opacity = "0";
            bars.style.transition = "opacity 0.6s ease-in-out";

            requestAnimationFrame(() => {
                bars.style.opacity = "1";
            });

            tapeDistortion.currentTime = 0;
            tapeDistortion.play().catch(() => { });

        }, 2800);

        setTimeout(() => {

            bars.style.transition = "opacity 0.8s ease-in-out";
            bars.style.opacity = "0";

            fadeOutAudio(tapeDistortion, 800);

            setTimeout(() => {
                tapeDistortion.pause();
                tapeDistortion.currentTime = 0;

                bars.style.display = "none";
                playTransition(playMainVideo);
            }, 800);

        }, 5300);
    }

    function playTransition(callback) {
        ocultarTexto();
        videoLayer.style.display = "block";

        tapeReproducer.currentTime = 0;
        tapeReproducer.play().catch(() => { });

        playVideo("transition2.mp4", null, false, 750, callback);
    }

    function fadeInAudio(audio, duration = FADE_DURATION) {
        if (!audio) return;

        clearInterval(fadeInterval);

        const targetVolume = audio.maxVolume ?? 1;

        if (!audio.paused) return; 

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

        playYearAudio(index);

        playVideo(src, text, true, VIDEO_DURATION, () => {

            stopAllYearAudios();

            index++;

            if (index >= videos.length) {

                playTransition(() => {

                    playVideo(shutdownVideo, null, false, 3000, () => {

                        videoLayer.style.opacity = "0";

                        setTimeout(() => {
                            showMacLogin();
                        }, 1200);
                    });

                });

            } else {
                playTransition(playMainVideo);
            }
        });
    }

    function playVideo(src, texto, mostrarTexto, durationMs, onFinish) {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        clearTimeout(videoTimeout);

        ocultarTexto();

        if (src === shutdownVideo) {
            videoLayer.classList.add("fullscreen");
            video.muted = false;
            video.volume = 1;

        } else {
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

    function mostrarTextoFinal(texto) {
        title.textContent = texto;
        final.style.opacity = "1";
    }

    function ocultarTexto() {
        final.style.opacity = "0";
    }
};

function showMacLogin() {

    const login = document.getElementById("mac-login");
    const input = document.getElementById("loginPassword");
    const arrow = document.getElementById("loginArrow");
    const macBoot = new Audio("encendido.mp3");
    macBoot.volume = 0.3;
    macBoot.play().catch(() => { });

    login.style.display = "block";
    login.classList.add("active");
    input.focus();

    function unlock() {

        const blur = document.getElementById("loginBlur");
        const ui = document.getElementById("loginUI");

        ui.classList.add("fade");

        setTimeout(() => {
            blur.classList.add("unblur");
        }, 400);


        setTimeout(() => {
            const section = document.getElementById("valentine-section");
            section.classList.add("active");
            startValentineChat();
        }, 700);
        setTimeout(() => {
            login.style.display = "none";
        }, 900);
    }

    arrow.addEventListener("click", unlock);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            unlock();
        }
    });
}

function startValentineChat() {

    const wspSound = new Audio("wsp-mensaje.mp3");
    wspSound.volume = 0.2;
    wspSound.preload = "auto";

    const section = document.getElementById("valentine-section");
    if (!section) return;

    document.body.classList.add("mac-screen-active");

    const messages = [
        { id: "msg1", text: "Han pasado casi tres años desde que empezamos a conocernos." },
        { id: "msg2", text: "Y sin darme cuenta, te volviste parte de mi día a día… de lo simple y de lo importante." },
        { id: "msg3", text: "Este ya sería nuestro tercer San Valentín juntos." },
        { id: "msg4", text: "Y me pongo a pensar en todo lo que hemos vivido desde aquel primer dia." },
        { id: "msg5", text: "No son solo fechas, son momentos, recuerdos y una historia que hemos construido poco a poco." },
        {
            id: "msg6", text: "No se trata solo de una fecha, ni de una tradición. Se trata de nosotros. De lo que hemos construido durante casi tres años, de cada risa, cada abrazo y cada momento compartido. Por eso hoy quiero preguntarte con el corazón en la mano… ¿quieres ser mi San Valentín este año? 🌹💘"
        }

    ];

    const reply = document.getElementById("reply");
    reply.textContent = "";

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

        setTimeout(() => {

            requestAnimationFrame(() => {

                el.innerHTML = `
                    <span class="writing-text">
                        escribiendo<span class="dots">...</span>
                    </span>
                `;

                setTimeout(() => {

                    el.textContent = text;

                    wspSound.currentTime = 0;
                    wspSound.play().catch(err => console.log("Audio bloqueado:", err));
                    requestAnimationFrame(() => {
                        waMessages.scrollTop = waMessages.scrollHeight;
                    });

                    if (callback) {
                        setTimeout(callback, 800);
                    }

                }, 2500);

            });

        }, 0);
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
    }, 2500);
}

function scrollToBottom() {
    const anchor = document.getElementById("chat-anchor");
    if (anchor) {
        anchor.scrollIntoView({ behavior: "instant" });
    }
}

const input = document.getElementById("chatInput");
const messagesBox = document.getElementById("waMessages");

function isYesResponse(text) {
    const normalized = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    const YES_KEYWORDS = [
        "si",
        "sí",
        "claro",
        "acepto",
        "obvio",
        "por supuesto",
        "me encantaria",
        "siii",
        "claro que si"
    ];

    return YES_KEYWORDS.some(word =>
        normalized === word || normalized.startsWith(word + " ")
    );
}

function sendAutoLoveMessage() {

    const messagesBox = document.getElementById("waMessages");

    const wspSound = new Audio("wsp-mensaje.mp3");
    wspSound.volume = 0.25;
    wspSound.preload = "auto";

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const msg = document.createElement("div");
    msg.className = "message received";
    msg.innerHTML = `
        <p>
            Como siempre escoges bien, hoy celebramoooooos<br>
            <br>
        </p>
        <span class="msg-meta">
            <span class="msg-time">${time}</span>
        </span>
    `;

    messagesBox.appendChild(msg);

    requestAnimationFrame(() => {
        wspSound.currentTime = 0;
        wspSound.play().catch(() => { });
        messagesBox.scrollTop = messagesBox.scrollHeight;
    });
}

function sendVideoPreviewMessage() {

    const messagesBox = document.getElementById("waMessages");

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const msg = document.createElement("div");
    msg.className = "message received";

    msg.innerHTML = `
        
        <div class="video-preview">
            <img src="img5.jpeg" class="video-thumb">
            <div class="play-button">
                <i class="fa-solid fa-play"></i>
            </div>
        </div>

        <span class="msg-meta">
            <span class="msg-time">${time}</span>
        </span>
    `;

    messagesBox.appendChild(msg);

    requestAnimationFrame(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    });
}

chatInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        const text = chatInput.value.trim();
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
        chatInput.value = "";

        requestAnimationFrame(() => {
            messagesBox.scrollTop = messagesBox.scrollHeight;
        });

        setTimeout(() => {
            msg.querySelector("i").className = "fa-solid fa-check-double";
        }, 500);

        setTimeout(() => {
            msg.querySelector("i").classList.add("read");
        }, 1000);

        if (isYesResponse(text)) {

            setTimeout(() => {
                sendAutoLoveMessage();

                setTimeout(() => {
                    sendVideoPreviewMessage();
                }, 1800);

            }, 1200);
        }
    }
});

const preview = document.getElementById('bg-video');
const cinemaMode = document.getElementById('cinemaMode');
const cinemaImage = document.getElementById('cinemaImage');

const images = [
    "collage/1.jpg",
    "collage/2.jpg",
    "collage/3.jpg",
    "collage/4.jpg"
];

document.addEventListener("click", e => {

    const preview = e.target.closest(".video-preview");
    if (!preview) return;

    launchFinalCinema();
});

function launchFinalCinema() {

    const cinema = document.getElementById("cinemaFinal");
    const img = document.getElementById("cinemaFinalImage");
    const music = document.getElementById("finalMusic");

    const images = [
        "collage/foto_1.jpeg",
        "collage/foto_2.jpeg",
        "collage/foto_3.jpeg",
        "collage/foto_4.jpeg",
        "collage/foto_5.jpg",
        "collage/foto_6.jpeg",
        "collage/foto_7.jpeg",
        "collage/foto_8.jpeg",
        "collage/foto_9.jpg",
        "collage/foto_10.jpg",
        "collage/foto_11.jpg",
        "collage/foto_12.jpeg",
        "collage/foto_13.jpeg",
        "collage/foto_14.jpeg",
        "collage/foto_15.jpeg",
        "collage/foto_16.jpeg",
        "collage/foto_17.jpeg",
        "collage/foto_18.jpeg",
        "collage/foto_19.jpeg",
        "collage/foto_20.jpeg",
        "collage/foto_21.jpeg",
        "collage/foto_22.jpeg",
        "collage/foto_23.jpeg",
        "collage/foto_24.jpeg",
        "collage/foto_25.jpeg",
        "collage/foto_26.jpeg",
        "collage/foto_27.jpeg",
        "collage/foto_28.jpeg",
        "collage/foto_29.jpeg",
        "collage/foto_30.jpeg",
        "collage/foto_31.jpeg",
        "collage/foto_32.jpeg",
        "collage/foto_33.jpeg",
        "collage/foto_34.jpeg",
        "collage/foto_35.jpeg",
        "collage/foto_36.jpg",
        "collage/foto_37.jpg",
        "collage/foto_38.jpeg",
        "collage/foto_39.jpg",
        "collage/foto_40.jpeg",
        "collage/foto_41.jpg",
        "collage/foto_42.jpeg"
    ];

    cinema.classList.add("active");

    music.currentTime = 0;
    music.volume = 0;
    music.play().catch(() => { });

    const lyrics = document.getElementById("lyrics");
    const lyricsSub = document.getElementById("lyricsSub");

    const lyricsTimeline = [
        {
            start: 0, end: 6,
            text: "Ain't no sunshine when she's gone",
            sub: "(Cuando ella se va, no sale el Sol)"
        },

        {
            start: 7, end: 11,
            text: "It's not warm when she's away",
            sub: "(No hace calor cuando ella está lejos)"
        },

        {
            start: 13, end: 19,
            text: "Ain't no sunshine when she's gone, and she's always gone too long",
            sub: "(Cuando ella se va, no sale el Sol y ella siempre está fuera por mucho tiempo)"
        },

        {
            start: 19.5, end: 24,
            text: "Anytime she goes away",
            sub: "(Cada vez que se va)"
        },

        {
            start: 25, end: 29,
            text: "Wonder this time where she's gone",
            sub: "(Me pregunto a dónde habrá ido esta vez)"
        },

        {
            start: 31, end: 36,
            text: "Wonder if she's gone to stay",
            sub: "(Me pregunto si se ha ido a quedarse)"
        },

        {
            start: 38, end: 44,
            text: "Ain't no sunshine when she's gone, and this house just ain't no home",
            sub: "(No sale el Sol cuando ella se va y esta casa ya no es más un hogar)"
        },

        {
            start: 44.5, end: 48,
            text: "Anytime she goes away",
            sub: "(Cada vez que ella se va)"
        },

        {
            start: 50, end: 53,
            text: "And I know, I know, I know, I know",
            sub: "(Y lo sé, lo sé, lo sé, lo sé)"
        },

        {
            start: 53, end: 57,
            text: "I know, I know, I know, I know, I know",
            sub: "(Lo sé, lo sé, lo sé, lo sé)"
        },

        {
            start: 57, end: 59,
            text: "I know, I know, I know, I know, I know",
            sub: "(Lo sé, lo sé, lo sé, lo sé)"
        },

        {
            start: 59, end: 61,
            text: "I know, I know, I know, I know, I know",
            sub: "(Lo sé, lo sé, lo sé, lo sé)"
        },

        {
            start: 61, end: 63,
            text: "I know, I know, I know, I know, I know",
            sub: "(Lo sé, lo sé, lo sé, lo sé)"
        },

        {
            start: 63, end: 65,
            text: "I know, I know",
            sub: "(Lo sé, lo sé)"
        },

        {
            start: 65, end: 68,
            text: "Hey, I ought to leave the young thing alone",
            sub: "(Oye, yo debería dejar a la chica en paz)"
        },

        {
            start: 68, end: 72,
            text: "But ain't no sunshine when she's gone",
            sub: "(Pero cuando ella se va, no sale el Sol)"
        },

        {
            start: 74, end: 78,
            text: "Ain't no sunshine when she's gone",
            sub: "(Cuando ella se va, no sale el Sol)"
        },

        {
            start: 82, end: 84,
            text: "Only darkness everyday",
            sub: "(Solo oscuridad todos los días)"
        },

        {
            start: 85, end: 90,
            text: "Ain't no sunshine when she's gone",
            sub: "(Cuando ella de va, no sale el Sol)"
        },

        {
            start: 90, end: 93,
            text: "And this house just ain't no home",
            sub: "(Y esta casa ya no es más un hogar)"
        },

        {
            start: 93, end: 97,
            text: "Anytime she goes away ",
            sub: "(Cada vez que ella se va)"
        },

        {
            start: 98, end: 102,
            text: "Anytime she goes away ",
            sub: "(Cada vez que ella se va)"
        },

        {
            start: 105, end: 109,
            text: "Anytime she goes away ",
            sub: "(Cada vez que ella se va)"
        },

        {
            start: 111, end: 114,
            text: "Anytime she goes away ",
            sub: "(Cada vez que ella se va)"
        },

    ];

    music.addEventListener("timeupdate", () => {

        const current = music.currentTime;

        const line = lyricsTimeline.find(l =>
            current >= l.start && current <= l.end
        );

        if (line) {
            lyrics.textContent = line.text;
            lyricsSub.textContent = line.sub;
            lyrics.classList.add("show");
            lyricsSub.classList.add("show");
        } else {
            lyrics.classList.remove("show");
            lyricsSub.classList.remove("show");
        }
    });

    const fadeIn = setInterval(() => {
        if (music.volume < 0.9) {
            music.volume += 0.03;
        } else {
            clearInterval(fadeIn);
        }
    }, 100);

    let i = 0;

    function next() {

        img.classList.remove("show");

        setTimeout(() => {
            img.src = images[i];
            img.classList.add("show");

            i++;

            if (i < images.length) {
                setTimeout(next, 3000);
            } else {
                endCinema();
            }

        }, 400);
    }

    next();

    function endCinema() {

        const fadeOut = setInterval(() => {
            if (music.volume > 0.02) {
                music.volume -= 0.02;
            } else {
                music.pause();
                clearInterval(fadeOut);
            }
        }, 100);

        setTimeout(() => {

            cinema.classList.remove("active");

            const lyrics = document.getElementById("lyrics");
            const lyricsSub = document.getElementById("lyricsSub");
            lyrics.classList.remove("show");
            lyricsSub.classList.remove("show");

            document.body.innerHTML = "";
            document.body.style.background = "black";

        }, 5000);
    }
}