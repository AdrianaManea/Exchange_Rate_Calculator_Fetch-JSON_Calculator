const currencyElement_one = document.getElementById('currency-one');
const amountElement_one = document.getElementById('amount-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  // console.log('Runs');
  const currency_one = currencyElement_one.value;
  const currency_two = currencyElement_two.value;
  // console.log(currency_one, currency_two);

  fetch(`https://v6.exchangerate-api.com/v6/897abb4e6e75b9e6a517c7d6/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data.conversion_rates[currency_two];
      console.log(rate);

      rateElement.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;

      amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyElement_one.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyElement_one.value;
  currencyElement_one.value = currencyElement_two.value;
  currencyElement_two.value = temp;
  calculate();
});

calculate();