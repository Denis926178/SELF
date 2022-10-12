const g = 9.81;

class App {
    constructor() {
        var flag = 0;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = canvas.offsetWidth;
        this.canvas.height = canvas.offsetHeight;

        this.lengthE1 = document.getElementById("_length");
        this.frequencyE1 = document.getElementById("frequency");
        this.amplitudeE1 = document.getElementById("amplitude");
        this.countE1 = document.getElementById("count");
        this.sizeE1 = document.getElementById("_size");

        this.range_lengthE1 = document.getElementById("range_length");
        this.range_frequencyE1 = document.getElementById("range_frequency");
        this.range_amplitudeE1 = document.getElementById("range_amplitude");
        this.range_countE1 = document.getElementById("range_count");
        this.range_sizeE1 = document.getElementById("range_size");

        this.interval = 30
        this.run = false;
        this.button_go = document.getElementById("go");
        this.button_stop = document.getElementById("stop");

        this.button_go.addEventListener('click', () => {
           if (!flag && this.validateData()) {
                this.disableInputFields();
                const data = this.getData();

                if (this.Ball) {
                    data.time = this.Ball.time;
                }
                this.Ball = new Ball(50, 50, data.size, data.length, data.frequecy, data.amplitude);
                
                if (isFinite(data.time)) {
                    this.Ball.time = data.time;
                }

                this.timer = setInterval(() => this.redraw(), this.interval);
            }

            this.run = 1;
            flag = 1;
        });
    
        this.button_stop.addEventListener('click', () => {
            if (this.run) {
                this.enableInputFields();
                clearInterval(this.timer);
            }
            flag = 0;
            this.run = 0;
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
        const length = parseFloat(this.lengthE1.value);
        const frequency = parseFloat(this.frequencyE1.value);
        const amplitude = parseFloat(this.amplitudeE1.value);
        const count = parseFloat(this.countE1.value);
        const size = parseFloat(this.sizeE1.value);

        if (isFinite(length) && isFinite(frequency) && isFinite(amplitude) && isFinite(count) && isFinite(size))
            return {
                length: length,
                frequency: frequency,
                amplitude: amplitude,
                count: count,
                size: size
            };
        else
            return null;
    }

    validateData() {
        const data = this.getData();
        if (data === null) {
            alert("Одно или несколько полей заполнены непраивльно или не заполнены совсем!");
            return false;
        }
        else {
            if (data.length < 1 || data.length > 100) {
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
        return true;
    }

    enableInputFields() {
        this.lengthE1.removeAttribute('disabled');
        this.frequencyE1.removeAttribute('disabled');
        this.amplitudeE1.removeAttribute('disabled');
        this.countE1.removeAttribute('disabled');
        this.sizeE1.removeAttribute('disabled');

        this.range_lengthE1.removeAttribute('disabled');
        this.range_frequencyE1.removeAttribute('disabled');
        this.range_amplitudeE1.removeAttribute('disabled');
        this.range_countE1.removeAttribute('disabled');
        this.range_sizeE1.removeAttribute('disabled');
    }

    disableInputFields() {
        this.lengthE1.setAttribute('disabled', 'disabled');
        this.frequencyE1.setAttribute('disabled', 'disabled');
        this.amplitudeE1.setAttribute('disabled', 'disabled');
        this.countE1.setAttribute('disabled', 'disabled');
        this.sizeE1.setAttribute('disabled', 'disabled');

        this.range_lengthE1.setAttribute('disabled', 'disabled');
        this.range_frequencyE1.setAttribute('disabled', 'disabled');
        this.range_amplitudeE1.setAttribute('disabled', 'disabled');
        this.range_countE1.setAttribute('disabled', 'disabled');
        this.range_sizeE1.setAttribute('disabled', 'disabled');
    }
}

class Ball {
    constructor(x0, y0, size, length, frequency, amplitude) {
        this.x = x0;
        this.y = y0;
        this.size = size;
        this.time = 0;
        this.length = length;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.count = parseFloat(document.getElementById("count").value);
        this.between_distance = parseFloat(document.getElementById("canvas").width) / (this.count + 1);
    }

    getTime() {
        return this.time / 1000;
    }

    drawBall(context) {
        const gradient = context.createRadialGradient(this.x, this.y, this.size, this.x - 2, this.y - 4, 2);

        gradient.addColorStop(0, '#333');
        gradient.addColorStop(1, '#999');

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        context.fill();
    }

    calcY() {
        return this.amplitude * Math.sin(Math.PI / 2 + this.time * this.length / (2 * Math.PI));
    }

    draw(context, interval) {
        this.time += interval / 300;
        this.x = this.between_distance;
        
        const HEIGHT = parseFloat(document.getElementById("canvas").height) / 2;
        const LENGTH = parseFloat(document.getElementById("_length").value);
        const FRECUENCY = parseFloat(document.getElementById("frequency").value);
        const START_FREQUENCY = 1 / (Math.PI * 2 * Math.sqrt(LENGTH / g));

        console.log(START_FREQUENCY);
        console.log(FRECUENCY);

        for (let i = 0; i < this.count; i++) {
            this.length = Math.pow(2 * Math.PI * (i * FRECUENCY + START_FREQUENCY), 2) / g;
            this.y = HEIGHT + this.calcY();
            console.log(this.length);
            this.drawBall(context);
            this.x += this.between_distance;
        }
    }
}

window.onload = () => {
    new App();
}