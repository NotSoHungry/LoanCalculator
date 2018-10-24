// Add form submit listener
document.querySelector("#loan-form").addEventListener('submit', calculate);

// Calculate loan function
function calculate(e) {
  // Take loan data from the form
  const loanAmount = Number(document.querySelector("#loan-amount").value),
        interest = Number(document.querySelector("#interest").value),
        yearsToRepay = Number(document.querySelector("#years-to-repay").value);

  // Calculate monthly payment
  const numberOfPayments = yearsToRepay * 12,
        interestPerPayment = (interest / 100) / 12,
        discountFactor = (Math.pow(1 + interestPerPayment, numberOfPayments) - 1) / (interestPerPayment * Math.pow(1 + interestPerPayment, numberOfPayments));

  const monthlyPayment = (loanAmount / discountFactor).toFixed(2),
        totalPayment = (monthlyPayment * numberOfPayments).toFixed(2),
        totalInterest = (totalPayment - loanAmount).toFixed(2);

  // Print results
    document.querySelector("#monthly-payment").value = monthlyPayment;
    document.querySelector("#total-payment").value = totalPayment;
    document.querySelector("#total-interest").value = totalInterest;

  e.preventDefault();
}