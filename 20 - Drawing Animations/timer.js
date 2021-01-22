class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		// this.timeLeft = 30;

		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}
	start = (evt) => {
		// if (!this.intervalId) {
		// 	this.tick();
		// 	this.intervalId = setInterval(this.tick, 1000);
		// }
		if (this.onStart) {
			this.onStart();
		}
		this.tick();
		this.intervalId = setInterval(this.tick, 1000);
	};
	tick = () => {
		// this.timeLeft -= 1;
		// if (this.timeLeft === 0) {
		//     this.pause();
		//     this.timeLeft = 30;
		// }
		// this.durationInput.value = this.timeLeft;
		// console.log('Tick');
		if (this.timeRemaining <= 0) {
			if (this.onComplete) {
				this.onComplete();
			}
			this.pause();
		} else {
			if (this.onTick) {
				this.onTick();
			}
			this.timeRemaining = this.timeRemaining - 1;
		}
	};
	pause = () => {
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	};
	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}
	set timeRemaining(time) {
		this.durationInput.value = time;
	}
}
