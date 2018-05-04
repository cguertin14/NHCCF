module.exports = class Rectangle {
    constructor(hauteur, largeur) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.allo = "Hey!";
    }

    get area() {
        return this.calcArea();
    }

    set largeur(largeur) {
        this.largeur = largeur;
    }

    set hauteur(hauteur) {
        this.hauteur = hauteur;
    }

    calcArea() {
        return this.largeur * this.hauteur;
    }
}

const carré = new Rectangle(10, 10);

console.log(carré.area);