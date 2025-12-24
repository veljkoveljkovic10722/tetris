const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(30, 30);

const nextCanvas = document.getElementById('next-piece');
const nextContext = nextCanvas.getContext('2d');
nextContext.scale(30, 30);

const scoreElement = document.getElementById('score');
const darkOverlay = document.getElementById('dark-overlay');
const gameOverElement = document.getElementById('game-over');
const playerNameInput = document.getElementById('player-name');
const submitNameButton = document.getElementById('submit-name');
const levelElement = document.getElementById('LEVEL');

let score = 0;

const colors = {
    'T': 'rgba(154, 184, 249)',
    'O': 'rgb(255, 234, 0)',
    'L': 'rgb(255,165,0)',
    'J': 'rgb(0, 150, 255)',
    'I': 'rgb(65,253,254)',
    'S': 'rgb(170, 255, 0)',
    'Z': 'rgba(255, 0, 0)'
};

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function drawMatrix(matrix, offset, ctx = context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && 
                (arena[y + o.y] && 
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function draw() {
    context.fillStyle = 'rgba(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerReset() {
    player.matrix = nextPiece.matrix;
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        gameOver();
        return;
    }
    nextPiece.matrix = createPiece(chooseRandomPiece());
    drawNext();
}

function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [type, type, type],
            [0, type, 0],
        ];
    } else if (type === 'O') {
        return [
            [type, type],
            [type, type],
        ];
    } else if (type === 'L') {
        return [
            [0, type, 0],
            [0, type, 0],
            [0, type, type],
        ];
    } else if (type === 'J') {
        return [
            [0, type, 0],
            [0, type, 0],
            [type, type, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, type, 0, 0],
            [0, type, 0, 0],
            [0, type, 0, 0],
            [0, type, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, type, type],
            [type, type, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [type, type, 0],
            [0, type, type],
            [0, 0, 0],
        ];
    }
}

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        score += rowCount * 10;
        rowCount *= 2;
    }
}

function updateScore() {
    scoreElement.innerText = score;
}

function drawNext() {
    nextContext.fillStyle = '#000';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    drawMatrix(nextPiece.matrix, {x: 1, y: 1}, nextContext);
}

function gameOver() {
    gameOverElement.style.display = 'block';
    cancelAnimationFrame(animationId);
}

let dropCounter = 0;


let dropInterval = localStorage.getItem('dropInterval');
if (!dropInterval) {
    dropInterval = 1000; 
} else {
    dropInterval = parseInt(dropInterval, 10);
}

let lastTime = 0;
let animationId;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    animationId = requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        playerDrop();
    } else if (event.key === 'ArrowUp') {
        playerRotate(1);
    }
});

function sacuvajRezultat(ime, rezultat) {
    let rezultati = JSON.parse(localStorage.getItem('rezultati')) || [];
    let noviRezultat = { ime, rezultat };
    let dodat = false;

    
    if (rezultati.length < 5 || rezultat > rezultati[4].rezultat) {
        rezultati.push(noviRezultat);
        rezultati.sort((a, b) => b.rezultat - a.rezultat);
        if (rezultati.length > 5) {
            rezultati = rezultati.slice(0, 5);
        }
        dodat = true;
    }

    localStorage.setItem('poslednjiRezultat', JSON.stringify(noviRezultat));

 
    if (dodat) {
        localStorage.setItem('rezultati', JSON.stringify(rezultati));
    }
}

submitNameButton.addEventListener('click', () => {
    const playerName = playerNameInput.value;
    if (playerName) {
        sacuvajRezultat(playerName, score);
        window.location.href = 'tetris-rezultati.html';
    }
});

function updateLevel() {
    levelElement.innerText = localStorage.getItem('level');
}

let pieces = localStorage.getItem('selectedShapes');

function chooseRandomPiece() {
    const randomIndex = Math.floor(Math.random() * pieces.length);
    return pieces[randomIndex];
}

const arena = createMatrix(10, 20);
const player = {
    pos: {x: 0, y: 0},
    matrix: null,
};
const nextPiece = {
    matrix: createPiece(chooseRandomPiece())
};

updateLevel();
playerReset();
update();

document.addEventListener("DOMContentLoaded", function() {
    let backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.play();
});
