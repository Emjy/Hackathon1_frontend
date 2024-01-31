fetch(`http://localhost:3000/bookings/purchase`)
    .then(response => response.json())
    .then((bookings) => {
        visualiseBookings(bookings)
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


// Affichage des trajets Bookés 
function visualiseBookings(bookings) {

    document.querySelector("#listOfBookings").innerHTML = '';

    if (bookings.result) {

        for (let i in bookings.bookings) {

            console.log(bookings.bookings[i])

            const datefmt = new Date(bookings.bookings[i].trip.date);
            let tripHour = `${datefmt.getHours()}h${(datefmt.getMinutes() < 10 ? '0' : '') + datefmt.getMinutes()}`;
            let timeRemaining = new Date(datefmt - new Date()).getHours()
            let departure = bookings.bookings[i].trip.departure
            let arrival = bookings.bookings[i].trip.arrival

            document.querySelector("#listOfBookings").innerHTML += `
            <div id="booking-card">

                  <div id="imgTravel"><img class="imgTravelArrival" src="./images/${arrival}.jpg"/></div>
                    <div id="text-container-booking">
                 
                        <div id="destination-container-booking">

                            <div class="label-city">
                                <p class="label">Departure</p>
                                <p class="city">${departure}</p>
                            </div>

                            <p>></p>

                            <div class="label-city">
                                <p class="label">Arrival</p>
                                <p class="city">${arrival}</p>
                            </div>
                        </div>

                        <div id="date-container">
                            <p> ${datefmt.getDate()}/${datefmt.getMonth() + 1}/${datefmt.getFullYear()} at ${tripHour}</p>
                            <p>Departure in ${timeRemaining} hours</p>
                        </div>

                    </div>

                </div>`;
        }

    } else {
        document.querySelector("#listOfBookings").innerHTML = ``;
    }
}

function deleteCart(Cart) {

}