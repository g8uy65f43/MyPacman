class Status{
    constructor(){
        this.life = 3
        this.status = 1
        this.score = 0
        this.level = 0
    }
    StatusUpData (){
        let score=document.querySelector("#score")
        let life=document.querySelector("#life")
        let level=document.querySelector("#level")
        score.innerHTML="得點:"+this.score
        life.innerHTML="生命:"+this.life
        level.innerHTML="關卡:"+(this.level+1)

    }

}
export default Status