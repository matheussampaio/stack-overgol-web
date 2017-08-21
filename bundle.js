(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class History {
    constructor() {
        this.history = $('.history');
    }

    addHistoryItem({ matches, scoreboard, time }) {
        let classA = "loss";
        let classB = "loss"; scoreboard.scores.a < scoreboard.scores.b ? "won" : "loss";

        if (scoreboard.scores.a > scoreboard.scores.b) {
            classA = "won";

            if (matches.victories.a >= 2) {
                classA = "max-victoires";
            }
        }

        if (scoreboard.scores.a < scoreboard.scores.b) {
            classB = "won";

            if (matches.victories.b >= 2) {
                classB = "max-victoires";
            }
        }

        const teamA = `${ matches.teams[0] } (${ matches.victories.a })`;
        const teamB = `${ matches.teams[1] } (${ matches.victories.b })`;

        const timestamp = `${ Math.floor(time / 60) }m ${time % 60}s`;
        const html = `
            <tr>
                <td>${ timestamp }</td>
                <td class="${ classA }">${ teamA }</td>
                <td>${ scoreboard.scores.a }</td>
                <td>${ scoreboard.scores.b }</td>
                <td class="${ classB }">${ teamB }</td>
            </tr>
        `;

        this.history.show();

        if ($('tbody tr:first').length) {
            $('tbody tr:first').before(html);
        } else {
            $('tbody').append(html);
        }
    }
}

module.exports = History;

},{}],2:[function(require,module,exports){
const Timer = require('./timer');
const Matches = require('./matches');
const History = require('./history');
const Scoreboard = require('./scoreboard');

let timer = null;
let matches = null;
let history = null;
let scoreboard = null;

$(document).ready(init)

function init() {
    timer = new Timer();
    matches = new Matches();
    history = new History();
    scoreboard = new Scoreboard();

    reset(true);

    document.addEventListener('team-a-won', matchFinished);
    document.addEventListener('team-b-won', matchFinished);
    document.addEventListener('timer-end', matchFinished);
}

function reset(resetTimer = false) {
    if (resetTimer) {
        timer.resetTimer();
    }

    scoreboard.reset({
        teamA: matches.teams[0],
        teamB: matches.teams[1],
        teamAVictories: matches.victories.a,
        teamBVictories: matches.victories.b
    });

    $('.next-match .team').html(matches.teams[2]);
}

function matchFinished(event) {
    history.addHistoryItem({ matches, scoreboard, time: timer.getSeconds() });

    const result = matches.next(scoreboard);

    scoreboard.showTitle(result);

    const stopTimer = event.type !== 'timer-end';

    reset(stopTimer);
}

},{"./history":1,"./matches":3,"./scoreboard":4,"./timer":5}],3:[function(require,module,exports){
class Matches {
    constructor() {
        // TODO: Fetch from firebase
        const data = {
            Azul: [],
            Branco: [],
            Verde: [],
            Vermelho: []
        };

        this.teams = Object.keys(data);

        this.victories = {
            a: 0,
            b: 0
        };

        this.MAX_VICTORIES = 3;
    }

    next({ scores }) {
        if (scores.a === scores.b) {
            this.draw();
        } else if (scores.a > scores.b) {
            this.victoryA();
        } else if (scores.a < scores.b) {
            this.victoryB();
        }

        // 0 if draw, negative if B won, positive if A won
        const diff = scores.a - scores.b

        if (diff > 0) {
            return `${this.teams[0]} won!`;
        } else if (diff < 0) {
            return `${this.teams[1]} won!`;
        } else {
            return 'Draw!';
        }
    }

    draw() {
        this.victories.a = 0;
        this.victories.b = 0;

        if (Math.random() >= 0.50) {
            this.setOrder(2, 3, 0, 1);
        } else {
            this.setOrder(2, 3, 1, 0);
        }
    }

    victoryA() {
        this.victories.a += 1;
        this.victories.b = 0;

        if (this.victories.a >= this.MAX_VICTORIES) {
            this.draw();
        } else {
            this.setOrder(0, 2, 3, 1);
        }
    }

    victoryB() {
        this.victories.a = 0;
        this.victories.b += 1;

        if (this.victories.b >= this.MAX_VICTORIES) {
            this.draw();
        } else {
            this.setOrder(2, 1, 3, 0);
        }
    }

    setOrder(a, b, c, d) {
        this.teams = [
            this.teams[a],
            this.teams[b],
            this.teams[c],
            this.teams[d]
        ];
    }
}

module.exports = Matches;

},{}],4:[function(require,module,exports){
class Scoreboard {
    constructor() {
        this.scores = {
            a: 0,
            b: 0
        };

        this.scoreA = $('.team-a .score');
        this.scoreB = $('.team-b .score');

        this.teamA = $('.team-a .team');
        this.teamB = $('.team-b .team');

        this.title = $('.scoreboard-container .card-title.won');

        this.btnGolA = $('button.gol-a');
        this.btnGolB = $('button.gol-b');

        this.btnGolA.on('click', () => this.golTeamA());
        this.btnGolB.on('click', () => this.golTeamB());

        document.addEventListener('timer-start', () => {
            this.btnGolA.removeClass('disabled');
            this.btnGolB.removeClass('disabled');
            this.title.hide();
        });

        const events = ['team-a-won', 'team-b-won', 'timer-end', 'timer-pause', 'timer-end'];

        events.forEach((event) => {
            document.addEventListener(event, () => {
                this.btnGolA.addClass('disabled');
                this.btnGolB.addClass('disabled');
            });
        });
    }

    golTeamA() {
        this.scores.a += 1;

        if (this.scores.a >= 2) {
            document.dispatchEvent(new Event('team-a-won'));
        }

        this.drawScores();
    }

    golTeamB() {
        this.scores.b += 1;

        if (this.scores.b >= 2) {
            document.dispatchEvent(new Event('team-b-won'));
        }

        this.drawScores();
    }

    drawScores() {
        this.scoreA.html(this.scores.a);
        this.scoreB.html(this.scores.b);
    }

    showTitle(text) {
        this.title.show();
        this.title.html(text);
    }

    reset({ teamA, teamB, teamAVictories, teamBVictories }) {
        this.scores.a = 0;
        this.scores.b = 0;

        this.scoreA.html(this.scores.a);
        this.scoreB.html(this.scores.b);

        this.teamA.html(`${teamA} (${teamAVictories})`);
        this.teamB.html(`${teamB} (${teamBVictories})`);
    }
}

module.exports = Scoreboard;

},{}],5:[function(require,module,exports){
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
            duration: '0m05s',
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

},{}]},{},[2]);
