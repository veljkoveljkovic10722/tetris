//Prelazak na stranicu sa rezultatima
document.addEventListener("DOMContentLoaded", function() {
    let tabelaBtn = document.getElementById('resultsBtn');

    tabelaBtn.addEventListener('click', function() {
        window.location.href = 'tetris-rezultati.html';
    });
});

//Prelazak na stranicu sa podesavanjima igre
document.addEventListener("DOMContentLoaded", function() {
    var startBtn = document.getElementById('startBtn');
    var menu = document.querySelector('.menu');
    var startGame = document.querySelector('.start-game');

    startBtn.addEventListener('click', function() {
        menu.style.display = 'none'; 
        startGame.style.display = 'block'; 
    });
});



//Prelazak na stranicu sa instrukcijama
document.addEventListener("DOMContentLoaded", function() {
    let instructionsBtn = document.getElementById('instructionsBtn');
    let menu = document.querySelector('.menu');
    let instructionsPage = document.querySelector('.instructions');

    instructionsBtn.addEventListener('click', function() {
        menu.style.display = 'none'; 
        instructionsPage.style.display = 'block'; 
    });
});

//Povrtak na meni iz instrukcija
document.addEventListener("DOMContentLoaded", function() {
    let menuBtn = document.getElementById('menuBtn');
    let menu = document.querySelector('.menu');
    let instructionsPage = document.querySelector('.instructions');
    let startGame = document.getElementsByClassName('start-game');

    menuBtn.addEventListener('click', function() {
        menu.style.display = 'block'; 
        instructionsPage.style.display = 'none'; 
     
    });
});

//Povratak na meni iz starta
document.addEventListener("DOMContentLoaded", function() {
    let menuBtn = document.getElementById('menuBtnS');
    let menu = document.querySelector('.menu');
    let instructionsPage = document.querySelector('.start-game');
    

    menuBtn.addEventListener('click', function() {
        menu.style.display = 'block'; 
        instructionsPage.style.display = 'none'; 
     
    });
});

//////
function saveSelectedShapes() {
    const shapeCheckboxes = document.querySelectorAll('.shapes-selection input[type="checkbox"]');
    let selectedShapes = '';

    shapeCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedShapes += checkbox.value;
        }
    });

    localStorage.setItem('selectedShapes', selectedShapes);
}
/////

document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('startGameBtn');
    
    
    startGameBtn.addEventListener('click', function() {
        let dropInterval;
        let level;

        if (document.getElementById('easyRadio').checked) {
            dropInterval = 1000;
            level = 'EASY';
        } else if (document.getElementById('mediumRadio').checked) {
            dropInterval = 500;
            level = 'MEDIUM';
        } else if (document.getElementById('hardRadio').checked) {
            dropInterval = 100;
            level = 'HARD';
        }

        // Sačuvajte dropInterval u localStorage ili kao query parametar
        saveSelectedShapes();
        localStorage.setItem('dropInterval', dropInterval);
        localStorage.setItem('level', level);

        // Pređite na tetris-igra.html
        window.location.href = 'tetris-igra.html';
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.play();
});


