class NegociacaoController
{
    constructor()
    {
        let $ = document.querySelector.bind(document);
    
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event)
    {
        event.preventDefault();

    }

    _criaNegociacao()
    {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
}