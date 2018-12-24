export default function(array) {
	return array.reduce((maxValue, value) => Math.max(maxValue, value));
}
