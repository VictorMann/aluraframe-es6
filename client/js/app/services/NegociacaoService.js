class NegociacaoService
{
    obterNegociacoesDaSemana()
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest;
            xhr.open('GET', 'negociacoes/semana');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response).map(oResp =>
                            new Negociacao(
                                new Date(Date.parse(oResp.data)),
                                oResp.quantidade,
                                oResp.valor
                            )
                        ));
                    } else {
                        console.log(xhr.response);
                        reject('Não foi possível importar as negociações');
                    }
                }
            }
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaAnterior()
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest;
            xhr.open('GET', 'negociacoes/anterior');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response).map(oResp =>
                            new Negociacao(
                                new Date(Date.parse(oResp.data)),
                                oResp.quantidade,
                                oResp.valor
                            )
                        ));
                    } else {
                        console.log(xhr.response);
                        reject('Não foi possível importar as negociações');
                    }
                }
            }
            xhr.send();
        });
    }

    obterNegociacoesDaSemanaRetrasada()
    {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest;
            xhr.open('GET', 'negociacoes/retrasada');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4)
                {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response).map(oResp =>
                            new Negociacao(
                                new Date(Date.parse(oResp.data)),
                                oResp.quantidade,
                                oResp.valor
                            )
                        ));
                    } else {
                        console.log(xhr.response);
                        reject('Não foi possível importar as negociações');
                    }
                }
            }
            xhr.send();
        });
    }
}