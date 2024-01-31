// Récupération des données trips dans le panier

let pressCart = document.querySelector("#cartPage");

// Ajout des trips selectionnés 

fetch(`http://localhost:3000/bookings/cart`)
        .then(response => response.json())
        .then((bookings) => {
            console.log(bookings)
            visualiseCart(bookings);
            upDeleteCart(bookings);
        })

function visualiseCart(bookings) {
    document.querySelector("#basket-container").innerHTML = '';
    console.log(bookings.result)
    if (bookings.result) {
        let sum = 0;
        for (let i in bookings.bookings) {

            console.log(bookings[i])

            const datefmt = new Date(bookings.bookings[i].trip.date);
            let tripHour = `${datefmt.getHours()}h${(datefmt.getMinutes() < 10 ? '0' : '') + datefmt.getMinutes()}`;
            sum += bookings.bookings[i].trip.price;
            document.querySelector("#basket-container").innerHTML += `
                <div class="voyage">
                    <div class="dep-arr">${bookings.bookings[i].trip.departure} > ${bookings.bookings[i].trip.arrival}</div>
                    <div class="horaire">${tripHour}</div>
                    <div class="price">${bookings.bookings[i].trip.price} €</div>
                    <button class="button-close">X</button>
                </div>
                `;
        }
        document.querySelector("#basket-container").innerHTML += 
        `<div id="total-container">
            <h3>Total: ${sum} €</h3>
            <button>Purcharse</button>
        </div>`
    } else {
        document.querySelector("#basket-container").innerHTML = `
                <img class="train-img" src="./images/notfound.png" alt="train" />
                <h6>No trip found</h6>
            `;
    }
}
 /*
function upDeleteCart(bookings) {
    for (let i = 0; i < document.querySelectorAll('.button-close').length; i++) {
        document.querySelectorAll('.button-close')[i].addEventListener('click', function () {
            fetch(`http://localhost:3000/bookings/updateCart/${this.bookings;booking[i].id}`, {
                method: "PUT",
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    console(data);
                    this.parentNode.remove();
                }
            })
        });
    }
    */