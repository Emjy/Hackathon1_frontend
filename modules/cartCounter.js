export default function cartCounter(counter) {
    if (counter === 0) {
        document.querySelector("#count").style.display = 'none';
    } else {
        document.querySelector('#count').innerHTML += `${counter}`
    }
    console.log("coucou");
}