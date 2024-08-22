/* Aqui eu fiz três variaveis, uma pega o elemento de display da calculadora que é onde fica o res, um pegaa entrada atual do usuário,um o operador atual selecionado (+, -, *, /, %) e o outro pega o primeiro operando*/
let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let operand1 = null;

/**
 * adiciono um numero ou ponto decimal a entrada atual
 * @param {string} number - o numero ou ponto decimal a ser adicionado
 */

function appendNumber(number) {
    // aq eu limito o comprimento da entrada a 15 caracteres
    if (currentInput.length < 15) {
        // aq eu impeçe a adição de múltiplos pontos decimais
        if (number === '.' && currentInput.includes('.')) return;
        // aq adiciono o numero ou ponto decimal a entrada atual
        currentInput += number;
        // atualiza o display com a entrada atual
        updateDisplay();
    }
}

/**
 * aq eu limpo a entrada, o operador e o primeiro operando, e reinicio o display
 */
function clearDisplay() {
    // isso vai resetar todas as variaveis
    currentInput = '';
    operand1 = null;
    operator = null;
    // atualiza o display para mostrar '0'
    updateDisplay();
}

/**
 * aq tualizo o display da calculadora com o valor atual da entrada.
 */
function updateDisplay() {
    // se a entrada estiver vazia, mostra 0 se n mostra a entrada
    display.textContent = currentInput || '0';
}

/**
 * aq adiciono um operador a entrada e realizo o calculo se precisar.
 * @param {string} op - O operador a ser adicionado (+, -, *, /, %).
 */
function appendOperator(op) {
    // aq se caso a entrada estiver vazia e o operador for '-', adiciona o sinal negativo
    if (currentInput === '' && op === '-') {
        currentInput = '-';
    } else if (currentInput !== '') {
        // se um operando e um operador ja foi definido, calcula o resultado
        if (operand1 === null) {
            operand1 = parseFloat(currentInput);
        } else if (operator) {
            operand1 = compute();
        }
        // aq eu defino o operador atual e limpo a entrada para o proximo operando
        operator = op;
        currentInput = '';
    }
    // atualizo o display com o valor atual novamente
    updateDisplay();
}

/**
 * aq realizo o calculo com base no operador e nos operandos atuais
 * @returns {number} - o resultado do cálculo.
 */
function compute() {
    // se um operador e um primeiro operando foram definidos e ter uma entrada atual
    if (operator && operand1 !== null && currentInput !== '') {
        let result;
        // converto a entrada atual para um número
        const operand2 = parseFloat(currentInput);
        // realizo o cálculo com base no operador atual
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand1 / operand2;
                break;
            case '%':
                // Calcula a porcentagem
                result = (operand1 * operand2) / 100;
                break;
        }
        // atualizo a entrada com o resultado
        currentInput = result.toString();
        // reseta o operador e o primeiro operando
        operand1 = null;
        operator = null;
        // atualiza o display com o resultado
        updateDisplay();
    }
}

/**
 * aq removo o último caractere da entrada atual
 */
function deleteLastCharacter() {
    // aq emovo o último caractere da entrada atual
    currentInput = currentInput.slice(0, -1);
    // se caso a entrada ficar vazia define como '0'
    if (currentInput === '') {
        currentInput = '0';
    }
    // atualizo o display com a entrada atual
    updateDisplay();
}