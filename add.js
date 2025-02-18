let contador = 0;

        function adicionarCampo() {
            contador++;
            let container = document.getElementById("camposExtras");
            
            let div = document.createElement("div");
            div.classList.add("campo-container");
            div.id = `campo-${contador}`;

            div.innerHTML = `
                <label>Lance ${contador}:</label>
                <input type="text" name="Lance[]" placeholder="Digite a metragem do lance!">
                <button type="button" class="remover-btn" onclick="removerCampo(${contador})">Remover</button>
            `;

            container.appendChild(div);
        }

        function removerCampo(id) {
            let campo = document.getElementById(`campo-${id}`);
            campo.remove();
        }