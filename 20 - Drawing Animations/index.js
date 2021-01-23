const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;

circle.setAttribute('stroke-dasharray', perimeter);

const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart() {
		console.log('Timer started');
	},
	onTick(percentage) {
		// console.log('Timer just ticked down ', percentage);
		circle.setAttribute('stroke-dashoffset', (percentage - 1) * perimeter);
	},
	onComplete() {
		console.log('Timer is completed');
	}
});
