export function isValidZipCode(zipCode) {
	return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
}
