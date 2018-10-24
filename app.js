// Add form submit listener
document.querySelector("#loan-form").addEventListener('submit', calculate);

// Calculate loan function
function calculate(e) {
  // Take loan data from the form
  const loanAmount = Number(document.querySelector("#loan-amount").value),
        interest = Number(document.querySelector("#interest").value),
        yearsToRepay = Number(document.querySelector("#years-to-repay").value);
	
	if (loanAmount > 0 && interest >= 0 && yearsToRepay > 0) {
		// Calculate monthly payment
		const numberOfPayments = yearsToRepay * 12,
					interestPerPayment = (interest / 100) / 12,
					discountFactor = (Math.pow(1 + interestPerPayment, numberOfPayments) - 1) / (interestPerPayment * Math.pow(1 + interestPerPayment, numberOfPayments));

		const monthlyPayment = (interest) ? loanAmount / discountFactor : loanAmount / numberOfPayments,
					totalPayment = monthlyPayment * numberOfPayments,
					totalInterest = totalPayment - loanAmount;

		// Print results
			document.querySelector("#monthly-payment").value = monthlyPayment;
			document.querySelector("#total-payment").value = totalPayment;
			document.querySelector("#total-interest").value = totalInterest;
	} else {
		// Create error div
		let errorMessage = document.createElement('div'),
				errorMessageText = document.createTextNode('Please check your numbers');
		errorMessage.appendChild(errorMessageText);
		errorMessage.classList = "alert alert-danger form-error-custom";

		// Add error message above the form
		const loanForm = document.querySelector("#loan-form");
		document.querySelector(".card-form").insertBefore(errorMessage, loanForm);

		// Remove the error message after 3 seconds
		window.setTimeout(() => {
			errorMessage.remove();
		}, 3000);
	}
	
	e.preventDefault();
};