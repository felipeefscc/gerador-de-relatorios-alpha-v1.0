function getLocation(emenda) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => successCallback(position, emenda),
            errorCallback
        );
    } else {
        alert("Geolocalização não suportada pelo seu navegador.");
    }
}

function successCallback(position, emenda) {
    console.log(`📍 Buscando campos para: ${emenda}`);

    // Espera um pouco para garantir que o modal já foi carregado
    setTimeout(() => {
        let latitudeInput = document.getElementById(`latitude${emenda}`);
        let longitudeInput = document.getElementById(`longitude${emenda}`);
        let enderecoInput = document.getElementById(`endereco${emenda}`);
        let localInput = document.getElementById(`local${emenda}`);

        console.log("🔍 Latitude input encontrado?", latitudeInput);
        console.log("🔍 Longitude input encontrado?", longitudeInput);
        console.log("🔍 Endereço input encontrado?", enderecoInput);

        if (!latitudeInput || !longitudeInput || !enderecoInput) {
            console.error(`❌ Erro: Campos não encontrados para ${emenda}!`);
            return;
        }

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        latitudeInput.value = latitude;
        longitudeInput.value = longitude;

        let apiKey = "AIzaSyAVOatMQNAi9OCPXkjwPDi5Off6CStrorM"; // Substitua pela sua chave do Google Maps
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK" && data.results.length > 0) {
                    let address = data.results[0].address_components;
                    let { rua, numero, bairro, cidade, estado } = extractAddress(address);

                    console.log("📌 Endereço formatado:", `${rua}, ${numero} - ${bairro}`);
                
                    enderecoInput.value = `${rua}, ${numero} - ${bairro}`;
                    enderecoInput.focus();
                    localInput.value = `${cidade} - ${estado}`;
                    
                } else {
                    alert("❌ Endereço não encontrado!");
                }

                if (latitudeemenda1 == latitudeemenda2) {
                    
                    alert("❌ Endereços não podem ser iguais!");
                    
                } else {

                };

                

            })
            .catch(error => console.error("❌ Erro ao obter endereço:", error));
    }, 200); // Pequeno atraso para garantir que o modal já foi carregado
}

function extractAddress(components) {
    let addressData = { rua: "", numero: "", bairro: "", cidade: "", estado: "" };

    components.forEach(component => {
        if (component.types.includes("route")) addressData.rua = component.long_name;
        if (component.types.includes("street_number")) addressData.numero = component.long_name;
        if (component.types.includes("sublocality")) addressData.bairro = component.long_name;
        if (component.types.includes("administrative_area_level_2")) addressData.cidade = component.long_name;
        if (component.types.includes("administrative_area_level_1")) addressData.estado = component.short_name;
    });

    return addressData;
}

function errorCallback(error) {
    console.error("❌ Erro ao obter localização:", error);
    alert("Não foi possível obter a localização. Verifique as permissões do navegador.");
}
