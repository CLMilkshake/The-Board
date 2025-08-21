const themes = [
    { name: "Default", 
        background: "images/TheBoardLogo1.png", 
        color1: "white", 
        color2: "rgba(255, 251, 0, 0.3)", 
        color3:"2px solid rgba(255, 238, 0, 1)", 
        headerBackground:"rgba(0, 0, 0, 0)"
    },
    { name: "Fancy", 
        background: "images/TheBoardBackgroundFancy.png", 
        color1: "white", 
        color2: "black", 
        color3:"2px solid gray", 
        headerBackground:"rgba(0, 0, 0, 0.3)" 
    }
    ];

    const themeSelect = document.getElementById("themeSelect");
    const randomToggle = document.getElementById("randomToggle");
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    themes.forEach((t, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = t.name;
        themeSelect.appendChild(option);
    });

    function applyTheme(theme, index) {
        document.body.style.backgroundImage = `url('${theme.background}')`;
        document.body.style.color = theme.color1;
        nav.style.backgroundColor = theme.color2;
        nav.style.borderTop = theme.color3;
        nav.style.borderBottom = theme.color3;
        header.style.backgroundColor = theme.headerBackground;

        nav.querySelectorAll("a").forEach(link => {
            link.style.color = theme.color1;
        });

        if (!randomToggle.checked) {
            localStorage.setItem("chosenTheme", index);
        }
    }

    if (localStorage.getItem("randomToggle") !== null) {
        randomToggle.checked = localStorage.getItem("randomToggle") === "true";
    } else {
        randomToggle.checked = true; 
    }

    let chosenTheme, index;
    if (randomToggle.checked) {
        index = Math.floor(Math.random() * themes.length);
        chosenTheme = themes[index];
    } else {
        index = parseInt(localStorage.getItem("chosenTheme")) || 0;
        chosenTheme = themes[index];
    }

    themeSelect.value = index;
    applyTheme(chosenTheme, index);

    themeSelect.addEventListener("change", () => {
        const idx = parseInt(themeSelect.value);
        const theme = themes[idx];
        applyTheme(theme, idx);
    });

    randomToggle.addEventListener("change", () => {
        localStorage.setItem("randomToggle", randomToggle.checked);
        if (randomToggle.checked) {
            const idx = Math.floor(Math.random() * themes.length);
            themeSelect.value = idx;
            applyTheme(themes[idx], idx);
        } else {
            const idx = parseInt(themeSelect.value);
            localStorage.setItem("chosenTheme", idx);
        }
    });