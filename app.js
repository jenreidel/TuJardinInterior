// Simulación de base de datos. 
class BaseDeDatos{
    constructor(){
        this.productos = []; // Array donde guardamos todos los productos en carrito.
        // Cargamos los productos
        this.agregarRegistro(1, "Aloe Vera", 2500, "Uno de sus principales beneficios es su capacidad para limpiar el aire de toxinas. Absorben las sustancias nocivas que pueda haber en el ambiente, como por ejemplo el benceno." , "Planta", "aloevera.jpg");
        this.agregarRegistro(2, "Aspidistra", 2300, "Perfecta para personas que dicen tener mala mano con las plantas, ya que es considerada una planta todoterreno resistente al frío y al calor. Además, es pet friendly, no es toxica ni en gatos ni en perros.", "Planta", "aspidistra.jpg");
        this.agregarRegistro(3, "Calathea", 3900, "Contribuyen a armonizar espacios, relaciones y a estabilizar las emociones. Son plantas resistentes que transmiten energía Yang, perfecta para ubicarla en el living hacia el este (zona de la salud y la familia).", "Plantas", "calathea.jpeg");
        this.agregarRegistro(4, "Ceropegia Woodii", 1800, "Esta suculenta colgante es llamativa por sus hojas en forma de corazón y flores tubulares. Colócala en un espacio luminoso, pero protegida de los rayos de sol directo. Comproba la humedad del sustrato antes de regarla.", "Planta", "ceropegia-woodii.jpg");
        this.agregarRegistro(5, "Croton", 3000, "Destaca por sus coloridas hojas y sus multiples propiedades medicinales. Necesita mucha luz pero sin sol directo. Controla que el sustrato esté seco entre riegos y evita encharcar sus raíces.", "Planta", "croton.jpg");
        this.agregarRegistro(6, "Dieffenbachia", 5300, "Reduce la cantidad de polvo en el aire y lo purifica. Aumenta la humedad del ambiente. De acuerdo con el Feng Shui, es ideal para lograr los objetivos laborales.", "Plantas", "dieffenbachia.jpg");
        this.agregarRegistro(7, "Espatifilo", 2800, "También llamada Lirio de la Paz o Cuna de Moisés, es una planta de hojas verdes y flores blancas muy llamativas. Resistente y con pocos cuidados prospera en el interior sin problemas.", "Planta", "espatifilo.jpg");
        this.agregarRegistro(8, "Ficus Lyrata", 9200, "También conocido como Ficus Pandurata, crece poco a poco hasta convertirse en ese árbol de interior con el que siempre soñaste. Sus cuidados son prácticamente son nulos, por lo que son muy resistentes.", "Plantas", "ficus-lyrata.jpg");
        this.agregarRegistro(9, "Kalanchoe", 1200, "Es una planta muy resistente y difícil de matar. Sus flores pueden ser naranjas, rosas, rojas o amarillas. Regala sólo cuando la tierra esté seca y asegurate que reciba mucha luz natural.", "Planta", "kalanchoe.jpg");
        this.agregarRegistro(10, "Lazo de Amor", 700, "También conocida como Cinta o Malamadre, necesita luz, pero sin exponerla al sol directo. Es una de las plantas de interior más duraderas y es perfecta para iniciarse en la jardinería.", "Planta", "lazodeamor.jpg");
        this.agregarRegistro(11, "Maranta Leuconera", 3500, "Conocida también como Planta de la Oración porque por las noches tiende a cerrar sus hojas ligeramente. Necesita mucha luz, pero indirecta para que muestre todos sus vibrantes colores.", "Planta", "maranta-leuconera.jpg");
        this.agregarRegistro(12, "Pachira Acuática", 5900, "Al contrario que otros árboles, no necesita muchísima luz, así que es una opción perfecta para casas donde el sol no sea muy generoso. Según el Feng Shui, esta planta es ideal para atraer el dinero.", "Planta", "pachira-acuatica.jpg");
        this.agregarRegistro(13, "Peperomia", 2800, "De alto poder ornamental, llenará tu hogar de su singular verdor. Necesita una exposición indirecta al sol y es bastante sensible al frío. Se recomienda comprobar la humedad del sustrato antes de regarla.", "Planta", "peperomia.jpg");
        this.agregarRegistro(14, "Planta de Jade", 3600, "Crece lentamente, pero es muy longeva y, a poco que la mimes, te acompañará media vida. Es conocida también como planta del dinero por simbolizar la buena suerte en la cultura china.", "Planta", "plantadejade.jpeg");
        this.agregarRegistro(15, "Potus", 5000, "Purifica el aire, eliminando ciertas sustancias tóxicas de sus proximidades. Según el Feng Shui, transforma la energía negativa que se acumula en el ambiente.", "Plantas", "potus.JPG");
        this.agregarRegistro(16, "Sanseviera", 4900, "Se suele utilizar para purificar el aire. También es una planta recomendada por el Feng Shui para atraer buenas energías a la casa.", "Plantas", "sanseviera.JPG");
        this.agregarRegistro(17, "Trebol Morado", 2100 , "Responde a la luz y a la oscuridad abriendo y cerrando sus hojas, por lo que muchas personas la consideran mágica o incluso mística. Sólo necesita una macena que drene bien y cerca de alguna ventana.", "Planta", "trebolmorado.jpg");
        this.agregarRegistro(18, "Tronco de Brasil", 3700, "También conocida como Palo de Agua o Drácena Fragans, se caracteriza por las distintas tonalidades de verde de sus hojas. Necesita temperaturas entre 15 y 25º y luz natural pero no de sol directo.", "Planta", 
        "troncodebrasil.jpg");
        this.agregarRegistro(19, "Zamioculcas", 4700, "Eta planta es la solución para quienes no tienen mano con la jardinería. Puede sobrevivir varios meses sin riego, aunque si recibe mucha luz necesitará un riego más frecuente. No tolera el encharcamiento.", "Plantas", "zamioculcas.jpg");
        this.agregarRegistro(20, "Piedras", 500, "Una de las tantas ventajas de usarlas es que dan soluciones a problemas como humedad. También permiten separar las hojas verdes del sustrato.", "Accesorios", "piedras.jpg");
        
    }

