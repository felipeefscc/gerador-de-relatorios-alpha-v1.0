let campoId = 1;

function adicionarCampo() {
    const camposExtras = document.getElementById('camposExtras');
    const novoCampo = document.createElement('div');
    novoCampo.classList.add('form-group');
    novoCampo.id = `campo${campoId}`;
    novoCampo.innerHTML = `
        <label for="campo${campoId}">Lance ${campoId}:</label>
        <input type="text" id="campo${campoId}" placeholder="Digite a informação do lance ${campoId}">
    `;
    camposExtras.appendChild(novoCampo);
    campoId++;
};

function removerCampo() {
    if (campoId > 1) {
        campoId--;
        const campoARemover = document.getElementById(`campo${campoId}`);
        campoARemover.remove();
    }
};

function obterValoresCampos() {
    const valoresCampos = [];
    for (let i = 1; i < campoId; i++) {
        const campo = document.getElementById(`campo${i}`);
        if (campo) {
            valoresCampos.push(campo.value);
        }
    }
    return valoresCampos;
};

         
function gerarPdf() {
    const valoresCampos = obterValoresCampos();
    console.log(valoresCampos); // Aqui você pode fazer o que precisar com os valores

    valoresCampos.forEach((valor, index) => {
        const campo = form.getTextField(`campo${index + 1}`);
        campo.setText(valor);
});}