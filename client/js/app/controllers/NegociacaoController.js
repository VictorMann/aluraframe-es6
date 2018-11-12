class NegociacaoController
{
    constructor()
    {
        let $ = document.querySelector.bind(document);
    
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');
    }

    adiciona(event)
    {
        event.preventDefault();
        
        let negociacao = new Negociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
    }
}