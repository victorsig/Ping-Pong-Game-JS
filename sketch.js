//Variáveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 13;
let rBolinha = dBolinha / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Comprimento e Altura das Raquetes
let cRaquete = 10;
let aRaquete = 90;

//Variáveis Raquete
let xRaquete = 5;
let yRaquete = 150;

//Variáveis Oponente
let xRaqueteOP = 585;
let yRaqueteOP = 150;
let velocidadeYOP;
let chanceDeErrar = 0;

let colidiu = false;

//Placar JOGO
let meusPontos = 0;
let pontosOP = 0;

//Sons JOGO
let raquetada;
let ponto;
let trilha;

function preload()
{
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() 
{
  createCanvas(600, 400);
  trilha.loop();
}

function draw() 
{
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete1();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOP, yRaqueteOP);
  movimentaRaqueteOP();
  verificaColisaoRaquete(xRaqueteOP, yRaqueteOP)
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha()
{
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha()
{
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda()
{
  if (xBolinha + rBolinha > width || 
      xBolinha - rBolinha < 0) 
    {
      velocidadeXBolinha *= -1;
    }
  else if(yBolinha + rBolinha > height || 
          yBolinha - rBolinha < 0) 
    {
      velocidadeYBolinha *= -1;
    }
}


function mostraRaquete(x, y)
{
  rect(x, y, cRaquete, aRaquete);
}

function movimentaRaquete1()
{
  if (keyIsDown(UP_ARROW))
    {
      yRaquete -= 10;
    }
  else if (keyIsDown(DOWN_ARROW))
    {
      yRaquete += 10;
    }
}

function movimentaRaqueteOP()
{
  velocidadeYOP = yBolinha - yRaqueteOP - cRaquete / 2 - 30;
  yRaqueteOP += velocidadeYOP + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOP >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaquete()
{
  if(xBolinha - rBolinha < xRaquete + cRaquete &&
    yBolinha - rBolinha < yRaquete + aRaquete && yBolinha +       rBolinha > yRaquete)
     {
       velocidadeXBolinha *= -1;
       raquetada.play();
     }
}

function verificaColisaoRaquete(x, y)
{
  colidiu = collideRectCircle(x, y, cRaquete, aRaquete, xBolinha, yBolinha, dBolinha);
  
  if(colidiu)
    {
      velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

function incluiPlacar()
{
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(0,250,154)
  rect(150, 10, 40, 20);
  fill(255)
  text(meusPontos, 170, 26);
  fill(0,250,154)
  rect(450, 10, 40, 20);
  fill(255)
  text(pontosOP, 470, 26);
}

function marcaPonto()
{
  if(xBolinha > 590)
    {
      meusPontos += 1;
      ponto.play();
    }
  else if(xBolinha < 10)
    {
      pontosOP += 1;
      ponto.play();
    }
}