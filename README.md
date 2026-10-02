# 🐦 Flappy Bird JS

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-puro-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript puro">
  <img src="https://img.shields.io/badge/HTML5-Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Canvas">
  <img src="https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css&logoColor=white" alt="CSS 3">
  <img src="https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow?style=for-the-badge" alt="Licença MIT">
</div>

<br>

> 🎯 **Clone do Flappy Bird em JavaScript puro com Canvas**, sem bibliotecas e sem etapa de build.

Fiz em 2020 para estudar Canvas, acompanhando o tutorial do [Dev Soltinho](https://youtu.be/jOAU81jdi-c). Em 2026 voltei ao projeto, corrigi os bugs que tinham ficado e completei o jogo com pontuação, tela de Game Over, medalhas e suporte a celular.

<p align="center">
  <img alt="Partida mostrando a tela Get Ready, o pássaro passando pelos canos e a tela de Game Over com medalha de bronze" src="demo/flappy-bird.gif" width="320" />
</p>

## 📋 Índice

- [🎓 O que aprendi](#-o-que-aprendi)
- [🎮 Como jogar](#-como-jogar)
- [🧠 Decisões técnicas](#-decisões-técnicas)
- [🔄 Revisitando o projeto em 2026](#-revisitando-o-projeto-em-2026)
- [📄 Licença](#-licença)

## 🎓 O que aprendi

- **Canvas.** Foi a parte nova em 2020: desenhar, animar e detectar colisão entre os objetos desenhados.
- **Tentar antes de ver a solução.** O Dev Soltinho quase sempre explica o que vai fazer antes de escrever o código. Eu pausava o vídeo e tentava implementar sozinho. Em muitos momentos cheguei na lógica por conta própria, e foi o que mais me fez evoluir.
- **Jogo simples exige matemática.** Gravidade, velocidade, intervalo entre canos e colisão são contas refeitas a cada quadro.
- **A velocidade do jogo não pode depender do monitor.** A física andava um passo por quadro desenhado, e num monitor de 144 Hz o jogo ficava 2,4 vezes mais rápido. O loop passou a rodar a lógica 60 vezes por segundo, separada do desenho.
- **Lógica dentro do desenho vira bug.** O chão andava no dobro da velocidade porque também era atualizado no `draw()`, e a morte era processada umas 30 vezes porque a colisão disparava a cada quadro com o pássaro parado no chão.
- **Refatorar com prova.** Quebrei um arquivo de cerca de 500 linhas em módulos e gravei a mesma partida antes e depois, com aleatoriedade fixa e jogadas automáticas: os 920 quadros ficaram idênticos, pixel a pixel.

## 🎮 Como jogar

O jogo usa módulos ES, que o navegador não carrega abrindo o `index.html` direto do disco. Sirva a pasta por HTTP, na raiz do projeto:

```bash
python -m http.server 8000   # depois abra http://localhost:8000
```

Clique, toque na tela ou use Espaço, seta para cima ou W para começar, pular e sair do Game Over. A pontuação dá medalha de bronze (5 pontos), prata (10), ouro (15) e platina (20), e a melhor fica salva no navegador.

## 🧠 Decisões técnicas

| Decisão | Alternativa | Por quê |
|---|---|---|
| Loop com passo fixo | Multiplicar o movimento pelo tempo decorrido (delta time) | A gravidade, o pulo e o intervalo dos canos foram calibrados por quadro e continuam valendo, e a física fica determinística |
| `pointerdown` | `click` | Um evento só para mouse, toque e caneta, que dispara quando o dedo toca a tela |
| `event.code` no teclado | `event.key` | Identifica a tecla física, sem depender do layout do teclado |
| `@media (pointer: coarse)` para o celular | Largura da tela | Não altera o jogo numa janela pequena de computador |
| Módulos ES em `src/` | Um arquivo só | Cada arquivo com uma responsabilidade; o custo é precisar de servidor local |
| Telas como máquina de estados (`InitialScreen`, `PlayingScreen`, `GameOverScreen`) | Condicionais espalhadas pelo loop | A troca passa pelo `Game`, e uma tela não precisa conhecer a outra |

## 🔄 Revisitando o projeto em 2026

Seis anos depois, encontrei bugs que não tinha percebido na época e recursos que já estavam no sprite sheet e na pasta de áudio, mas nunca tinham sido usados. Dos 8 bugs corrigidos, os principais:

| O que estava errado | O que mudou |
|---|---|
| Jogo 2,4x mais rápido em monitor de 144 Hz | Loop com passo fixo |
| O chão andava no dobro da velocidade dos canos | A atualização do chão saiu do `draw()` |
| A morte era processada várias vezes e podia devolver o jogador à tela inicial no meio da partida seguinte | Trava `hasCrashed`: a batida é tratada uma vez só |
| Partida nova começava com os canos da anterior | `Game.resetRound()` recria pássaro, canos e placar num lugar só |
| Colisão depois de já ter passado pelo cano | O teste olha também a borda de trás do cano |

## 📄 Licença

[MIT](LICENSE)

---

<div align="center">
  <p>Desenvolvido por <strong>Luiz Matos</strong></p>
  <p>
    <a href="https://github.com/luiz-matos">GitHub</a> •
    <a href="https://www.linkedin.com/in/luizeduardomatos/">LinkedIn</a>
  </p>
</div>
