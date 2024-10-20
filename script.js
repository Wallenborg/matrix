function startMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const context = canvas.getContext('2d');

    const inputSection = document.querySelector('.input-section');
    inputSection.style.display = 'none';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let textInput = document.getElementById('textInput').value;
    if (textInput === '') {
        alert('Text is required!');
        inputSection.style.display = 'inline-block';
        return;
    }

    const minLetters = 100;
    if (textInput.length < minLetters) {
        while (textInput.length < minLetters) {
            textInput += textInput;
        }
        textInput = textInput.slice(0, minLetters);
    }

    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#A833FF', '#FFD700', 
        '#FF4500', '#1E90FF', '#32CD32', '#FF1493', '#00FA9A', '#FF69B4', 
        '#FF6347', '#7FFF00', '#00BFFF', '#FF8C00', '#ADFF2F', '#FF00FF', 
        '#00FF7F', '#7CFC00', '#DC143C', '#FFA500', '#00CED1', '#40E0D0', 
        '#FF4500'
    ];

    const fontSize = 20;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    // Canvas font settings
    context.font = `${fontSize}px "Tiny5", sans-serif`;

    function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach((y, i) => {
            const text = textInput[Math.floor(Math.random() * textInput.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            context.fillStyle = randomColor;
            context.fillText(text, i * fontSize, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });

        requestAnimationFrame(draw);
    }

    draw();
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrixCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

