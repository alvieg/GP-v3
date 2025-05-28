            /*const iframe = document.getElementById('iframe');
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);*/
            const gameButtons = {
                "GHUB":"https://thegportal.neocities.org",
                "Burger Awesome":"https://burgerawesome.neocities.org",
                "HaHa Games":"https://hahagames.com",
                "Butter Dog Games":"https://teachers-are-the-best.neocities.org",
                "GN-Math":"https://gn-math.github.io",
                "MiniPlay":"https://miniplay.com",
                "GHUB V2":"https://v2.thegportal.net",
                "Space (Proxy)":"https://gointospace.app",
                "3KH0":"https://3kh0s.github.io",
                "Games 4 Free":"https://games-4-free.com",
                "Proxy (WIP)":"https://gameportal-v3-2025.vercel.app/proxy.html",
                "Interstellar":"https://interstellar-2025.vercel.app/",
            };

            /*const proxiedGB = {
                "Poki":"https://poki.com",
                "CrazyGames":"https://crazygames.com",
            };*/
            
            const buttonSpace = document.getElementById('buttonSpace');

            //const proxiedButtonSpace = document.getElementById('proxyButtonSpace')
            
            for (const [key, value] of Object.entries(gameButtons)) {
                const button = document.createElement('button');
                button.textContent = key;
                button.onclick = () => openModal(value);
                buttonSpace.appendChild(button);
            };

            /*for (const [key, value] of Object.entries(proxiedGB)) {
                const button = document.createElement('button');
                button.textContent = key;
                button.onclick = () => openProxyModal(value);
                proxiedButtonSpace.appendChild(button);
            };*/
            
            function checkHTTP(VAR) {
                if (!VAR.startsWith('https://') && !VAR.startsWith('http://')) {
                    VAR = "https://" + VAR;
                };
            };
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
                checkHTTP(url)
                iframe.src = url;
                win.document.body.appendChild(iframe);
                var script = win.document.createElement('script');
                script.innerHTML = "setTimeout(() => { location.reload(true); }, 10800 * 1000);";
                win.document.body.appendChild(script);
                window.close();
                console.log(url);
            };
            function toggleTheme() {
                document.body.classList.toggle('light');
            };
            // Select elements
            const closeModalBtn = document.getElementById('closeModalBtn');
            const modal = document.getElementById('modal');
            const modalOverlay = document.getElementById('modalOverlay');
            const embed = document.getElementById('iframe')
            const modalTB = document.getElementById('modalToolbar');

            // Function to open modal
            function openModal(URL) {
                modal.style.display = 'block';
                modalOverlay.style.display = 'block';
                modalTB.style.display = 'block';
                embed.src = URL
            };

            /*function openProxyModal(URL) {
                modal.style.display = 'block';
                modalOverlay.style.display = 'block';
                modalTB.style.display = 'block';
                embed.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            };*/
            
            //iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            // Function to close modal
            function closeModal() {
                modal.style.display = 'none';
                modalOverlay.style.display = 'none';
                modalTB.style.display = 'none';
                embed.src = '';
            };

            // Event listeners
            modalOverlay.addEventListener('click', closeModal); // Close modal when clicking outside

            function redirect() {
                var src = document.getElementById('iframe').src;
                openInNewTab(src);
            };
