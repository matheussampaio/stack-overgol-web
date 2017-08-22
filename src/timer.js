class Timer {
    constructor() {
        this.btnStart = $('button.start');
        this.btnPause = $('button.pause');
        this.btnReset = $('button.reset');

        this.progress = $('.progress');

        this.timer = $('.timer');
        this.timerContainer = $('.timer-container .card-content');

        this.audio = new Audio('./assets/alarm.mp3');

        this.btnStart.on('click', () => this.startTimer());
        this.btnPause.on('click', () => this.pauseTimer());
        this.btnReset.on('click', () => this.resetTimer());
    }

    resetTimer() {
        $('.timer').timer('remove');

        $('.timer').timer({
            duration: '8m00s',
            format: '%mm %ss',
            countdown: true,
            callback: () => {
                console.log('callback');
                this.progress.addClass('fadeOut');
                $('.timer-container .card-content').addClass('flash');

                this.audio.play();

                this.btnPause.hide();
                this.btnStart.hide();
                this.btnReset.show();

                document.dispatchEvent(new Event('timer-end'));
            }
        });

        $('.timer').timer('pause');
        this.timerContainer.removeClass('flash');
        this.progress.addClass('fadeOut');
        this.progress.removeClass('fadeIn');

        this.btnPause.hide();
        this.btnReset.hide();
        this.btnStart.show();

        this.audio.pause();

        document.dispatchEvent(new Event('timer-reset'));
    }

    startTimer() {
        this.btnStart.hide();
        this.btnReset.hide();
        this.btnPause.show();

        $('.timer').timer('resume');
        this.progress.removeClass('fadeOut');
        this.progress.addClass('fadeIn');

        document.dispatchEvent(new Event('timer-start'));
    }

    pauseTimer() {
        this.btnPause.hide();
        this.btnStart.show();
        this.btnReset.show();

        $('.timer').timer('pause');
        this.progress.addClass('fadeOut');
        this.progress.removeClass('fadeIn');

        document.dispatchEvent(new Event('timer-pause'));
    }

    getSeconds() {
        return $('.timer').data('seconds');
    }
}

module.exports = Timer;
