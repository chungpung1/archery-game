const questions = [
    "1. 외향적인 편인가요?",
    "2. 사람들과 함께 있을 때 에너지를 얻나요?",
    "3. 계획을 세우는 것을 선호하나요?",
    "4. 직관적인 정보에 더 의존하나요?",
    "5. 감정적으로 반응하나요?",
    "6. 사실에 기반한 판단을 선호하나요?",
    "7. 새로운 경험을 시도하나요?",
    "8. 규칙을 잘 따르나요?",
    "9. 대화를 시작하는 것을 좋아하나요?",
    "10. 혼자 있는 시간을 좋아하나요?",
    "11. 감정적으로 연결되는 것을 중시하나요?",
    "12. 논리적인 접근을 선호하나요?",
    "13. 창의적인 해결책을 찾는 것을 좋아하나요?",
    "14. 세부사항에 신경을 많이 쓰나요?",
    "15. 사람들의 감정을 이해하려고 하나요?",
    "16. 변화를 두려워하나요?"
];

const formElement = document.getElementById('mbtiForm');
const questionsElement = document.getElementById('questions');
const resultElement = document.getElementById('result');

questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <label>${question}</label><br>
        <input type="radio" name="question${index}" value="yes" required> 예
        <input type="radio" name="question${index}" value="no"> 아니오
    `;
    questionsElement.appendChild(questionElement);
});

formElement.onsubmit = function(event) {
    event.preventDefault();
    const formData = new FormData(formElement);
    let yesCount = 0;

    for (let i = 0; i < questions.length; i++) {
        if (formData.get(`question${i}`) === 'yes') {
            yesCount++;
        }
    }

    // MBTI 유형을 네 글자로 설정
    const extroverted = yesCount > questions.length / 2; // 외향적 여부
    const sensing = (formData.get("question6") === "no" && formData.get("question5") === "no"); // 사실적 여부
    const intuitive = (formData.get("question4") === "yes"); // 직관적 여부
    const feeling = (formData.get("question5") === "yes"); // 감정적 여부

    const mbtiType = (extroverted ? 'E' : 'I') + (intuitive ? 'N' : 'S') + (feeling ? 'F' : 'T') + (sensing ? 'P' : 'J');

    resultElement.innerHTML = `<h2>당신의 MBTI 유형은 ${mbtiType}입니다.</h2>`;
    resultElement.classList.remove('hidden');
    questionsElement.classList.add('hidden');
};