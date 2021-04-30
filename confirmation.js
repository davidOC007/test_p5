// RÉCUPÉRATION DES INFORMATIONS
let recupContact = JSON.parse(localStorage.getItem("Contact"));
let recupOrderId = JSON.parse(localStorage.getItem("Order Id"));
let recupPrixTotal = JSON.parse(localStorage.getItem("Prix Total"));

let felicitations = document.getElementById("felicitations");
let commandeValide = document.getElementById("commande_valide");
commandeValide.style.color = "green"; 
let prixTotal = document.getElementById("prix_total");
let adresse = document.getElementById("adresse");
let mailConfirmation = document.getElementById("mail_confirmation");
let btnRetourAccueil = document.getElementById("retour_accueil");

felicitations.textContent = "Félicitations " + recupContact.firstName + " " + recupContact.lastName + " !";
commandeValide.textContent = "Votre commande " + recupOrderId + " est validée !";
prixTotal.textContent = recupPrixTotal;
adresse.textContent = recupContact.address + ", " + recupContact.city;
mailConfirmation.textContent = "Un mail récapitulatif est envoyé à l'adresse suivante : " + recupContact.email;



// Vanille JavaScript - supprimer les clés du LocalStorage
window.onbeforeunload = function() {
    localStorage.removeItem("Order Id");
    localStorage.removeItem("Contact");
    localStorage.removeItem("Prix Total");
};