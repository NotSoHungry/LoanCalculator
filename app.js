// Add form submit listener
document.querySelector("#loan-form").addEventListener('submit', calculate);

// Calculate loan function
function calculate(e) {
  // Take loan data from the form
  const loanAmount = Number(document.querySelector("#loan-amount").value),
        interest = Number(document.querySelector("#interest").value),
				yearsToRepay = Number(document.querySelector("#years-to-repay").value);

	// Get results card object
	const resultsCard = document.querySelector('.card-results');
	
	// Function for generating the loader's html markup
	const generateResultsLoader = function() {
		return `
			<div class="card-results__loader">
				<img src="./img/loading.gif" alt="Loading">
			</div>
		`
	};

	// Function for generating the result's html markup
	const generateResults = function(monthlyPayment, totalPayment, totalInterest) {
		return `
			<div class="card-results__results">
				<h3>Results</h3>
				<div class="form-group">
					<div class="input-group">
							<span class="input-group-addon">Monthly Payment</span>
							<input type="number" class="form-control" id="monthly-payment" value=${monthlyPayment} disabled>
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
							<span class="input-group-addon">Total Payment</span>
							<input type="number" class="form-control" id="total-payment" value=${totalPayment} disabled>
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
							<span class="input-group-addon">Total Interest</span>
							<input type="number" class="form-control" id="total-interest" value=${totalInterest} disabled>
					</div>
				</div>
			</div>
		`
	}

	// Expand the results card and show loader icon
	resultsCard.innerHTML = generateResultsLoader();
	resultsCard.className += ' show-results';
	setTimeout(function() {
		resultsCard.firstElementChild.classList.toggle('show');
	}, 100);
	

	
	if (loanAmount > 0 && interest >= 0 && yearsToRepay > 0) {
		// Calculate monthly payment
		const numberOfPayments = yearsToRepay * 12,
					interestPerPayment = (interest / 100) / 12,
					discountFactor = (Math.pow(1 + interestPerPayment, numberOfPayments) - 1) / (interestPerPayment * Math.pow(1 + interestPerPayment, numberOfPayments));

		const monthlyPayment = (interest) ? loanAmount / discountFactor : loanAmount / numberOfPayments,
					totalPayment = monthlyPayment * numberOfPayments,
					totalInterest = totalPayment - loanAmount;

		// Print results
			setTimeout(function() {
				resultsCard.innerHTML = generateResults(monthlyPayment.toFixed(2), totalPayment.toFixed(2), totalInterest.toFixed(2));
			}, 3000);
	    
			// document.querySelector("#monthly-payment").value = monthlyPayment.toFixed(2);
			// document.querySelector("#total-payment").value = totalPayment.toFixed(2);
			// document.querySelector("#total-interest").value = totalInterest.toFixed(2);
	} else {
		setTimeout(function() {
			// Create error div
			let errorMessage = document.createElement('div'),
			errorMessageText = document.createTextNode('Please check your numbers');
			errorMessage.appendChild(errorMessageText);
			errorMessage.classList = "alert alert-danger form-error-custom";

			// Add error message above the form
			const loanFormHeader = document.querySelector(".card-form h1");
			document.querySelector(".card-form").insertBefore(errorMessage, loanFormHeader);

			// Remove the loader and set the hight of result card to 0
			resultsCard.style.height = "0";
			resultsCard.classList.toggle('show-results');
			resultsCard.firstElementChild.remove();
			resultsCard.style.height = "";

			// Remove the error message after 3 seconds
			window.setTimeout(() => {
				errorMessage.remove();
			}, 2000);
		}, 1000)
	}
	
	e.preventDefault();
};