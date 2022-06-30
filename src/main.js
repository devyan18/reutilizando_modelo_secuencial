import * as tf from '@tensorflow/tfjs'
import Swal from 'sweetalert2'
import model from "./model/model"


const btn = document.getElementById('btnCalc')
const message = document.getElementById('message')
document.getElementById('form').addEventListener('submit', handleSubmitForm)

let modelTraining;
document.addEventListener('DOMContentLoaded', () => {
	btn.classList.add('disabled')
	message.innerHTML = "<p>El modelo se está entrenando...</p>"
	model()
		.then(e => {
			modelTraining = e
			btn.classList.remove('disabled')
			message.innerHTML = '<p>El modelo está listo para usarse!</p>'
		})
})

function handleSubmitForm(e) {
	e.preventDefault()
	let X = document.getElementById('numberX').value
	X = parseInt(X)
	const X2DTensor = tf.tensor2d([X], [1,1])
	const result = modelTraining.predict(X2DTensor)

	Swal.fire(
		`El resultado es: ${result.dataSync()}`,
		'You clicked the button!',
		'success'
	)
}