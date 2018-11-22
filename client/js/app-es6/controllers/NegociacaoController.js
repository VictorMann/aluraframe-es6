import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';

class NegociacaoController
{
    constructor()
    {
        let $ = document.querySelector.bind(document);
    
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._ordemAtual = '';

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes,
            this._negociacoesView,
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );
        
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
            new Mensagem,
            this._mensagemView,
            'texto'
        );

        this._service = new NegociacaoService;

        // ação inicial
        this._init();
    }

    _init()
    {
        // lista todas as negociações na tabela presentes
        // no indexedDB
        this._service
        .lista()
        .then(negociacoes => 
            negociacoes.forEach(negociacao => 
                this._listaNegociacoes.adiciona(negociacao))
        )
        .catch(err => this._mensagem.texto = err);

        // importa negociações em intervalos
        setInterval(() => this.importaNegociacoes(), 3000);
    }

    adiciona(event)
    {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
        .cadastra(negociacao)
        .then(mensagem => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();
        })
        .catch(erro => this._mensagem.texto = erro);
    }

    apaga()
    {
        this._service
        .apaga()
        .then(mensagem => {
            this._listaNegociacoes.esvazia();
            this._mensagem.texto = mensagem;
        })
        .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna)
    {
        if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();
        else this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);
        this._ordemAtual = coluna;
    }

    importaNegociacoes()
    {
        this._service
        .importa(this._listaNegociacoes.negociacoes)
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Importação realizada com sucesso!';
        })
        .catch(erro => this._mensagem.texto = erro);
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

let negociacaoController = new NegociacaoController;

export function currentInstance() {
    return negociacaoController;
}