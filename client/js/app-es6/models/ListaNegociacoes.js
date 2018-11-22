export class ListaNegociacoes
{
    constructor()
    {
        this._negociacoes = [];
    }

    adiciona(negociacao)
    {
        this._negociacoes.push(negociacao);
    }

    ordena(criterio)
    {
        this._negociacoes.sort(criterio);
    }

    inverteOrdem()
    {
        this._negociacoes.reverse();
    }

    get negociacoes()
    {
        // programação defensiva
        return [].concat(this._negociacoes);
    }

    esvazia()
    {
        this._negociacoes = [];
    }
}