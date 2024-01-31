// Ajout des trips selectionnés dans le panier

fetch(`http://localhost:3000/bookings/cart`)
        .then(response => response.json())
        .then((bookings) => {
            console.log(bookings)
            visualiseCart(bookings);
            upDeleteCart(bookings);
            purchaseCartTrips(bookings)
        })

function visualiseCart(bookings) {
    document.querySelector("#basket-container").innerHTML = '';
    console.log(bookings.result)
    if (bookings.result) {
        let sum = 0;

        // Récupération du nombre d'artciles dans le panier
        let counter = bookings.bookings.length
        console.log(counter)
        document.querySelector("#count").textContent = `${counter}`;
 

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
            <button id="purchase-btn">Purchase</button>
        </div>`
    } else {
        document.querySelector("#basket-container").innerHTML = '';
    }
}

function upDeleteCart(bookings) {
    for (let i = 0; i < document.querySelectorAll('.button-close').length; i++) {
        document.querySelectorAll('.button-close')[i].addEventListener('click', function () {
            fetch(`http://localhost:3000/bookings/updateCart/${bookings.bookings[i]._id}`, {
                method: "PUT"
            })
                .then((response) => response.json())
                .then((booking) => {
                    console.log('Voyage enlevé du panier')
                    location.reload()
                })
        })
    }
}


// Récupération des données trips dans le panier pour purchase

function purchaseCartTrips(bookings) {
    let pressPurchase = document.querySelector("#purchase-btn");

    pressPurchase.addEventListener('click', () => {

        for (let i in bookings.bookings) {

            fetch(`http://localhost:3000/bookings/updatePurchase/${bookings.bookings[i]._id}`, {
                method: "PUT"
            })
                .then(response => response.json())
                .then((bookings) => {
                    console.log('Bookings purchased', bookings)
                    location.reload()
                })

        }


    })


}



