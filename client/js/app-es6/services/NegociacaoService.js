class NegociacaoService
{
    constructor()
    {
        this._httpService = new HttpService;
    }

    cadastra(negocicao)
    {
        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.adiciona(negocicao))
        .then(() => 'Negociação adicionada com sucesso!');
    }

    lista()
    {
        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listaTodos());
    }

    apaga()
    {
        return ConnectionFactory
        .getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagaTodos());
    }

    importa(listaAtual)
    {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(listaImportada =>
            listaImportada
            .reduce((arrFlat, arr) => arrFlat.concat(arr), [])
            .filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                    JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao)
                )
            )
        );
    }

    obterNegociacoesDaSemana()
    {
        return new Promise((resolve, reject) => {

            this._httpService.get('negociacoes/semana')
            .then(response => 
                resolve(response.map(dado =>
                    new Negociacao(
                        new Date(Date.parse(dado.data)),
                        dado.quantidade,
                        dado.valor
                    )
                ))
            )
            .catch(err => {
                console.log(err);
                reject('Não foi possível obter Negociações da SEMANA!');
            });
        });
    }

    obterNegociacoesDaSemanaAnterior()
    {
        return new Promise((resolve, reject) => {

            this._httpService.get('negociacoes/anterior')
            .then(response => 
                resolve(response.map(dado =>
                    new Negociacao(
                        new Date(Date.parse(dado.data)),
                        dado.quantidade,
                        dado.valor
                    )
                ))
            )
            .catch(err => {
                console.log(err);
                reject('Não foi possível obter Negociações da SEMANA ANTERIOR!');
            });
        });
    }

    obterNegociacoesDaSemanaRetrasada()
    {
        return new Promise((resolve, reject) => {

            this._httpService.get('negociacoes/retrasada')
            .then(response => 
                resolve(response.map(dado =>
                    new Negociacao(
                        new Date(Date.parse(dado.data)),
                        dado.quantidade,
                        dado.valor
                    )
                ))
            )
            .catch(err => {
                console.log(err);
                reject('Não foi possível obter Negociações da SEMANA RETRASADA!');
            });
        });
    }
}