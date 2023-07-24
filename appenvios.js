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
                    <h5>(Dentro de las 24hs posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
        case "zona1":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $1.000.-</h2>
                    <h5>(Dentro de las 48hs posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
        case "zona2":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $1.500.-</h2>
                    <h5>(Dentro de las 48-72hs posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
        case "zona3":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $2.000.-</h2>
                    <h5>(Dentro de las 72hs posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
    }
});