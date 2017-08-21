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