    agregarRegistro(id, nombre, precio, descripcion, categoria, imagen){
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
            productoEnCarrito.cantidad++;
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

// Muestra en el HTML los registros que tengo en la base de datos 
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

// Creo el objeto carrito. Lo ponemos abajo de todo para que ya todo esté instanciado, listo y vinculado para ser agregado al carrito.
const carrito = new Carrito();

// Llamamos a la función
cargarProductos();

// FORMAS DE PAGO
const btnComprar = document.querySelector("#btnComprar");
const divOpcionDePago = document.querySelector("#divOpcionDePago");
const formaPago = document.querySelector("#formaPago");

// Le digo que si hay algo en el carrito, el boton funcione, sino no.
//if () {
    btnComprar.addEventListener("click", () => divOpcionDePago.classList.toggle('hidden'));
}

// Hago un
formaPago.addEventListener("change", (event) => {
    event.preventDefault();

    let precio = carrito.total;
    switch (formaPago.value) {
        case "VISA1": 
            let precioFinalV1 = Math.round(precio);
            alert(`Total: $${precioFinalV1}.- en un pago`);
            break;
        case "VISA3": 
            let cuotaV3 = (precio / 3).toFixed(2);
            let precioFinalV3 = Math.round(precio);
            alert(`Total: $${precioFinalV3}.- (3 cuotas sin interés de $${cuotaV3})`);
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

/*

Para hacer que el botón "Comprar" funcione solo cuando hay elementos en el carrito, puedes deshabilitar el botón cuando el carrito esté vacío y habilitarlo cuando tenga al menos un elemento. Esto se puede lograr con un simple condicional en el evento del botón "Comprar".

Aquí tienes una forma de hacerlo:

javascript
Copy code
// Obtener referencias a los elementos relevantes del carrito y el botón "Comprar"
const btnComprar = document.querySelector("#btnComprar");
const carritoItems = document.querySelector("#carritoItems");

// Función para comprobar si el carrito está vacío
function isCarritoVacio() {
  return carritoItems.children.length === 0;
}

// Función para habilitar o deshabilitar el botón "Comprar" según el estado del carrito
function actualizarEstadoBotonComprar() {
  btnComprar.disabled = isCarritoVacio();
}

// Evento para ocultar/mostrar el botón "Comprar" cuando se agregan o eliminan elementos del carrito
carritoItems.addEventListener("DOMNodeInserted", actualizarEstadoBotonComprar);
carritoItems.addEventListener("DOMNodeRemoved", actualizarEstadoBotonComprar);

// Evento de clic en el botón "Comprar"
btnComprar.addEventListener("click", () => {
  if (isCarritoVacio()) {
    alert("El carrito está vacío. Agrega algunos productos antes de comprar.");
  } else {
    // Aquí colocas la lógica para realizar la compra
    // Por ejemplo, abrir el formulario de pago, enviar los datos, etc.
    // ...
    alert("¡Compra realizada con éxito!");
  }
});

// Llamar a la función inicial para verificar el estado del botón al cargar la página
actualizarEstadoBotonComprar();
*/
