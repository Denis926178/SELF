function main() {
    g = 9.81;
    l0 = 4;

    class Ball {
        __init__(this, canv, x, y, r, l, i) {
            this.context = this.canv.getContext("2d");
            this.id = i;
            this.x = x;
            this.y = y;
            this.r = r;
            this.canv = canv;
            this.canv.lineWidth = 7; 
            this.canv.strokeStyle = "green"; 
            this.canv.item = canv.arc(x, y, r, 0, 360, false);
            this.play = false;

            this.l = l;
            this.t = 0;
        }

        update(this) {
            this.canv.after(30, this.update);
            nu_start = sqrt(g) / (2 * pi * sqrt(l0));
            delta_nu = 1 / period_s.getElementById(period);
            this.l = g / ((4 * pi ** 2) * (nu_start + delta_nu * this.id) ** 2);
            this.r = size_s.getElementById(size);
            off = 700 / (count_s.getElementById(count) + 1);
            this.x = off + this.r + this.id * off;
            A = amplitude_s.getElementById(amplitude);
            this.y = 250 - A * sin(this.t * sqrt(g / this.l) + pi / 2);
            this.canv.coords(this.item, this.x + this.r, this.y + this.r, this.x - this.r, this.y - this.r);

            if (this.play) {
                this.t += 0.03;
            }
        }
    }

    var balls = [];
    for (let i = 0; i < 252; i++) {
        off = 700 / (count_s.getElementById(count) + 1);
        x0 = off + size_s.getElementById(size) + i * off;
        A = amplitude_s.getElementById(amplitude);
        r0 = size_s.getElementById(size);
        length = g / ((4 * pi ** 2) * (nu_start + delta_nu * i) ** 2);
        B = Ball(draw_c, x0, A, r0, length, i);
        balls.push(B);
        draw_c.after_idle(balls[i].update);
    }

    function play() {
        if (play_b['text'] === "Старт") {
            play_b['text'] = "Стоп";
            for (let i = 0; i < balls.length; i++) {
                balls[i].play = true;
            }
        }
        else {
            play_b['text'] = "Старт"
            for (let i = 0; i < balls.length; i++) {
                balls[i].play = false;
            }
        }
    }

    function stop() {
        play_b['text'] = "Старт"
        for (let i = 0; i < 252; i++) {
            balls[i].play = false;
        }
        balls[i].t = 0;
        balls[i].y = 250 - A * sin(balls[i].t * sqrt(g / balls[i].l) + pi / 2);
        balls[i].canv.coords(balls[i].item, balls[i].x + balls[i].r, balls[i].y + balls[i].r, balls[i].x - balls[i].r, balls[i].y - balls[i].r);
    }


    play_b['command'] = play;
    stop_b['command'] = stop;
}