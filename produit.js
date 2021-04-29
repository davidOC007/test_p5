
const params = new URLSearchParams(window.location.search)
const itemId = params.get("id")

const descriptionProduit = document.getElementById("produit")

const listeProduits = 'http://localhost:3000/api/cameras' 

fetch(listeProduits + '/' + itemId)
    .then(response => 
        response.json())
    .then(data => {
        
        

        //--Ecriture du HTML dans le DOM en dynamique
        descriptionProduit.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <form>
                        <div class="col-auto my-1 pb-5 mt-4">
                        <label for="lense-select">Objectif: </label>
                        <select class="options__select" name="lenses" id="lense_select" required >
                            <option value="">--Taille de lentille--</option>
                        </select>       
                        </div>
                        <p><strong>Prix total</strong> : <span id="totalPrice">${data.price /100}</span> .00€</p>
                        <button id="boutonAjout" type="button" class="btn btn-secondary">Ajouter au panier</button>
                    </form>   
                </div>
                `;

// Ajout de l'option lentilles dans le menu select
  for (let i = 0; i < data.lenses.length ; i++ ){
    const option = document.createElement("option");              //création de <option>
    option.value = `${data.lenses[i]}`;                           // ça récupère l'index du tableau 
    option.innerHTML = `${data.lenses[i]}`;                      // le nom de la lentille est ajouté à <option> 
    document.getElementById("lense_select").appendChild(option);  //ça ajoute <option> en enfant de l'id #lense-select 
  };





                
    

        const ajoutPanier = document.getElementById('boutonAjout');
        ajoutPanier.addEventListener('click', function() {
            ajoutAuPanier()
        });

    function ajoutAuPanier() { 

        // variable produit ajouté au panier 
                    let produitAjoute = {
                        name: data.name,
                        id: data._id,
                        quantity: 1,
                        image: data.imageUrl,
                        price: data.price / 100,
                        total: data.price / 100
                    };
                                           
        // creation de l'evenement 'ajouter au panier'  
        let panier = JSON.parse(localStorage.getItem("monPanier"));
        if (!panier) { console.log(panier = []) } ;  //initialisation du panier s'il n'exite pas encore
                        
        let produitPresent = panier.find(data => data.name == produitAjoute.name);  //verification si l'objet selectionné existe deja dans le panier
        if (produitPresent){ // si oui modification de la quantité et du prix du produit dans le panier 
            produitPresent.quantity ++;
            produitAjoute.total = produitAjoute.price * produitPresent.quantity
            localStorage.setItem('monPanier', JSON.stringify(panier));
            alert (`Votre produit a bien été ajouté au panier`)
            console.log (panier)          
                                    
        }else{ // si non, push du produit dans le panier
            panier.push(produitAjoute);  
            localStorage.setItem('monPanier', JSON.stringify(panier));                                
            alert (`Votre produit a bien été ajouté au panier`)
            console.log(panier)          
          

        };                                
    }
});