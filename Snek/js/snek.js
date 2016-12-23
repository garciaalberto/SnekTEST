var serpiente;
var escala = 20;
var lado = "RIGHT"
var fruta;

function setup() {
    createCanvas(1000, 600);
    serpiente = new Serpiente();
    frameRate(10);
    seleccionarLocalizacion();
}

function seleccionarLocalizacion() {
    var columnas = floor(width / escala);
    var filas = floor(height / escala);
    fruta = createVector(floor(random(columnas)), floor(random(filas)));
    fruta.mult(escala);
}

function draw() {
    background("#088A08");

    if (serpiente.comer(fruta)) {
        seleccionarLocalizacion();
    }
    serpiente.muerte();
    serpiente.actualizar();
    serpiente.mostrar();


    fill("purple");
    rect(fruta.x, fruta.y, escala, escala);
}

function keyPressed() {
    if (keyCode === UP_ARROW && lado != "DOWN") {
        serpiente.direccion(0, -1);
        lado = "UP";
    } else if (keyCode === DOWN_ARROW && lado != "UP") {
        serpiente.direccion(0, 1);
        lado = "DOWN";
    } else if (keyCode === RIGHT_ARROW && lado != "LEFT") {
        serpiente.direccion(1, 0);
        lado = "RIGHT";
    } else if (keyCode === LEFT_ARROW && lado != "RIGHT") {
        serpiente.direccion(-1, 0);
        lado = "LEFT";
    }
}


function Serpiente() {
    this.x = 0;
    this.y = 0;
    this.xvelocidad = 1;
    this.yvelocidad = 0;
    this.total = 0;
    this.cola = [];

    this.comer = function(posicion) {
        var d = dist(this.x, this.y, posicion.x, posicion.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.direccion = function(x, y) {
        this.xvelocidad = x;
        this.yvelocidad = y;
    }

    this.muerte = function() {
        for (var i = 0; i < this.cola.length; i++) {
            var posicion = this.cola[i];
            var d = dist(this.x, this.y, posicion.x, posicion.y);
            if (d < 1) {
                location.reload(true);
            }
        }
    }

    this.actualizar = function() {
        if (this.total === this.cola.length) {
            for (var i = 0; i < this.cola.length - 1; i++) {
                this.cola[i] = this.cola[i + 1];
            }
        }
        this.cola[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xvelocidad * escala;
        this.y = this.y + this.yvelocidad * escala;

        this.x = constrain(this.x, 0, width - escala);
        this.y = constrain(this.y, 0, height - escala);
    }

    this.mostrar = function() {
        fill("#2EFE2E");
        for (var i = 0; i < this.cola.length; i++) {
            rect(this.cola[i].x, this.cola[i].y, escala, escala);
        }
        rect(this.x, this.y, escala, escala);

    }
}