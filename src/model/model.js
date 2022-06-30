import * as tf from '@tensorflow/tfjs'
import calcWithTraining from './calcWithTraining';

const model = async () => {
	const X = [-1, 0, 1, 2, 3, 4];
	const Y = calcWithTraining(X, (e) => (2*e)-1)

	const xs = tf.tensor2d(X, [6, 1])
	const ys = tf.tensor2d(Y, [6, 1])

	const model = tf.sequential()
	
	model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
	model.compile({ loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['accuracy'] })
	await model.fit(xs, ys, {
		epochs: 350,
		callbacks: [
			{
				onEpochEnd: async (epoch, logs) => {
					console.log('Epoch:' + epoch + ' Loss:' + logs.loss)
				}
			}
		],
	})
	return model
}
export default model