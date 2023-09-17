class BaseDeDatos{
    constructor(){
        this.productos = []; // Array de productos en carrito.
    }

    async traerRegistros(){
        const response = await fetch ("/productosApp.json");
        this.productos = await response.json();
        return this.productos;
    }

    registroPorId(id){
        return this.productos.find((producto) => producto.id === id);
    }

    registroPorNombre(palabra){
        return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(palabra));
    }
}

// Clase Carrito donde van a estar los productos a comprar
class Carrito{
    constructor(){
        // 'JSON.parse' me convierte el string a array para que JavaScript lo pueda usar.
        const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
        // Le digo que si hay algo en el storage, me lo traiga, sino que me deje el array vacío.
        this.carrito = carritoStorage || [];
        this.total = 0;
        this.totalProductos = 0;
        this.listar(); // Que me muestre lo que tengo listado ni bien carga la página con el objeto carrito creado, va a llamar al constructor. El constructor lo trae del storage y lo muestra en mi HTML.
    }

    estaEnCarrito(productoCarrito){
        return this.carrito.find((producto) => producto.id === productoCarrito.id);
    }

    agregar(producto){
        let productoEnCarrito = this.estaEnCarrito(producto);
        if (productoEnCarrito) {
            // Si encuentra uno igual, que me sume la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Agregalo al carrito
            this.carrito.push({...producto, cantidad: 1});
            // Cada vez que actualizo el carrito, que lo guarde en el storage.
            localStorage.setItem("carrito", JSON.stringify(this.carrito));
        }
        this.listar();
    }

    quitar(id){
        // Resto o borro elementos del carrito trayendo su ID.
        const indice = this.carrito.findIndex((producto) => producto.id === id);
        if (this.carrito[indice].cantidad > 1) {
            this.carrito[indice].cantidad -= 1;
        } else {
            this.carrito.splice(indice, 1); 
        }
        // Actualizo el carrito en el HTML
        // Guardo en el localStorage aca también porque estamos actualizando el carrito.
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
        this.listar();
    }

    // Redibujo el contenido del array del carrito. Lo llamamos siempre que hay que actualizarlo.
    listar(){
        // Reinicio los dos valores por las dudas. 
        this.total = 0;
        this.totalProductos = 0;
        divCarrito.innerHTML = "";
        for (const producto of this.carrito) {
            divCarrito.innerHTML += `
                <div class="producto">
                    <h2>${producto.nombre}</h2>
                    <p>$${producto.precio}.-</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btn btn-secondary btnQuitar" type="button" data-id="${producto.id}">Quitar del Carrito</button>
                </div>
                `;
            // Actualizo los totales
            this.total += producto.precio * producto.cantidad;
            this.totalProductos += producto.cantidad;
        }

        // Hago que si tengo productos en el carrito muestre el boton 'comprar', sino no.
        if (this.totalProductos > 0) {

        }
        // Botones de Quitar
        const botonesQuitar = document.querySelectorAll(".btnQuitar");
        for (const boton of botonesQuitar){
            boton.addEventListener("click", (event) => {
                this.quitar(Number(boton.dataset.id)); // le aplico la funcion 'Number' porque la comparación que hacemos en el método 'quitar' es estricta. Necesita si o si ser un número y 'dataset' me trae siempre un string.
            });
        }
        // Actualizo las variables del carrito.
        spanCantidadProductos.innerText = this.totalProductos;
        spanTotalCarrito.innerText = this.total;
    }

    vaciar() {
        this.carrito = [];
        localStorage.removeItem('carrito');
        this.listar();
    }
}

