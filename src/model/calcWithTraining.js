export default function (x, callback) {
	return x.map(e => callback(e))
}