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
