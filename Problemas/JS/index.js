// script.js
document.getElementById('generateBtn').addEventListener('click', async function () {
    const { jsPDF } = window.jspdf; // Asegúrate de usar jsPDF desde el objeto global
    const customProblems = document.getElementById('customProblems').value.trim().split('\n');
    const numRandomProblems = parseInt(document.getElementById('numRandomProblems').value);
    const operations = {
        add: document.getElementById('add').checked,
        sub: document.getElementById('sub').checked,
        mul: document.getElementById('mul').checked,
        div: document.getElementById('div').checked
    };

    const problemsContainer = document.getElementById('problems');
    problemsContainer.innerHTML = ''; // Limpiar problemas anteriores
    let pdfContent = '';
    let answersContent = '';

    // Agregar problemas personalizados
    if (customProblems.length > 0 && customProblems[0] !== '') {
        customProblems.forEach(problem => {
            addProblem(problem);
            pdfContent += `${problem}\n`; // Agregar al contenido del PDF
            answersContent += `${problem} = ${calculateAnswer(problem)}\n`; // Calcular respuesta
        });
    }

    // Generar problemas aleatorios
    for (let i = 0; i < numRandomProblems; i++) {
        const randomProblem = generateRandomProblem(operations);
        addProblem(randomProblem);
        pdfContent += `${randomProblem}\n`; // Agregar al contenido del PDF
        answersContent += `${randomProblem} = ${calculateAnswer(randomProblem)}\n`; // Calcular respuesta
    }

    // Generar PDF
    const doc = new jsPDF();
    doc.text("Problemas de Matemáticas", 10, 10);
    doc.text(pdfContent, 10, 20);

    // Salto de página para respuestas
    doc.addPage(); 
    doc.text("Respuestas:", 10, 10);
    doc.text(answersContent, 10, 20);

    doc.save("problemas_matematicas.pdf"); // Guardar el PDF

    // Función para agregar un problema al contenedor
    function addProblem(problem) {
        const problemElement = document.createElement('div');
        problemElement.className = 'problem';
        problemElement.textContent = problem;
        problemsContainer.appendChild(problemElement);
    }

    // Función para generar un problema matemático aleatorio
    function generateRandomProblem(operations) {
        const num1 = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
        const num2 = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100

        const ops = [];
        if (operations.add) ops.push('+');
        if (operations.sub) ops.push('-');
        if (operations.mul) ops.push('*');
        if (operations.div) ops.push('/');

        const operator = ops[Math.floor(Math.random() * ops.length)]; // Selecciona un operador aleatorio
        return `${num1} ${operator} ${num2}`;
    }

    // Función para calcular la respuesta de un problema
    function calculateAnswer(problem) {
        const parts = problem.split(' ');
        const num1 = parseFloat(parts[0]);
        const operator = parts[1];
        const num2 = parseFloat(parts[2]);

        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return "Error";
        }
    }
});
