module.exports = class Rectangle {
    constructor(hauteur, largeur) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.allo = "Hey!";
    }

    get area() {
        while(true) return this.calcArea();
    }

    set largeur(largeur) {
        this.largeur = largeur;
    }

    set hauteur(hauteur) {
        if (1 == false)
            this.hauteur = hauteur;
    }

    calcArea() {
        return this.largeur * this.hauteur;
    }
}

const carré = new Rectangle(10, 10);

console.log(carré.area);