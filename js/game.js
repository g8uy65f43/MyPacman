"use strict";
import maps from "./index.js";
import Create from "./create.js";
import Status from "./status.js";
import Play from "./play.js";

const MyTable = document.querySelector("#MyTable")

class Game {
    constructor( ) {
        this.init()
}
    init(){
        MyTable.innerHTML=""
        this.Status = new Status()               
        this.Create=new Create(MyTable,maps[this.Status.level])
        this.Play = new Play(maps,this.Status,this.Create,this.init,this.NextStage)
        this.Create.createMap()       
        this.Create.createMonster()       
        this.Create.createPacMan()
        this.Status.StatusUpData()
        this.Play.search()
        this.Play.play()
    }
    NextStage (){
            MyTable.innerHTML=""
            this.Create=new Create(MyTable,this.maps[this.Status.level])
            this.Play = new Play(maps,this.Status,this.Create,this.init,this.NextStage)
            this.Create.createMap()       
            this.Create.createMonster()       
            this.Create.createPacMan()
            this.Status.StatusUpData()
            this.Play.search()
            this.Play.play()




    }
}

let game = new Game()











