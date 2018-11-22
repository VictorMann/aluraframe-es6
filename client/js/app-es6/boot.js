import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').addEventListener('submit', (e) => negociacaoController.adiciona(e));
document.querySelector('#btn-apaga').addEventListener('click', () => negociacaoController.apaga());
document.querySelector('#btn-importa').addEventListener('click', () => negociacaoController.importaNegociacoes());
