 // Exibe o modal ao carregar a página
        window.onload = function() {
            const modal = document.getElementById("informativoModal");
            modal.style.display = "flex";  // Torna o modal visível
        };

        // Fecha o modal quando o botão "Fechar" for clicado
        const btnFechar = document.getElementById("fecharModal");
        btnFechar.onclick = function() {
            const modal = document.getElementById("informativoModal");
            modal.style.display = "none"; // Esconde o modal
        };

        // Fecha o modal se o usuário clicar fora do conteúdo do modal
        window.onclick = function(event) {
            const modal = document.getElementById("informativoModal");
            if (event.target === modal) {
                modal.style.display = "none"; // Esconde o modal
            }
        };