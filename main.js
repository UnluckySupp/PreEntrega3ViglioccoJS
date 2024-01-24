const productos = [
    {id: 1, nombre: "Lavarropa", precio: 8000, imagen: "img/lavarropa.png"},
    {id: 2, nombre: "Heladera", precio: 9000, imagen: "img/heladera.png"},
    {id: 3, nombre: "Televisor", precio: 12000, imagen: "img/televisor.png"},
];
const carrito = [];
const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const compra = document.getElementById("compra");

const agregarCarrito = (id) => {
    let productoEncontrado = productos.find((item) => item.id === id);
    carrito.push(productoEncontrado);
    mostrarCarrito();
}

const mostrarCarrito = () => {
    compra.innerHTML = "";
    carrito.forEach(itemCarrito => {
        let cartaCarrito = document.createElement("div");
        cartaCarrito.classList.add("posicionCarrito");
        cartaCarrito.innerHTML = `
        <h3>${itemCarrito.nombre}:</h3>
        <p>$${itemCarrito.precio}</p>
        `;
        compra.append(cartaCarrito);
    })
    let total = calcularTotal();
        compra.innerHTML += `
        <p class="total">Total: $${total}</p>
        `;
}

const calcularTotal = () => {
    let total = 0;
    carrito.forEach(item => {
      total += item.precio;
    });
    return total;
  };

productos.forEach(item => {
    let carta = document.createElement("div");
    carta.classList.add("producto");
    carta.innerHTML = `
    <img src="${item.imagen}" alt="Imagen de ${item.nombre}"></img>
    <h3>${item.nombre}</h3>
    <p>${item.precio}</p>
    <button id="botonAgregar${item.id}">Agregar al Carrito</button>    
    `;
    contenedorPrincipal.append(carta);

    let boton = document.getElementById(`botonAgregar${item.id}`);
    boton.addEventListener('click', () => {
        agregarCarrito(item.id);
    });
});

let jsonCarrito;

const guardarCarrito = document.getElementById("guardarCarrito");
guardarCarrito.addEventListener("click", () => {
    jsonCarrito = JSON.stringify(carrito);
    localStorage.setItem("guardarCarrito", jsonCarrito);
});

const cargarCarrito = document.getElementById("cargarCarrito");
cargarCarrito.addEventListener("click", () => {
    let copiaDeSeguridad = localStorage.getItem("guardarCarrito");
    compra.innerHTML = "";
    carrito.length = 0;
    (copiaDeSeguridad)
    ? (JSON.parse(copiaDeSeguridad).forEach (item => {carrito.push(item);}), mostrarCarrito())
    : null;
});