/*const iframe = document.getElementById('iframe');
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);*/
            // =================== CONSTANTS ===================
const gameButtons = {
    "GHUB": "https://thegportal.neocities.org",
    "Burger Awesome": "https://burgerawesome.neocities.org",
    "HaHa Games": "https://hahagames.com",
    "Butter Dog Games": "https://teachers-are-the-best.neocities.org",
    "GN-Math": "https://gn-math.github.io",
    "MiniPlay": "https://miniplay.com",
    "GHUB V2": "https://v2.thegportal.net",
    "Space (Proxy)": "https://gointospace.app",
    "3KH0": "https://3kh0s.github.io",
    "Games 4 Free": "https://games-4-free.com",
    "Proxy (WIP)": "https://gameportal-v3-2025.vercel.app/proxy.html",
    "Interstellar": "https://interstellar-2025.vercel.app/",
};

const validPages = ['/', '404.html', '/index.html'];
const MAX_TILT = -15;
const MIN_TILT = 4;
const MAX_Z_ROTATION = 15;

// =================== DOM ELEMENTS ===================
const buttonSpace = document.getElementById('buttonSpace');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const embed = document.getElementById('iframe');
const modalTB = document.getElementById('modalToolbar');
const urlInput = document.getElementById('inputBox').value;
const urlButton = document.getElementById('urlButton');

// =================== FUNCTIONS ===================
function checkHTTP(VAR) {
    if (!VAR.startsWith('https://') && !VAR.startsWith('http://')) {
        VAR = "https://" + VAR;
    }
}

function openInNewTab(URL) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('embed');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    var url = URL;
    checkHTTP(url);
    iframe.src = url;
    win.document.body.appendChild(iframe);
    var script = win.document.createElement('script');
    script.innerHTML = "setTimeout(() => { location.reload(true); }, 10800 * 1000);";
    win.document.body.appendChild(script);
    window.close();
    console.log(url);
}

function toggleTheme() {
    document.body.classList.toggle('light');
}

function openModal(URL) {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    modalTB.style.display = 'block';
    embed.src = URL;
}

function openProxyModal() {
    checkHTTP(urlInput);
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    modalTB.style.display = 'block';
    embed.src = url;
}

function closeModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    modalTB.style.display = 'none';
    embed.src = '';
}

function redirect() {
    var src = document.getElementById('iframe').src;
    openInNewTab(src);
}

// =================== INITIALIZATION ===================
// Create game buttons
for (const [key, value] of Object.entries(gameButtons)) {
    const button = document.createElement('button');
    button.textContent = key;
    button.onclick = () => openModal(value);
    button.ondblclick = () => openInNewTab(value);
    button.className = "game-buttons";
    buttonSpace.appendChild(button);
}

// =================== EVENT LISTENERS ===================
// Modal overlay click closes modal
modalOverlay.addEventListener('click', closeModal);

// URL button events
urlButton.addEventListener('dblclick', () => openInNewTab(urlInput));
urlButton.addEventListener('click', openProxyModal);

// 404 redirect
if (!validPages.includes(window.location.pathname)) {
    window.location.href = '/404.html';
}

// Button tilt effect
document.querySelectorAll('.game-buttons').forEach(button => {
    button.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        const { left, top, width, height } = button.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        let deltaX = (clientX - centerX) * 1; // Change multiplier for effect intensity
        let deltaY = (clientY - centerY) * 1;

        // Limit tilt angle to max/min degrees
        deltaX = Math.max(MAX_TILT, Math.min(MIN_TILT, deltaX));
        deltaY = Math.max(MAX_TILT, Math.min(MIN_TILT, deltaY));

        // Add Z-axis rotation based on diagonal movement
        let deltaZ = (deltaX + deltaY) / 4;
        deltaZ = Math.max(-MAX_Z_ROTATION, Math.min(MAX_Z_ROTATION, deltaZ));

        // Calculate shadow based on tilt position
        const shadowX = deltaX * 0.8;
        const shadowY = deltaY * 0.8;
        const shadowBlur = Math.max(Math.abs(deltaX), Math.abs(deltaY)) * 1.5;

        // Elevate button when heavily tilted
        const elevation = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        button.style.zIndex = elevation > 15 ? 10 : 1;

        button.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg) rotateZ(${deltaZ}deg)`;
        button.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.4)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
        button.style.boxShadow = '0px 0px 5px rgba(255, 255, 255, 0.2)';
        button.style.zIndex = 1;
    });
});
