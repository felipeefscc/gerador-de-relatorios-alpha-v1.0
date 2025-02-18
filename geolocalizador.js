document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM carregado!");
});

function getLocation(emenda) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => successCallback(position, emenda), // 🔥 Passamos `emenda` corretamente!
            errorCallback
        );
    } else {
        alert("Geolocalização não suportada pelo seu navegador.");
    }
}

function successCallback(position, emenda) {
    console.log("Emenda recebida:", emenda); // Verifica se o parâmetro está correto
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let latitudeInput = document.getElementById(`latitude${emenda}`);
    let longitudeInput = document.getElementById(`longitude${emenda}`);

    let enderecoInput = document.getElementById(`endereco${emenda}`); // Campo de endereço

    console.log("Elemento latitude encontrado?", latitudeInput);
    console.log("Elemento longitude encontrado?", longitudeInput);
    console.log("Elemento endereco encontrado?", enderecoInput);


    if (!latitudeInput || !longitudeInput) {
        console.log(`Erro: Campos latitude/longitude para ${emenda} não encontrados!`);
        return; // Evita que o código tente acessar um campo inexistente
    }


    document.getElementById(`latitude${emenda}`).value = latitude;
    document.getElementById(`longitude${emenda}`).value = longitude;

    setTimeout(() => {

    // Chamada para API de Geocodificação (Google Maps)
    let apiKey = "AIzaSyAVOatMQNAi9OCPXkjwPDi5Off6CStrorM"; // Insira sua chave da API do Google Maps
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                let address = data.results[0].address_components;
                let rua = "", numero = "", bairro = "", cidade = "", estado = "", cep = "";

                address.forEach(component => {
                    if (component.types.includes("route")) {
                        rua = component.long_name;
                    }
                    if (component.types.includes("street_number")) {
                        numero = component.long_name;
                    }
                    if (component.types.includes("sublocality") || component.types.includes("sublocality_level_1")) {
                        bairro = component.long_name;
                    }
                    if (component.types.includes("administrative_area_level_2")) {
                        cidade = component.long_name;
                    }
                    if (component.types.includes("administrative_area_level_1")) {
                        estado = component.short_name;
                    }
                    if (component.types.includes("postal_code")) {
                        cep = component.long_name;
                    }
                });

                // Preenchendo os campos do formulário
                document.getElementById(`local${emenda}`).value = `${cidade} - ${estado}`;
                document.getElementById(`endereco${emenda}`).value = `${rua}, ${numero} - ${bairro}`;
                document.getElementById(`latitude${emenda}`).value = `${latitude}`;
                document.getElementById(`longitude${emenda}`).value = `${longitude}`;
                
                enderecoInput.value = data.results[0].formatted_address;
                enderecoInput.focus();
            } else {
                alert("Endereço não encontrado.");
            }
        })
        .catch(error => console.log("Erro ao obter endereço: ", error));
    }, 1000); // 500ms de delay
}

function errorCallback(error) {
    alert("Erro ao obter localização: " + error.message);
}
