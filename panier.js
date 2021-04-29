// Page panier JavaScript


const affichagePanier = document.getElementById("panierachat") //récupération id=panierachat
let panier = JSON.parse(localStorage.getItem("monPanier")); // variable panier
let total; //variable panier


if (panier.length > 0) {
for (let produit of panier) { 

            // on ajoute les informations des appareils dans le HTML
            affichagePanier.innerHTML += `
            <div class="row m-2 ligne-produit pt-2 border-top border-dark">
                <div class="col-lg-3">
                    <img alt="${produit.name}" class="img-fluid" src="${produit.image}">
                </div>
                <div class="col-lg-5">
                    <h2 class="mb-2">${produit.name}</h2>
                    <h3>${produit.lenses}</h3>
                    <p class="prixProduitPanier" id='${produit.name}total'><strong>Prix unitaire : <span class='chiffre-prix'>${produit.price.toFixed(2)} €</span></strong></p>   
                    <p><strong>Quantité</strong> : 
                    <input class=" col-lg-2 quantite" id="${produit.id}" type="number" value="${produit.quantity}">
                </div>
                
                 <div class="col-lg-2 col-6 mt-2"
                 <p class="prixProduitQuantite" id='${produit.name}total'><strong>Prix total : <span class='chiffre-prix-total'>${produit.total}</span></strong></p>   
              </div>
                <div class="col-lg-2 col-6 mt-2">
                    <i class="fa fa-trash"></i>  
                 </div>
            </div>
        `; 
        miseAJourTotal()


    }
// message si le panier est vide
} else {
    affichagePanier.innerHTML = `
        <div class="jumbotron jumbotron-fluid mt-4">
            <div class="container">
              <h1 class="display-4">Orinoco</h1>
              <p class="lead">Votre panier est vide ! Pensez à y ajouter des articles pour les commander.</p>
            </div>
        </div>
    `;
};

// suppression d'un article dans le panier via l'icone poubelle
let boutonSuppressionArticle = document.getElementsByClassName ('fa-trash')
for (let i = 0; i < boutonSuppressionArticle.length; i++) {
    let supprimer = boutonSuppressionArticle[i]
    supprimer.addEventListener ('click', function(event) {
        let supprimerArticle = event.target
        supprimerArticle.parentElement.parentElement.remove()
        miseAJourTotal()
        suppressionArticle(event.target.id)
    });
}

// modification de la quantité d'un article dans le panier via l'input
let modificationQuantite = document.getElementsByClassName('quantite')
for (let i = 0; i < modificationQuantite.length; i++) {
    let quantite = modificationQuantite[i]
    quantite.addEventListener ('change', changementQuantite)

}

// création de la fonction de modification de la quantité en fonction du produit
function changementQuantite(event) {
    let chiffreQuantite = event.target
    let id = chiffreQuantite.id
    if (isNaN(chiffreQuantite.value) || chiffreQuantite.value <= 0) {
    chiffreQuantite.value = 1
}
    let panier = JSON.parse(localStorage.getItem("monPanier"));
    let matchProduit = panier.find(event => event.id === id); // recherche de la présence du produit dans le panier
    if (matchProduit) {
        matchProduit.quantity = chiffreQuantite.value
        localStorage.clear(); //on vide le storage avant de le mettre à jour;
        localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier avec la nouvelle quantité de l'élément i;
    }

    miseAJourTotal()

};

// création de la fonction de suppression d'un produit dans le panier
function suppressionArticle(i) {
    console.log("suppression article i :", i);
    panier.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    window.location.reload();
}

// création de la fonction de mise à jour du total du panier ainsi que du total par article
function miseAJourTotal() {
    let lignesPanier = affichagePanier.getElementsByClassName('ligne-produit')
    total = 0
    let totalProduit
    for (let i = 0; i < lignesPanier.length; i++) {
        let ligneProduit = lignesPanier[i]
        let prixProduit = ligneProduit.getElementsByClassName('chiffre-prix')[0]
        let quantiteProduit = ligneProduit.getElementsByClassName('quantite')[0]
        let affichagePrixTotalProduit = ligneProduit.getElementsByClassName('chiffre-prix-total')[0]
        let prix = parseFloat(prixProduit.innerText.replace('€', ''))
        let quantite = quantiteProduit.value
        total = total + (prix * quantite)
        totalProduit = prix * quantite
        affichagePrixTotalProduit.innerText = totalProduit + ".00 €"

    }
let prixTotal = document.getElementsByClassName('prix-total')[0];
 prixTotal.innerText = "Total de votre commande : " + total  + ".00 €"; 
}

// méthode pour valider le panier et passer la commande 

let products = [] //initialisation de l'objet qui va contenir les id des produits 
for (let i=0; i< panier.length; i++){ //boucle pour recuperer les id 
    products.push(panier[i].id) //envoie des id dans la variable products
};

//initialisation de la variable envoyée lors de la commande avec les infos utilisateur et produits
const commandeUser = {
    contact: {},
    products: products,
}

const urlOrder = 'http://localhost:3000/api/cameras/order' // création de la variable pour relier à l'API

document.getElementById("formulaire").addEventListener("submit", function (e){
    e.preventDefault();

    //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.
    if (panier.length < 1){
        alert("Attention, votre panier est vide.");
    }
    else {
        //Récupération des champs
        let nomForm = document.getElementById("nom").value;
        let prenomForm = document.getElementById("prénom").value;
        let emailForm = document.getElementById("email").value;
        let adresseForm = document.getElementById("adresse").value;
        let villeForm = document.getElementById("ville").value;

        //Création de l'objet formulaireObjet
        commandeUser.contact = {
            firstName: prenomForm,
            lastName: nomForm,  
            address: adresseForm,
            city: villeForm,
            email: emailForm
        }    
        //Envoi des données récupérées
        const optionsFetch = {
            headers:{
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(commandeUser),         
        }   
        console.log(commandeUser)  
        fetch(urlOrder, optionsFetch).then(function(response) {
            response.json().then(function(text) {
              console.log(text.orderId);
              window.location = `confirmation.html?id=${text.orderId}&name=${prenomForm}&prix=${total}`
            });
        });
        localStorage.clear()       
    }
})




