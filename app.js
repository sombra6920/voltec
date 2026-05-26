// =======================
// 1. CREAR MAPA
// =======================
var map = L.map('map').setView([19.3167, -98.8833], 14);

// =======================
// 2. MAPA BASE
// =======================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


// =======================
// 3. VARIABLES GLOBALES
// =======================
let centros = [];
let marcadores = [];


// =======================
// 4. FUNCIÓN PARA MOSTRAR MARCADORES
// =======================
function mostrarCentros(lista){

    // limpiar marcadores anteriores
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    lista.forEach(c => {

        let color = "green";

        if(c.espacios === 0){
            color = "red";
        } else if(c.espacios < 3){
            color = "orange";
        }

        let marker = L.circleMarker([c.lat, c.lng], {
            radius: 8,
            color: color
        })
        .addTo(map)
        .bindPopup(`
            <b>${c.nombre}</b><br>
            ⚡ Tipo: ${c.tipo}<br>
            📊 Espacios: ${c.espacios}
        `);

        marcadores.push(marker);
    });
}


// =======================
// 5. CARGAR DATOS DESDE BACKEND
// =======================
function cargarCentros(){

    fetch("http://localhost:3000/centros")
    .then(res => res.json())
    .then(data => {

        centros = data;
        mostrarCentros(centros);

    })
    .catch(err => console.log("Error:", err));
}

// ejecutar al iniciar
cargarCentros();


// =======================
// 6. BUSCADOR
// =======================
document.getElementById("buscador").addEventListener("input", function(){

    let texto = this.value.toLowerCase();

    let filtrados = centros.filter(c =>
        c.nombre.toLowerCase().includes(texto)
    );
    mostrarCentros(filtrados);
    
});