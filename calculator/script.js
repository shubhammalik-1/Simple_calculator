const display = document.querySelector('.display');
let current = '';
let operator = '';
let previous = '';

function update() {
  display.value = current || '0';
}

function append(value) {
  if (value === 'C') {
    current = '';
    previous = '';
    operator = '';
    update();
    return;
  }

  if (value === '=') {
    if (!previous || !current || !operator) return;

    const result = operate(
      parseFloat(previous),
      parseFloat(current),
      operator
    );

    current = result.toString();
    previous = '';
    operator = '';
    update();
    return;
  }

  if (['+', '-', '*', '/'].includes(value)) {
    if (!current) return;
    operator = value;
    previous = current;
    current = '';
    return;
  }

  if (value === '%') {
    current = (parseFloat(current) / 100).toString();
    update();
    return;
  }

  current += value;
  update();
}

function operate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}

document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('click', () => {
    append(btn.dataset.value);
  });
});

update();