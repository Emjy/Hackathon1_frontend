// Récupération des données trips dans le panier

let pressCart = document.querySelector("#cartPage");

// Ajout des trips selectionnés 

fetch(`http://localhost:3000/bookings/cart`)
    .then(response => response.json())
    .then((bookings) => {
        console.log(bookings)
        visualiseCart(bookings);
        upDeleteCart(bookings);
        purchaseCartTrips(bookings)
        fetch(`http://localhost:3000/bookings/cart`)
            .then(response => response.json())
            .then((bookings) => {
                console.log(bookings)
                // Récupération du nombre d'artciles dans le panier
                let counter = bookings.bookings.length
                console.log(counter)
                document.querySelector("#count").textContent = `${counter}`;
            })
    })

function visualiseCart(bookings) {
    document.querySelector("#listOfPurchase").innerHTML = '';
    console.log(bookings.result)
    if (bookings.result) {
        let sum = 0;
        for (let i in bookings.bookings) {

            console.log(bookings[i])

            const datefmt = new Date(bookings.bookings[i].trip.date);
            let tripHour = `${datefmt.getHours()}h${(datefmt.getMinutes() < 10 ? '0' : '') + datefmt.getMinutes()}`;
            sum += bookings.bookings[i].trip.price;
            document.querySelector("#listOfPurchase").innerHTML += `
                    <div class="voyage">
                        <div class="dep-arr">${bookings.bookings[i].trip.departure} > ${bookings.bookings[i].trip.arrival}</div>
                        <div class="horaire">${tripHour}</div>
                        <div class="price">${bookings.bookings[i].trip.price} €</div>
                        <button class="button-close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="#F3EFE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#F3EFE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.8499 9.14001L18.1999 19.21C18.0899 20.78 17.9999 22 15.2099 22H8.7899C5.9999 22 5.9099 20.78 5.7999 19.21L5.1499 9.14001" stroke="#F3EFE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.3301 16.5H13.6601" stroke="#F3EFE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.5 12.5H14.5" stroke="#F3EFE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg></button>
                    </div>
                `;
        }
        document.querySelector("#basket-container").innerHTML +=
            `<div id="total-container">
            <h3>Total: ${sum} €</h3>
            <button id="purchase-btn">Purcharse</button>
        </div>`
    } else {
        document.querySelector("#basket-container").innerHTML = `
                <img class="train-img" src="./images/notfound.png" alt="train" />
                <h6>No trip found</h6>
            `;
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