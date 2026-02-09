window.onload = () => {
    const glass = document.getElementById("glass-tv");
    const circle = document.getElementById("crt-circle");
    const bars = document.getElementById("bars");
    const videoLayer = document.getElementById("video-layer");
    const video = document.getElementById("bg-video");
    const final = document.getElementById("final");
    const title = final.querySelector("h1");
  
    let stage = 1;
    let showTimeout, hideTimeout;
  
    bars.style.display = "none";
    videoLayer.style.display = "none";
    final.style.opacity = "0";
  
    /* 1️⃣ ENCENDIDO CRT */
    setTimeout(() => {
      circle.style.transition = "clip-path 1.6s ease-out";
      circle.style.clipPath = "circle(150% at 50% 50%)";
    }, 2500);
  
    /* 2️⃣ BARRAS */
    setTimeout(() => {
      circle.style.display = "none";
      glass.style.display = "none";
      bars.style.display = "block";
    }, 4200);
  
    /* 3️⃣ VIDEO 1 */
    setTimeout(() => {
      bars.style.display = "none";
      videoLayer.style.display = "block";
      playVideo("vid.mp4", "2023");
    }, 6000);
  
    /* CUANDO TERMINA VIDEO */
    video.addEventListener("ended", () => {
      if (stage === 1) {
        stage = 2;
        playVideo("vid2.mp4", "2024");
      }
    });
  
    /* ========================= */
  
    function playVideo(src, texto) {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
  
      ocultarTexto();
  
      video.pause();
      video.removeAttribute("src");
      video.load();
  
      video.src = src;
      video.muted = true;
  
      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration;
  
        // ⏱ aparece a los 0.5s
        showTimeout = setTimeout(() => {
          mostrarTexto(texto);
        }, 500);
  
        // ⏱ desaparece 1s antes de terminar
        hideTimeout = setTimeout(() => {
          ocultarTexto();
        }, (duration - 0.5) * 1000);
  
        video.currentTime = 0;
        video.play().catch(() => {});
      }, { once: true });
    }
  
    function mostrarTexto(texto) {
      title.innerHTML = texto;
      final.style.opacity = "1";
    }
  
    function ocultarTexto() {
      final.style.opacity = "0";
    }
  };
  