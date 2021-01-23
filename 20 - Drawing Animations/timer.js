class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		this.totalTimer = 0;

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
		if (this.onStart) {
			this.totalTimer = this.timeRemaining;
			this.onStart(this.totalTimer);
		}
		if (!this.intervalId) {
			this.tick();
			this.intervalId = setInterval(this.tick, 50);
		}
	};
	tick = () => {
		if (this.timeRemaining <= 0) {
			if (this.onComplete) {
				this.onComplete();
			}
			this.pause();
		} else {
			this.timeRemaining = this.timeRemaining - 0.05;
			if (this.onTick) {
				let percentage = this.timeRemaining / this.totalTimer;
				this.onTick(percentage);
			}
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
		this.durationInput.value = time.toFixed(2);
	}
}
