const prendaInput = document.getElementById("prenda");
const precioInput = document.getElementById("precio");
const ofertaInput = document.getElementById("oferta");
const imagenInput = document.getElementById("imagen")


const usuarioJson = localStorage.getItem("cards");
const cards = JSON.parse(usuarioJson) || [];

function agregarCard(event) {
  event.preventDefault();
  const prenda = prendaInput.value;
  const precio = precioInput.value;
  const oferta = ofertaInput.value;
  const imagen =imagenInput.value;
  const nuevaCard = {
    prenda: prenda,
    precio: precio,
    oferta: oferta,
    imagen: imagen
  };

cards.push(nuevaCard);

const cardsJson = JSON.stringify(cards); // Convertir datos al formato JSON.
localStorage.setItem('cards', cardsJson); // Guardar en localStorage un dato asociado a la key "usuarios".
event.target.reset(); // reset limpia los campos del formulario.
}
