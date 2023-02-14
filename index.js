/**
 * Desafio: escrever uma função que valide se uma palavra é valida em um tabuleiro de Parole.
 * A função irá receber dois argumentos:
 * - Um array bi-dimensional (NxN) com letras de A a Z representando o tabuleiro
 * - Uma palavra que deve ser validada
 *
 * Palavras válidas são formadas por ligações adjacentes das letras (horizontas, vertical, diagonal) sem reutilizar as posições usadas anteriormente.
 *
 * Exemplo de um valor de entrada:
 * [ ["I","L","A","W"],
 *   ["B","N","G","E"],
 *   ["I","U","A","O"],
 *   ["A","S","R","L"] ]
 *
 * Neste caso, podemos considerar:
 * - "BINGO", "ILNBIA", "LINGO" são palavras válidas.
 * - "BUNGIE", "SINUS", "BINS" são palavras inválidas.
 *
 * Não é necessário verificar se a palavra é real ou não, apenas se ela é valida no tabuleiro.
 *
 * Voce pode testar o seu codigo rodando o comando `npm test` no terminal
 * e tambem pode alterar o arquivo `index.test.js` se desejar.
 * Apos enviado, seu codigo sera validado com outros cenarios de teste tambem.
 *
 * @param tabuleiro array bidimensional representando o tabuleiro
 * @param palavra palavra que deve ser validada no tabuleiro
 * @returns `true` ou `false`, informando se a palavra é valida para o tabuleiro
 */
const tiposMovimentos = [
  'Direita',
  'Esquerda',
  'Baixo',
  'Cima',
  'Diagonal_Cima_Direita',
  'Diagonal_Cima_Esquerda',
  'Diagonal_Baixo_Direita',
  'Diagonal_Baixo_Esquerda',
];

let indexLetra = 0;
let posLetra = {
  letra: [],
  posDel: [],
  posInicial: [],
};
function verificaPalavra(tabuleiro, palavra) {
  indexLetra = 1;
  let cont = 0;
  do {
    let x = posLetra.letra[indexLetra - 1][1][0];
    let y = posLetra.letra[indexLetra - 1][1][1];
    cont = 0;
    do {
      let x = posLetra.letra[indexLetra - 1][1][0];
      let y = posLetra.letra[indexLetra - 1][1][1];
      switch (tiposMovimentos[cont]) {
        case 'Direita':
          y = posLetra.letra[indexLetra - 1][1][1] + 1;
          break;
        case 'Esquerda':
          y = posLetra.letra[indexLetra - 1][1][1] - 1;
          break;
        case 'Baixo':
          x = posLetra.letra[indexLetra - 1][1][0] + 1;
          break;
        case 'Cima':
          x = posLetra.letra[indexLetra - 1][1][0] - 1;
          break;
        case 'Diagonal_Cima_Direita':
          x = posLetra.letra[indexLetra - 1][1][0] - 1;
          y = posLetra.letra[indexLetra - 1][1][1] + 1;
          break;
        case 'Diagonal_Cima_Esquerda':
          x = posLetra.letra[indexLetra - 1][1][0] - 1;
          y = posLetra.letra[indexLetra - 1][1][1] - 1;
          break;
        case 'Diagonal_Baixo_Direita':
          x = posLetra.letra[indexLetra - 1][1][0] + 1;
          y = posLetra.letra[indexLetra - 1][1][1] + 1;
          break;
        case 'Diagonal_Baixo_Esquerda':
          x = posLetra.letra[indexLetra - 1][1][0] - 1;
          y = posLetra.letra[indexLetra - 1][1][1] - 1;
          break;
      }
      let posicaoExcluida = false;
      let posicaoJaIncluida = false;

      if (
        x >= 0 &&
        x <= tabuleiro.length - 1 &&
        y >= 0 &&
        y <= tabuleiro.length - 1
      ) {
        if (tabuleiro[x][y] == palavra[indexLetra]) {
          for (let k = 0; k < posLetra.posDel.length; k++) {
            if (JSON.stringify(posLetra.posDel[k]) == JSON.stringify([x, y]))
              posicaoExcluida = true;
          }

          for (let k = 0; k < posLetra.letra.length; k++) {
            if (JSON.stringify(posLetra.letra[k][1]) == JSON.stringify([x, y]))
              posicaoJaIncluida = true;
          }

          if (posicaoJaIncluida == false && posicaoExcluida == false) {
            posLetra.letra.push([tabuleiro[x][y], [x, y]]);
            indexLetra++;
            break;
          }
        }
      }

      cont++;
      if (cont == 8) {
        let x = posLetra.letra[indexLetra - 1][1][0];
        let y = posLetra.letra[indexLetra - 1][1][1];
        posLetra.posDel.push([x, y]);
        posLetra.letra.pop();
        indexLetra--;
        break;
      }
    } while (cont <= 7);
    if (posLetra.letra.length == 0) break;
  } while (posLetra.letra.length != palavra.length);
  return posLetra.letra.length == palavra.length;
}

function parole(tabuleiro, palavra) {
  for (let x = 0; x < tabuleiro.length; x++) {
    let element = tabuleiro[x];
    for (let y = 0; y < element.length; y++) {
      if (tabuleiro[x][y] == palavra[0]) {
        if (posLetra.letra.length == 0) {
          posLetra.letra.push([tabuleiro[x][y], [x, y]]);
          indexLetra++;
        }
        posLetra.posInicial.push([tabuleiro[x][y], [x, y]]);
      }
    }
  }
  if (palavra.length == 1 && posLetra.posInicial.length == 1) return true;

  if (posLetra.posInicial.length == 0) return false;

  if (posLetra.posInicial.length == 1)
    return verificaPalavra(tabuleiro, palavra);
  else {
    for (let index = 0; index < posLetra.posInicial.length; index++) {
      const element = posLetra.posInicial[index];
      posLetra.letra = [];
      posLetra.posDel = [];
      // console.log(element);
      posLetra.letra.push(element);
      let retorno = verificaPalavra(tabuleiro, palavra);
      if (retorno) return retorno;
    }
  }

  return false;
}

module.exports = parole;
