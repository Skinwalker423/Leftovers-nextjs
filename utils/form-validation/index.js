export function isValidZipCode(zipCode) {
	return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
}

export function validateEmail(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}

	return false;
}
