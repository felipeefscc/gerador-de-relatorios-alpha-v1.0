let campoId = 1;
const maxCampos = 14;

function adicionarCampo() {
    if (campoId > maxCampos) {
        alert("Você só pode adicionar até 14 lances.");
        return;
    }

    const camposExtras = document.getElementById('camposExtras');
    const novoCampo = document.createElement('div');
    novoCampo.classList.add('form-group');
    novoCampo.id = `campoDiv${campoId}`;

    novoCampo.innerHTML = `
        <label for="inputCampo${campoId}">Lance ${campoId}:</label>
        <input type="text" class="campoNumero" id="campo${campoId}" placeholder="Digite a metragem do lance! ${campoId}">
    `;

    console.log(`Campo ${campoId} adicionado`);

    camposExtras.appendChild(novoCampo);
    campoId++;
}

function removerCampo() {
    if (campoId > 1) {
        campoId--;
        const campoARemover = document.getElementById(`campoDiv${campoId}`);
        if (campoARemover) {
            campoARemover.remove();
        }
        console.log(`Campo ${campoId} removido`);
    }
}

function obterValoresCampos() {
    const valoresCampos = [];

    console.log("📌 Coletando valores dos campos:");

    for (let i = 1; i < campoId; i++) {
        const campo = document.getElementById(`campo${i}`);
        if (campo) {
            const valor = campo.value.trim(); // Retirando espaços em branco extras
            valoresCampos.push(valor);
            console.log(`📥 Campo ${i}: ${valor}`);
        } else {
            console.log(`⚠ Campo campo${i} não encontrado!`);
        }
    }
    console.log("Valores coletados:", valoresCampos);
    return valoresCampos;
    
}

// function gerarPdf() {
//     console.log("Chamando a função obterValoresCampos...");

//     // const valoresCampos = obterValoresCampos();
//     console.log("Valores capturados para o PDF:", valoresCampos);

//     if (typeof form !== "undefined") {
//         valoresCampos.forEach((valor, index) => {
//             const campoPdf = form.getTextField(`campo${index + 1}`);
//             if (campoPdf) {
//                 campoPdf.setText(valor);
//             }
//         });
//     } else {
//         console.error("Variável 'form' não definida. Certifique-se de carregar o PDF corretamente.");
//     }
// };

