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
