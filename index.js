const carrito = document.getElementById("carrito");
const platillos = document.getElementById("lista-platillos");
const listaPlatillos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const contenidoTabla = document.getElementById("lista-cards");

//Declaración variables listar cards

const usuarioJson = localStorage.getItem("cards");
const cards = JSON.parse(usuarioJson) || [];

cargarEventListeners();

function cargarEventListeners() {
  platillos.addEventListener("click", comprarPlatillo);
  carrito.addEventListener("click", eliminarPlatillo);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarPlatillo(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const platillo = e.target.parentElement.parentElement;
        leerDatosPlatillo(platillo);
    }
}

function leerDatosPlatillo(platillo){
    const infoPlatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textContent,
        precio: platillo.querySelector('.precio span').textContent,
        id: platillo.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoPlatillo);
}

function insertarCarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${platillo.imagen}" width=100> 
       </td> 
       <td>${platillo.titulo}</td>
       <td>${platillo.precio}</td>
       <td>
        <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
       </td>
    `;
    listaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}

function eliminarPlatillo(e) {
    e.preventDefault();

    let platillo,
        platilloId;
    
    if(e.target.classList.contains('borrar-platillo')) {
        e.target.parentElement.parentElement.remove();
        platillo = e.target.parentElement.parentElement;
        platilloId = platillo.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(platilloId)
}

function vaciarCarrito(){
    while(listaPlatillos.firstChild){
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPlatilloLocalStorage(platillo) {
    let platillos;

    platillos = obtenerPlatillosLocalStorage();
    platillos.push(platillo);

    localStorage.setItem('platillos', JSON.stringify(platillos));
}

function obtenerPlatillosLocalStorage() {
    let platillosLS;

    if(localStorage.getItem('platillos') === null) {
        platillosLS = [];
    }else {
        platillosLS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platillosLS;
}

function leerLocalStorage() {
    let platillosLS;

    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillo){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
        `;
        listaPlatillos.appendChild(row);
    });
}

function eliminarPlatilloLocalStorage(platillo) {
    let platillosLS;
    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platilloLS, index){
        if(platilloLS.id === platillo) {
            platillosLS.splice(index, 1);
        }
    });

    localStorage.setItem('platillos', JSON.stringify(platillosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}



function mostrarCard() {
    function armarFilasDeCards(card) {
        const tr = `
    <div class="four columns">
      <div class="card">
        <img src="${card.imagen}" class="imagen-platillo u-full-width"/>
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
    </div>
        `;
        return tr;
    }

    // El método map genera un array nuevo sin modificar el array original.
    // Recibe por parámetros la función que debe ejecutarse por cada elemento del array.
    const contenido = cards.map(armarFilasDeCards);

    contenidoTabla.innerHTML = contenido.join('');
}

mostrarCard();