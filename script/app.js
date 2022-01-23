function copy(str) {
    const element = document.createElement('textarea')
    element.value = str;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);    
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext("2d"); // Le "context" est en quelque sorte un "stylo". C'est grâce à lui que l'on peut dessiner des formes (carrés, ronds, points, lignes ...) dans l'élément <canvas>


// Stockage du nb de pixels en largeur et hauteur dans 2 constantes
const LARGEUR = window.innerWidth;
const HAUTEUR = 690;
// Configuration de la couleur des étoiles (valeur correspondant au cercle chromatique)
const COULEUR_ETOILES = 70;

// Grâce à ces valeurs, on indique à notre zone de dessin (le <canvas>) qu'elle aura 800x600 pixels en tout.
canvas.width = LARGEUR;
canvas.height = HAUTEUR;

// Création d'un tableau qui stockera des "objets" étoile
var tableau_etoiles = [];
// Création d'un objet 'souris' qui contiendra les positions de la souris à l'écran (voir en bas du script JS)
var souris = {
	x : 0,
	y : 0
};

// Génération de 200 étoiles avec des valeurs aléatoires dans ce tableau.
const NOMBRE_ETOILES = 50;
for (var i = 0; i < NOMBRE_ETOILES; i++) {
	
	// Le rapport taille/vitesse de chaque étoile sera proportionnel (on ne copie la valeur que pour des raisons de lisibilité du code source)
	var taille = hasard(1, 8);
	var vitesse = taille;

	var intensite_couleur = (taille/5) * 100; // petite règle de 3 : l'intensité de la couleur dépend de la taille

	tableau_etoiles.push({
		x : hasard(0, LARGEUR),
		y : hasard(0, HAUTEUR),
		taille : taille,
		vitesse : vitesse,
		couleur : 'hsl('+ COULEUR_ETOILES +', '+ intensite_couleur +'%, 50%)'
	});
}

// Grâce à requestAnimationFrame(), cette fonction 'animation' va boucler à l'infinie environ 60 fois par secondes ...
function animation() {
	requestAnimationFrame(animation);
	
	// ... tout le code présent dans cette fonction va donc s'exécuter continuellement à une fréquence de 60 fois par secondes (environ : cela dépend du processeur graphique)
	
	// 60 fois par seconde donc, on va parcourir chacune des étoiles, pour modifier leur déplacement, et les dessiner sur l'écran.

	// D'abord, on efface intégralement le canvas
	context.clearRect(0, 0, LARGEUR, HAUTEUR);
	
	for (var i = 0; i < tableau_etoiles.length; i++) {
		var etoile = tableau_etoiles[i];
		
		// Mouvement de l'étoile (un peu de Math, mais ça relève plus de la bidouille au final) :
		etoile.x += etoile.vitesse * ((souris.x - LARGEUR/2)/LARGEUR);
		etoile.y += etoile.vitesse * ((souris.y - HAUTEUR/2)/HAUTEUR);

		// Gestion du débordement écran :
		// Si l'étoile sort à droite ou a gauche du canvas, on change son 'x' vers le côté opposé
		if (etoile.x > LARGEUR) {
			etoile.x = 0;
		}
		else if (etoile.x < 0) {
			etoile.x = LARGEUR;
		}

		// Si l'étoile sort en haut ou en bas du canvas, on change son 'y' vers le côté opposé
		if (etoile.y > HAUTEUR) {
			etoile.y = 0;
		}
		else if (etoile.y < 0) {
			etoile.y = HAUTEUR;
		}

		// Dessin de l'étoile (c'est un simple carré) sur le canvas en utilisant ses coordonnées
		context.fillStyle = etoile.couleur; // Définition de la couleur de dessin
		context.fillRect(etoile.x, etoile.y, etoile.taille, etoile.taille);
	}
}

// Démarrage !!!
animation();

// Petite fonction utilitaire permettant de tirer un nombre au hasard entre 'min' et 'max'
function hasard(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
