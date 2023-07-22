// Simulación de base de datos. 
class BaseDeDatos{
    constructor(){
        this.productos = []; // Array donde guardamos todos los productos en carrito.
        // Cargamos los productos
        this.agregarRegistro(1, "Dieffenbachia", 5300, "Reduce la cantidad de polvo en el aire y lo purifica. Aumenta la humedad del ambiente. De acuerdo con el Feng Shui, es ideal para lograr los objetivos laborales.", "Plantas", "dieffenbachia.jpg");
        this.agregarRegistro(2, "Potus", 5000, "Purifica el aire, eliminando ciertas sustancias tóxicas de sus proximidades. Según el Feng Shui, transforma la energía negativa que se acumula en el ambiente.", "Plantas", "potus.JPG");
        this.agregarRegistro(3, "Sanseviera", 4900, "Se suele utilizar para purificar el aire. También es una planta recomendada por el Feng Shui para atraer buenas energías a la casa.", "Plantas", "sanseviera.JPG");
        this.agregarRegistro(4, "Piedras", 500, "Una de las tantas ventajas de usarlas es que dan soluciones a problemas como humedad. También permiten separar las hojas verdes del sustrato.", "Accesorios", "piedras.jpg");
        this.agregarRegistro(5, "Gift Card 5000", 5000, "Se pueden elegir productos que excedan el valor del voucher y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta al cliente en efectivo.", "Gift Card")
        this.agregarRegistro(6, "Gift Card 10000", 10000, "Se pueden elegir productos que excedan el valor del voucher y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta al cliente en efectivo.", "Gift  Card")
        this.agregarRegistro(7, "Gift Card 15000", 15000, "Se pueden elegir productos que excedan el valor del voucher y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta al cliente en efectivo.", "Gift Card")
        this.agregarRegistro(8, "Gift Card 15000", 20000, "Se pueden elegir productos que excedan el valor del voucher y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta al cliente en efectivo.", "Gift Card")
    }

    agregarRegistro(id, nombre, precio, descripcion, categoria, imagen = false){
        const producto = new Producto(id, nombre, precio, descripcion, categoria, imagen);
        this.productos.push(producto);
    }

    traerRegistros(){
        return this.productos;
    }

    registroPorId(id){
        return this.productos.find((producto) => producto.id === id);
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
            productoEnCarrito.cantidad += 1;
        } else {
            // Agregalo al carrito
            this.carrito.push({...producto, cantidad: 1});
            // Cada vez que actualizamos el carrito, lo guardamos en el storage.
            // Para guardar un array tenemos que usar JSON.
            // localStorage sólo acepta strings, usando JSON.stringify lo convertimos de array a string y lo guardamos en 'this.carrito'
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
            this.carrito.splice(indice, 1); // Si hay más de 1 unidad resta 1, sino con este método, lo borra del carrito.
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
                    <p>$${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btnQuitar" data-id="${producto.id}">Quitar del Carrito</button>
                </div>
                `;
            // Actualizo los totales
            this.total += producto.precio * producto.cantidad;
            this.totalProductos += producto.cantidad;
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
}

// Clase molde para las plantas a la venta
class Producto{
    constructor(id, nombre, precio, descripcion, categoria, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
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

// FUNCIONES REGULARES

// Muestra en el HTML los productos que tengo en la base de datos 
function cargarProductos() {
    const productos = baseDatos.traerRegistros();
    divProductos.innerHTML = ""; // Limpia el contenido anterior
  
    // Crea un contenedor div para las tarjetas, para poder estilar su posicion dentro de él.
    const contenedorTarjetas = document.createElement('div');
    contenedorTarjetas.classList.add('d-flex', 'flex-row');
  
    for (const producto of productos) {
      // Crea cada tarjeta de producto
      const tarjeta = `
        <div class="card" style="width: 18rem;">
            <img src="img/${producto.imagen}" class="card-img-top" alt="producto a la venta">
            <div class="card-body">
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <h5>Precio $${producto.precio}</h5>
                <div class="btnCentrado">
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
            const id = Number(boton.dataset.id);
            const producto = baseDatos.registroPorId(id);
            carrito.agregar(producto);
        });
    }
}

// Creo el objeto carrito. Lo ponemos abajo de todo para que ya todo esté instanciado, listo y vinculado para ser agregado al carrito.
const carrito = new Carrito();

// Llamamos a la función
cargarProductos();

// FORMAS DE PAGO

let precio = parseInt(10500);

function FormaDePago() {
    let formaPago = prompt("Ingresa la forma de pago:\n\nVISA (3 cuotas sin interés)\nMASTER (3 cuotas con 5% de recargo)\nAMEX (3 cuotas con 10% de recargo)");
    switch (formaPago) {
        case "VISA1": 
            let cuotaV1 = Math.round(precio / 3);
            let precioFinalV1 = cuotaV1 * 3;
            alert(`Total: ${precioFinalV1} (3 cuotas sin interés de $${cuotaV1})`);
            break;
        case "VISA3": 
            let cuotaV3 = Math.round(precio / 3);
            let precioFinalV3 = cuotaV3 * 3;
            alert(`Total: ${precioFinalV3} (3 cuotas sin interés de $${cuotaV3})`);
            break;
        case "MASTER1": 
            let cuotaM1 = Math.round((precio / 3) * 1.05);
            let precioFinalM1 = cuotaM1 * 3;
            alert(`Total: ${precioFinalM1} (3 cuotas sin interés de $${cuotaM1})`);
            break;
        case "MASTER3": 
            let cuotaM3 = Math.round((precio / 3) * 1.05);
            let precioFinalM3 = cuotaM3 * 3;
            alert(`Total: ${precioFinalM3} (3 cuotas sin interés de $${cuotaM3})`);
            break;
        case "AMEX3": 
            let cuotaA1 = Math.round((precio / 3) * 1.1);
            let precioFinalA1 = cuotaA1 * 3;
            alert(`Total: ${precioFinalA1} (3 cuotas sin interés de $${cuotaA1})`);
            break;
        case "AMEX3": 
            let cuotaA3 = Math.round((precio / 3) * 1.1);
            let precioFinalA3 = cuotaA3 * 3;
            alert(`Total: ${precioFinalA3} (3 cuotas sin interés de $${cuotaA3})`);
            break;
        default:
            alert("Por favor ingresá un forma de pago.");
            break;
    }
} 

// GIFT CARD


// ENVÍOS
const divEnvios = document.querySelector("#divEnvios");
const selectElement = document.querySelector("#zonasEnvio");

selectElement.addEventListener("change", (e) => {e.preventDefault();
    console.log("Evento change activado!");
    const zonaSeleccionada = selectElement.value;
    console.log("Zona seleccionada:", zonaSeleccionada);
    switch (zonaSeleccionada) {
        case "zona0":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: SIN CARGO</h2>
                    <p>(Dentro de las 24hs posteriores a la confirmación de pago)</p>
                </div>
            `;
            break;
        case "zona1":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $1.000.-</h2>
                    <p>(Dentro de las 48hs posteriores a la confirmación de pago)</p>
                </div>
            `;
            break;
        case "zona2":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $1.500.-</h2>
                    <p>(Dentro de las 48-72hs posteriores a la confirmación de pago)</p>
                </div>
            `;
            break;
        case "zona3":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $2.000.-</h2>
                    <p>(Dentro de las 72hs posteriores a la confirmación de pago)</p>
                </div>
            `;
            break;
    }
});