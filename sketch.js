const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var corda,corda2,corda3
var fruta
var ligacao,lig2,lig3
var fundo
var cortar,cortar2,cortar3,melao,coelho,coelho2
var comendo,titi,pisca
var scomendo,sfundo,scorda,striste,sair
var balao,mute
var ismobale,telaa,talal

function preload (){
  fundo = loadImage ("midias/background.png")
  melao = loadImage ("midias/melon.png")
  coelho = loadImage ("midias/Rabbit-01.png")
  comendo = loadAnimation ("midias/eat_1.png","midias/eat_2.png","midias/eat_3.png","midias/eat_4.png")
  titi = loadAnimation ("midias/sad_1.png","midias/sad_2.png","midias/sad_3.png")
  pisca = loadAnimation ("midias/blink_1.png","midias/blink_2.png","midias/blink_3.png")
  comendo.playing = true
  titi.playing = true
  pisca.playing = true
  comendo.looping = false
  titi.looping = false
  scomendo = loadSound ("midias/comendo.mp3")
  striste = loadSound ("midias/sad.wav")
  sair = loadSound ("midias/air.wav")
  sfundo = loadSound ("midias/sound1.mp3")
  scorda = loadSound ("midias/rope_cut.mp3")
}
function setup() 
{
  ismobale = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (ismobale ){
  telal = displayWidth
  telaa = displayHeight
  createCanvas (telal+80,telaa)
  }else{
  telal = windowWidth
  telaa = windowHeight
  createCanvas (telal,telaa)
  }
  frameRate(80);
  sfundo.play ()
  sfundo.setVolume (1)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  corda = new Rope (5,{x:width/2-280,y:10})
  corda2 = new Rope (10,{x:width/2+10,y:130})
  corda3 = new Rope (10,{x:60,y:90})
  fruta = Bodies.circle (300,200,20)
  Composite.add (corda.body,fruta)
  ligacao = new Link (corda,fruta)
  lig2 = new Link (corda2,fruta)
  lig3 = new Link (corda3,fruta)
  pisca.frameDelay = 20
  comendo.frameDelay = 10
  coelho2 = createSprite (width/2-200,telaa-90)
  coelho2.addAnimation ("piscando",pisca)
  coelho2.addAnimation ("triste",titi)
  coelho2.addAnimation ("comer",comendo)
  coelho2.scale = 0.2
  cortar = createImg ("midias/cut_button.png")
  cortar.position (width/2-300,10)
  cortar.size (60,60)
  cortar.mouseClicked (aperta)
  cortar2 = createImg ("midias/cut_button.png")
  cortar2.position (width/2,130)
  cortar2.size (60,60)
  cortar2.mouseClicked (aperta2)
  cortar3 = createImg ("midias/cut_button.png")
  cortar3.position (50,90)
  cortar3.size (60,60)
  cortar3.mouseClicked (aperta3)
  mute = createImg ("midias/mute.png")
  mute.position (width-100,10)
  mute.size (70,70)
  mute.mouseClicked (cancelar)
  //balao = createImg ("midias/balloon.png")
 // balao.position (60,210)
 // balao.size (150,100)
 // balao.mouseClicked (assopra)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image (fundo,0,0,telal,telaa)
  corda.show ()
  corda2.show ()
  corda3.show ()
  push ()
  imageMode (CENTER)
  if (fruta !== null){
    image (melao,fruta.position.x,fruta.position.y,90,90)
  }
  
  pop ()
  drawSprites ()
  Engine.update(engine);
 if (colisao(fruta,coelho2)== true){
  coelho2.changeAnimation ("comer")
  scomendo.play ()
 }
  if (fruta!== null&&fruta.position.y >= 650){ 
    coelho2.changeAnimation ("triste")
    fruta = null
    striste.play ()
  }  
}
function aperta (){
  corda.break ()
  ligacao.dettach ()
  ligacao = null
  scorda.play ()
}
function aperta2 (){
  corda2.break ()
  lig2.dettach ()
  lig2 = null
  scorda.play ()
}
function aperta3 (){
  corda3.break ()
  lig3.dettach ()
  lig3 = null
  scorda.play ()
}
function colisao (body,sprite){
if (body!== null){
var espaco = dist (body.position.x,body.position.y,sprite.position.x,sprite.position.y)
if (espaco <= 80){
World.remove (world,fruta)
fruta = null
return true
}else {
return false
}
}
}
function cancelar (){
  if (sfundo.isPlaying){
    sfundo.stop ()
  }else{
    sfundo.play ()
    sfundo.setVolume (1)
  }
}
function assopra (){
  Body.applyForce (fruta,{x:0,y:0},{x:0.02,y:0})
  sair.play ()
}