const form = document.querySelector('#estimate-form');
const salesInput = document.querySelector('#sales');
const percentageInput = document.querySelector('#percentage');
const percentageValue = document.querySelector('#percentage-value');
const estimateOutput = document.querySelector('#estimate-output');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

percentageInput.addEventListener('input', () => {
  percentageValue.textContent = percentageInput.value;
  updateEstimate();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateEstimate(true);
});

salesInput.addEventListener('input', () => updateEstimate());

function updateEstimate(force = false) {
  const monthlySales = Number.parseFloat(salesInput.value);
  const percentage = Number.parseFloat(percentageInput.value) / 100;

  if (!Number.isFinite(monthlySales) || monthlySales <= 0) {
    estimateOutput.textContent =
      force ? 'Enter your monthly sales to view an estimate.' : '';
    return;
  }

  const potentialAdvance = Math.round(monthlySales * percentage * 3);
  const suggestedHoldback = Math.round(monthlySales * percentage);

  estimateOutput.innerHTML = `
    <p>Your estimated advance could be <strong>${formatter.format(
      potentialAdvance
    )}</strong>.</p>
    <p>Repay with approximately <strong>${formatter.format(
      suggestedHoldback
    )}</strong> held from monthly sales.</p>
  `;
}

updateEstimate();
