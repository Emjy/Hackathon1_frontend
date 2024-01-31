// Récupération des données saisies 

let pressSearchButton = document.querySelector("#search-button")

// Ajout des trains selectionnés 

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

        }
    } else {
        document.querySelector("#response").innerHTML = `
                <img class="train-img" src="./images/notfound.png" alt="train" />
                <h6>No trip found</h6>
            `;
    }
}


function addTripToCart(trips) {

    for (let i = 0; i < document.querySelectorAll('.book-button').length; i++) {
        document.querySelectorAll('.book-button')[i].addEventListener('click', () => {
            console.log("Button pressed")
            console.log(trips.trips[i]._id)

            fetch(`http://localhost:3000/trips/${trips.trips[i]._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then(() => {
                    console.log("Trip saved !!")
                })

        });
    }

}

function capitalizeFirstLetter(inputString) {
    return inputString.trim().charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}


// Récupération des données saisies 

// let pressSearchButton = document.querySelector("#-button")