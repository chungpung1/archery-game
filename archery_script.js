const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timerValue');
const bow = document.getElementById('bow');
const gaugeFill = document.getElementById('gaugeFill');
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const scoreContainer = document.getElementById('scoreDisplay');
let score = 0;
let timer = 60; // 타이머를 60초로 설정
let isReloaded = false;
let gameInterval;
let reloadTimeout;
let reloadProgress = 0;

function createTarget() {
    const target = document.createElement('div');
    target.className = 'target';
    moveTarget(target);
    gameArea.appendChild(target);

    target.addEventListener('click', () => {
        if (!isReloaded) {
            alert("활을 장전하세요!");
            return;
        }

        const bowRect = bow.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const hit = (
            bowRect.left < targetRect.right &&
            bowRect.right > targetRect.left &&
            bowRect.top < targetRect.bottom &&
            bowRect.bottom > targetRect.top
        );

        if (hit) {
            score++;
            scoreDisplay.textContent = score;
            target.style.backgroundColor = 'green'; // 목표를 맞혔을 때 색상 변경
            setTimeout(() => {
                target.remove();
                createTarget(); // 새로운 표적 생성
            }, 500);
        } else {
            alert("표적을 놓쳤습니다!");
        }

        isReloaded = false; // 활 장전 상태 초기화
    });
}

function moveTarget(target) {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const x = Math.random() * (areaWidth - 25);
    const y = Math.random() * (areaHeight - 50); // Y좌표의 최대값을 조정하여 더 낮은 위치에 생성

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

function generateTargets(count) {
    for (let i = 0; i < count; i++) {
        createTarget();
    }
}

document.addEventListener('mousemove', (event) => {
    if (isReloaded) {
        bow.style.left = `${event.clientX - 15}px`;
        bow.style.top = `${event.clientY - 15}px`;
        bow.style.display = 'block'; // 활을 보이게 함
    } else {
        bow.style.display = 'none'; // 활을 숨김
    }
});

document.addEventListener('mousedown', () => {
    if (!isReloaded) {
        reloadProgress = 0;
        gaugeFill.style.width = '0%'; // 게이지 초기화
        reloadTimeout = setInterval(() => {
            reloadProgress += 20; // 20%씩 증가
            gaugeFill.style.width = `${reloadProgress}%`; // 게이지 업데이트

            if (reloadProgress >= 100) {
                clearInterval(reloadTimeout);
                isReloaded = true;

                const targets = document.querySelectorAll('.target');
                targets.forEach(target => {
                    target.style.backgroundColor = 'red';
                });
            }
        }, 100); // 100ms마다 업데이트
    }
});

document.addEventListener('mouseup', () => {
    clearInterval(reloadTimeout); // 장전 취소
    gaugeFill.style.width = '0%'; // 게이지 초기화
});

function startTimer() {
    gameInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;

        if (timer <= 0) {
            clearInterval(gameInterval);
            alert(`게임 종료! 최종 점수: ${score}`);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameArea.style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    scoreContainer.style.display = 'block';
    scoreDisplay.textContent = score;
}

startButton.addEventListener('click', () => {
    score = 0; // 점수 초기화
    timer = 60; // 타이머 초기화
    isReloaded = false; // 장전 상태 초기화
    scoreContainer.style.display = 'none'; // 점수 숨기기
    gameArea.style.display = 'block'; // 게임 영역 보이기
    document.getElementById('timer').style.display = 'block'; // 타이머 보이기
    startTimer();
    generateTargets(5); // 5개의 표적 생성
    startButton.style.display = 'none'; // 게임 시작 버튼 숨김
    bow.style.display = 'block'; // 활 보이기
});