// Simulación de base de datos. 
class BaseDeDatos{
    constructor(){
        this.productos = []; // Array donde guardamos todos los productos en carrito.
        // Cargamos los productos
        this.agregarRegistro(5, "Gift Card 5000", 5000, "Podés elegir productos que excedan el valor a favor y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta.", "Gift Card")
        this.agregarRegistro(6, "Gift Card 10000", 10000, "Podés elegir productos que excedan el valor a favor y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta.", "Gift  Card")
        this.agregarRegistro(7, "Gift Card 15000", 15000, "Podés elegir productos que excedan el valor a favor y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta.", "Gift Card")
        this.agregarRegistro(8, "Gift Card 20000", 20000, "Podés elegir productos que excedan el valor a favor y abonar la diferencia. Si el total es inferior al monto del voucher, la diferencia no será devuelta.", "Gift Card")
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

// FUNCIONES REGULARES

// Creo el objeto carrito. Lo ponemos abajo de todo para que ya todo esté instanciado, listo y vinculado para ser agregado al carrito.
const carrito = new Carrito();

// FORMAS DE PAGO

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
