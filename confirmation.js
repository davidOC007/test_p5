let paramsConfirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("nomcommande");
let prixConfirmation = document.getElementById("prixcommande");
let idConfirmation = document.getElementById("idcommande");

nameConfirmation.textContent = paramsConfirmation.get('name');
prixConfirmation.textContent = paramsConfirmation.get('prix');
idConfirmation.textContent = paramsConfirmation.get('id');