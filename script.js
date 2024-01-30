// Récupération des données saisies 

let pressSearchButton = document.querySelector("#search-button")

// Ajout des trains selectionnés 

pressSearchButton.addEventListener('click', () => {

    let departure = document.querySelector("#input-dep").value;
    let arrival = document.querySelector("#input-arr").value;
    let dateInput = document.querySelector("#input-date").value;

    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${dateInput}`)
        .then(response => response.json())
        .then((trips) => {
            visualiseTrips(trips)
        }).then((trips) => {
            addTripToCart(trips)
        })
});



function visualiseTrips(trips) {
    document.querySelector("#response").innerHTML = '';

    console.log(trips.result)

    if (trips.result) {
        for (let i in trips.trips) {
            let tripHour = `${new Date(trips.trips[i].date).getHours()}h${new Date(trips.trips[i].date).getMinutes()}`
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



function addTripToCart() {

    for (let i = 0; i < document.querySelectorAll('.book-button').length; i++) {
        document.querySelectorAll('.book-button')[i].addEventListener('click', () => {
          
        });
    }

}