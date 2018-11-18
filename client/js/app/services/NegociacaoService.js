class NegociacaoService
{
    constructor()
    {
        this._httpService = new HttpService;
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