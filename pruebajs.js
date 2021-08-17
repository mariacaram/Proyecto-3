const prendaInput = document.getElementById("prenda");
const precioInput = document.getElementById("precio");
const ofertaInput = document.getElementById("oferta");
const contenidoInput = document.getElementById("contenidoCards");

const usuarioJson = localStorage.getItem("cards");
const cards = JSON.parse(usuarioJson) || [];

function agregarCard(event) {
  event.preventDefault();
  const prenda = prendaInput.value;
  const precio = precioInput.value;
  const oferta = ofertaInput.value;
  const nuevaCard = {
    prenda: prenda,
    precio: precio,
    oferta: oferta,
  };

cards.push(nuevaCard);
mostrarCard();
const cardsJson = JSON.stringify(cards); // Convertir datos al formato JSON.
localStorage.setItem('cards', cardsJson); // Guardar en localStorage un dato asociado a la key "usuarios".
event.target.reset(); // reset limpia los campos del formulario.
}

function mostrarCard() {
    function armarFilasDeCards(card) {
        const tr = `
    <div class="four columns">
      <div class="card">
        <img src="./jeans/p3.jpg" class="imagen-platillo u-full-width"/>
        <div class="info-card">
          <h4>${card.nombre}</h4>
          <p>Prendas exclusivas</p>
          <img src="./iconos/estrellas.png"/>
          <p class="precio">
            ${card.precio} <span class="u-pull-right">${card.oferta}</span>
          </p>
          <a
            href="#"
            class="u-full-width button-primary button input agregar-carrito"
            data-id="2"
            >agregar al carrito</a>
          
        </div>
    </div>
        `;
        return tr;
    }
armarFilasDeCards(card)
    // El método map genera un array nuevo sin modificar el array original.
    // Recibe por parámetros la función que debe ejecutarse por cada elemento del array.
    const contenido = cards.map(armarFilasDeCards);

    contenidoTabla.innerHTML = contenido.join('');
}