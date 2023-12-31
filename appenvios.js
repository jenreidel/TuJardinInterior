const divEnvios = document.querySelector("#divEnvios");
const selectElement = document.querySelector("#zonasEnvio");

selectElement.addEventListener("change", (e) => {e.preventDefault();
    const zonaSeleccionada = selectElement.value;
    switch (zonaSeleccionada) {
        case "zona0":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: SIN CARGO</h2>
                    <h5>(Dentro de las 24hs hábiles posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
        case "zona1":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $1.000.-</h2>
                    <h5>(Dentro de las 48hs hábiles posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
        case "zona2":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $1.500.-</h2>
                    <h5>(Dentro de las 48-72hs hábiles posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
        case "zona3":
            divEnvios.innerHTML = `
                <div>
                    <h2>Costo de envío: $2.000.-</h2>
                    <h5>(Dentro de las 72hs hábiles posteriores a la confirmación de pago)</h5>
                </div>
            `;
            break;
    }
});