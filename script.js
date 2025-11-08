document.addEventListener("DOMContentLoaded", function () {
	var form = document.getElementById("registrationForm");

	//input field/elements (match the IDs in registration.html)
	var deviceName = document.getElementById("deviceName");
	var serialNumber = document.getElementById("serialNumber");
	var confirmSerial = document.getElementById("confirmSerial"); 

	// Error message spans/elements (match the IDs in registration.html)
	var deviceNameError = document.getElementById("deviceNameError");
	var serialNumberError = document.getElementById("serialNumberError");
	var confirmSerialError = document.getElementById("confirmSerialNumber"); 

	form.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent form submission

		var isValid = true;
		resetErrors();

		if (deviceName.value.trim() === "") {
			showError(deviceName, deviceNameError, "Device Name is required.");
			isValid = false;
		}

		// Expect format: 4 alphanumeric chars, hyphen, 4 alphanumeric chars (e.g. XXXX-YYYY)
		var serialRegex = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
		if (!serialRegex.test(serialNumber.value)) {
			showError(
				serialNumber,
				serialNumberError,
				"Serial Number must be in the format XXXX-YYYY (alphanumeric)."
			);
			isValid = false;
		}

		if (serialNumber.value !== confirmSerial.value) {
			showError(
				confirmSerial,
				confirmSerialError,
				"Serial Numbers do not match."
			);
			isValid = false;
		}

		if (isValid) {
			console.log("Form is valid. Submitting...");
			alert("Device registered successfully!");
			form.reset();
		} else {
			console.log(
				"Form is invalid. Please correct the errors and try again."
			);
		}
	});

	function showError(inputElement, errorElement, message) {
		inputElement.classList.add("invalid");
		errorElement.textContent = message;
		errorElement.style.display = "block";
	}

	function resetErrors() {
		var inputs = [deviceName, serialNumber, confirmSerial];
		var errors = [deviceNameError, serialNumberError, confirmSerialError];

		for (var i = 0; i < inputs.length; i++) {
			inputs[i].classList.remove("invalid");
			errors[i].textContent = "";
			errors[i].style.display = "none";
		}
	}
});
