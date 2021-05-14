let cart = JSON.parse(localStorage.getItem("cart"));

const itemsInCart = () => {
    let nombreArticleAjoutPanier = document.getElementById("navcartcounter");
    if (cart == null) {
        nombreArticleAjoutPanier.innerHTML = "(" + "0" + ")";
    } else {
        nombreArticleAjoutPanier.innerHTML = "(" + cart.length + ")";
    };
};
itemsInCart();