// Clase molde para las plantas a la venta
class Producto{
    constructor(id, nombre, precio, descripcion, categoria, imagen = false) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

// Instanciamos el Objeto Base de Datos
const baseDatos = new BaseDeDatos();

// Elementos
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const formBuscar = document.querySelector("#formBuscar");
const inputBuscar = document.querySelector("#inputBuscar");

// FUNCIONES REGULARES

// Muestra en el HTML los registros que tengo en la base de datos 
function cargarProductos(productos) {
    divProductos.innerHTML = ""; // Limpia el contenido anterior
  
    // Crea un contenedor div para las tarjetas, para poder estilar su posicion dentro de él.
    const contenedorTarjetas = document.createElement('div');
    contenedorTarjetas.classList.add('d-flex', 'flex-row', 'centrar');
  
    for (const producto of productos) {
      // Crea cada tarjeta de producto
        const tarjeta = `
            <div class="card" style="width: 18rem;">
                <img src="img/${producto.imagen}" class="card-img-top" alt="producto a la venta">
                <div class="card-body">
                    <h4 class="card-title">${producto.nombre}</h4>
                    <p class="card-text">${producto.descripcion}</p>
                    <h5>Precio $${producto.precio}</h5>
                    <div class="centrar">
                        <button class="btnAgregar" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
        // Agrega cada tarjeta al contenedor de tarjetas
        contenedorTarjetas.innerHTML += tarjeta;
    }
  
    // Agrega el contenedor de tarjetas al contenedor principal
    divProductos.appendChild(contenedorTarjetas);

    // Botones para agregar los productos al carrito
    const botonesAgregar = document.querySelectorAll(".btnAgregar");
    for (const boton of botonesAgregar){
        boton.addEventListener("click", (event) => {
            const id = Number(boton.dataset.id); // lo convierto en numero xq dataset trae string sino
            const producto = baseDatos.registroPorId(id);
            carrito.agregar(producto);
        });
    }
}

// Buscador de productos  
formBuscar.addEventListener("submit", (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    cargarProductos(baseDatos.registroPorNombre(palabra.toLowerCase()));
});

inputBuscar.addEventListener("keyup", (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    cargarProductos(baseDatos.registroPorNombre(palabra.toLowerCase()));
})

// Llamamos a la función
baseDatos.traerRegistros().then((productos) => cargarProductos(productos));

// FORMAS DE PAGO
const btnComprar = document.querySelector("#btnComprar");
const divOpcionDePago = document.querySelector("#divOpcionDePago");
const formaPago = document.querySelector("#formaPago");

// Para que muestre el boton comprar solo si el carrito tiene algo adentro.
btnComprar.addEventListener("click", () => divOpcionDePago.classList.toggle('ocultar'));

// Swal.fire('Tu carrito está vacío. Por favor agrega productos para continuar.')

// Forma de pago para realizar compra.
formaPago.addEventListener("change", (event) => {
    event.preventDefault();

    let precio = carrito.total;
    switch (formaPago.value) {
        case "VISA1": 
            let precioFinalV1 = Math.round(precio);
            divFormaDePago.innerHTML = `
                <h5>Total: $${precioFinalV1}.- en un pago</h>
            `;
            break;
        case "VISA3": 
            let cuotaV3 = (precio / 3).toFixed(2);
            let precioFinalV3 = Math.round(precio);
            divFormaDePago.innerHTML = `
                <h5>Total: $${precioFinalV3}.- (3 cuotas sin interés de $${cuotaV3})</h5>
            `;
            break;
        case "MASTER1": 
            let precioFinalM1 = Math.round(precio);
            alert(`Total: $${precioFinalM1}.- en un pago`);
            break;
        case "MASTER3": 
            let cuotaM3 = ((precio / 3) * 1.05).toFixed(2);
            let precioFinalM3 = Math.round(cuotaM3 * 3);
            alert(`Total: $${precioFinalM3}.- (3 cuotas sin interés de $${cuotaM3})`);
            break;
        case "AMEX1": 
            let precioFinalA1 = Math.round(precio);
            alert(`Total: $${precioFinalA1}.- en un pago`);
            break;
        case "AMEX3": 
            let cuotaA3 = ((precio / 3) * 1.1).toFixed(2);
            let precioFinalA3 = Math.round(cuotaA3 * 3);
            alert(`Total: $${precioFinalA3}.- (3 cuotas sin interés de $${cuotaA3})`);
            break;
    }   
});

// Creo el objeto carrito. Lo pongo abajo de todo para que ya todo esté instanciado, listo y vinculado para ser agregado al carrito.
const carrito = new Carrito();

// SWEETALERT2

// CONFIRMACION DE COMPRA
// https://sweetalert2.github.io/#examples

// Swal.fire({
//     title: '¿Confirmas la compra?',
//     text: "Esta acción no podrá ser revertida.",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Si, comprar!'
//     cancelButtonText: 'Cancelar'        
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Compra realizada!',
//         'Tu pedido está en camino.',
//         'success'
//       )
//     }
//   })