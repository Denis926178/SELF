const g = 9.81;
var nu_start = Math.sqrt(g) / (2 * Math.PI * Math.sqrt(4));
var T = document.getElementById("period");
var delta_nu = 1 / T;

class App {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.periodE1 = document.getElementById("period");
        this.amplitudeE1 = document.getElementById("amplitude");
        this.countE1 = document.getElementById("count");
        this.sizeE1 = document.getElementById("_size");
        this.interval = 30
        this.run = false;
        this.button = document.getElementById("go");

        this.button.addEventListener('click', () => {
            if (this.run) {
                clearInterval(this.timer);
            }
            else if (this.validateData()) {
                const data = this.getData();

                if (this.Ball) {
                    data.time = this.Ball.time;
                }
                this.Ball = new Ball(50, 50, data.size, data.period, data.amplitude);
                console.log("1");
                if (isFinite(data.time)) {
                    this.Ball.time = data.time;
                }
                this.timer = setInterval(() => this.redraw(), this.interval);
            }

            this.run = !this.run;
        });
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    redraw() {
        this.clear();
        this.Ball.draw(this.context, this.interval);
    }

    getData() {
        console.log("2");
        const period = parseFloat(this.periodE1.value);
        const amplitude = parseFloat(this.amplitudeE1.value);
        const count = parseFloat(this.countE1.value);
        const size = parseFloat(this.sizeE1.value);

        if (isFinite(period) && isFinite(amplitude) && isFinite(count) && isFinite(size))
            return {
                period: period,
                amplitude: amplitude,
                count: count,
                size: size
            };
        else
            return null;
    }

    validateData() {
        const data = this.getData();
        console.log("3");
        if (data === null) {
            alert("Одно или несколько полей заполнены непраивльно или не заполнены совсем!");
            return false;
        }
        else {
            if (data.period < 1 || data.period > 100) {
                alert("Период должен быть в пределах от 1 до 100!");
                return false;
            }
            if (data.amplitude < 1 || data.amplitude > 100) {
                alert("Амплитуда должна быть в пределах от 1 до 100!");
                return false;
            }
            if (data.count < 1 || data.count > 100) {
                alert("Количество должно быть в пределах от 1 до 100!");
                return false;
            }
            if (data.size < 1 || data.size > 100) {
                alert("Размер должен быть в пределах от 1 до 100!");
                return false;
            }
        }
        console.log(data.size);
        return true;
    }
}

class Ball {
    constructor(x0, y0, size, period, amplitude) {
        this.x = x0;
        this.y = y0;
        this.size = size;
        this.time = 0;
        this.period = period;
        this.amplitude = amplitude;
    }

    getTime() {
        return this.time / 1000;
    }

    drawBall(context) {
        console.log("Y:", this.y);
        const gradient = context.createRadialGradient(this.x, this.y, this.size, this.x - 2, this.y - 4, 2);

        gradient.addColorStop(0, '#333');
        gradient.addColorStop(1, '#999');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        context.fill();
    }

    calcY() {
        return this.amplitude * Math.sin(Math.PI / 2 + this.getTime() * this.period / (2 * Math.PI));
    }

    draw(context, interval) {
        this.time += interval;
        this.x = 100;

        for (let i = 0; i < 3; i++) {
            this.x += 100;
            this.y = this.calcY();
            console.log(this.x, this.y);
            this.drawBall(context);
        }
    }
}

window.onload = () => {
    new App();
}