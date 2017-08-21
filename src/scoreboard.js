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
