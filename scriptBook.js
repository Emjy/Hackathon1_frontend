// Affichage des trajets Bookés 

fetch(`http://localhost:3000/bookings/purchase`)
    .then(response => response.json())
    .then((bookings) => {
        visualiseBookings(bookings)
    })


function visualiseBookings(bookings) {

    document.querySelector("#listOfBookings").innerHTML = '';

    if (bookings.result) {

        for (let i in bookings.bookings) {

            console.log(bookings.bookings[i])

            const datefmt = new Date(bookings.bookings[i].trip.date);
            let tripHour = `${datefmt.getHours()}h${(datefmt.getMinutes() < 10 ? '0' : '') + datefmt.getMinutes()}`;
            let timeRemaining = new Date(new Date() - datefmt).getHours()
            let departure = bookings.bookings[i].departure
            let arrival = bookings.bookings[i].arrival

            document.querySelector("#listOfBookings").innerHTML += `
            <div id="booking-card">

                    <div id="imgTravel"></div>

                    <div id="text-container-booking">
                        <p class="">Your travel</p>
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
                            <p>at ${tripHour}</p>
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