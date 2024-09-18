const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let moveHistory = { 'X': [], 'O': [] };  // لتتبع الحركات لكل لاعب

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    // تحديث اللوحة
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // تغيير لون الرمز بناءً على اللاعب
    if (currentPlayer === 'X') {
        event.target.classList.add('X');  // إضافة فئة X للأزرق
    } else {
        event.target.classList.add('O');  // إضافة فئة O للأحمر
    }

    // إضافة الحركة إلى تاريخ الحركات
    moveHistory[currentPlayer].push(cellIndex);

    // إذا كان لدى اللاعب أكثر من 3 رموز، حذف الأقدم
    if (moveHistory[currentPlayer].length > 3) {
        const firstMoveIndex = moveHistory[currentPlayer].shift();  // حذف أول حركة
        gameBoard[firstMoveIndex] = '';  // إفراغ الخلية القديمة
        const firstCell = document.querySelector(`.cell[data-index='${firstMoveIndex}']`);
        firstCell.textContent = '';  // إزالة النص
        firstCell.classList.remove('X', 'O');  // إزالة الألوان
    }

    // التحقق من الفائز
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // التحقق من التعادل
    if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // تبديل اللاعب
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    moveHistory = { 'X': [], 'O': [] };  // إعادة تعيين تاريخ الحركات
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');  // إزالة الألوان عند إعادة التشغيل
    });
}

// إضافة أحداث النقر لكل خلية
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
