const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");


const attributes = document.getElementById("produit")

const productList = 'http://localhost:3000/api/cameras'

fetch(productList + '/' + itemId)
    .then(response =>
        response.json())
    .then(data => {
        attributes.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid img-thumbnail" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <form>
                    <div class="col-auto my-1 pb-5 mt-4">
                    <label class="labelLentilles" for="lentilles">Votre choix de lentille:</label><br/>
                    <select name="lentilles" id="lentilles"></select> 
                </div>
                        <p><strong>Prix unitaire</strong> : <span id="totalPrice">${data.price /100}</span> .00€</p>
                        <button id="addButton" type="button" class="btn btn-secondary">Ajouter au panier</button>
                    </form>   
                </div>
                
                `;


        //Ajout de l'option
        let lenses = document.getElementById("lentilles")
        data.lenses.forEach(lens => {
            let option = document.createElement("option")
            option.textContent = lens;
            lenses.appendChild(option);
        })



        const button = document.getElementById("addButton");
        button.addEventListener("click", function() {
            addToCart()
        });

        function addToCart() {

            // Variable produit sélectionné 
            let selectedItem = {
                name: data.name,
                id: data._id,
                quantity: 1,
                image: data.imageUrl,
                price: data.price / 100,
                total: data.price / 100
            };

            let cart = JSON.parse(localStorage.getItem("cart"));
            if (!cart) {
                console.log(cart = [])
            }; //initialisation du panier s'il n'existe pas encore


            if (selectedItem) {
                cart.push(selectedItem);
                localStorage.setItem("cart", JSON.stringify(cart));
               alert("Votre produit a bien été ajouté au panier")
              


                // Nombre d'articles dans le panier
                const itemsInCart = () => {
                    let nombreArticleAjoutPanier = document.getElementById("navcartcounter");
                    if (cart == null) {
                        nombreArticleAjoutPanier.innerHTML = "(" + "0" + ")";
                    } else {
                        nombreArticleAjoutPanier.innerHTML = "(" + cart.length + ")";
                    };
                };
                itemsInCart();

            };


        }
    });