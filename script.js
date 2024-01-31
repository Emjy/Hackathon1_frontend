fetch(`http://localhost:3000/bookings/cart`)
    .then(response => response.json())
    .then((bookings) => {
        console.log(bookings)
        // Récupération du nombre d'artciles dans le panier
        let counter = bookings.bookings.length
        console.log(counter)
        document.querySelector("#count").textContent = `${counter}`;
    })

// Ajout des trains selectionnés 
document.querySelector("#response").style.display = 'none'

let pressSearchButton = document.querySelector("#search-button")

pressSearchButton.addEventListener('click', () => {

    let departure = capitalizeFirstLetter(document.querySelector("#input-dep").value).trim();
    let arrival = capitalizeFirstLetter(document.querySelector("#input-arr").value).trim();
    let dateInput = document.querySelector("#input-date").value;

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${dateInput}`)
        .then(response => response.json())
        .then((trips) => {
            visualiseTrips(trips)
            addTripToCart(trips)

        })
});



function visualiseTrips(trips) {

    document.querySelector("#response").innerHTML = '';

    console.log(trips.result)
    if (trips.result) {
        for (let i in trips.trips) {

            const datefmt = new Date(trips.trips[i].date);
            let tripHour = `${datefmt.getHours()}h${(datefmt.getMinutes() < 10 ? '0' : '') + datefmt.getMinutes()}`; 

            document.querySelector("#response").innerHTML += `
                <div class="voyage">
                <div class="dep-arr">${trips.trips[i].departure} > ${trips.trips[i].arrival}</div>
                <div class="horaire">${tripHour}</div>
                <div class="price">${trips.trips[i].price} €</div>
                <button class="book-button">Book</button>
                </div>
                `;
            document.querySelector("#response").style.display = 'flex'
        }
    } else {
        document.querySelector("#response").innerHTML = `
                <img class="train-img" src="./images/notfound.png" alt="train" />
                <h6>No trip found</h6>
            `;

        document.querySelector("#response").style.display = 'none'
    }
}


function addTripToCart(trips) {

    for (let i = 0; i < document.querySelectorAll('.book-button').length; i++) {
        document.querySelectorAll('.book-button')[i].addEventListener('click', () => {

            //document.querySelector('#count').textContent = String(counter);

            fetch(`http://localhost:3000/trips/${trips.trips[i]._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then(() => {
                    console.log('Trip add to cart!')
                    // Récupération du nombre d'artciles dans le panier
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
        });
    }

}

function capitalizeFirstLetter(inputString) {
    return inputString.trim().charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}