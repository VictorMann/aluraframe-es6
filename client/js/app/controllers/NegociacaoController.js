class NegociacaoController
{
    constructor()
    {
        let $ = document.querySelector.bind(document);
    
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes,
            this._negociacoesView,
            'adiciona', 'esvazia'
        );
        
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
            new Mensagem,
            this._mensagemView,
            'texto'
        );

        ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos())
        .then(negociacoes => 
            negociacoes.forEach(negociacao => 
                this._listaNegociacoes.adiciona(negociacao))
        );
    }

    adiciona(event)
    {
        event.preventDefault();

        ConnectionFactory
        .getConnection()
        .then(connection => {
            let negociacao = this._criaNegociacao();

            new NegociacaoDao(connection)
            .adiciona(negociacao)
            .then(() => {
                this._listaNegociacoes.adiciona(this._criaNegociacao());
                this._mensagem.texto = 'Negociação adicionada com sucesso!';
                this._limpaFormulario();
            })
        })
        .catch(erro => this._mensagem.texto = erro);
    }

    apaga()
    {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
    }

    importaNegociacoes()
    {
        let service = new NegociacaoService;

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(lista => {
            lista
            .reduce((arrFlat, arr) => arrFlat.concat(arr), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Importação realizada com sucesso!';
        })
        .catch(err => this._mensagem.texto = err);
    }

    _criaNegociacao()
    {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario()
    {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}