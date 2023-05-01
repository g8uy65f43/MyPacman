

class Play {
    constructor(maps, Status, Create, init, NextStage) {
        this.maps = maps
        this.Status = Status
        this.Create = Create
        this.pacMan = []
        this.StartP = []
        this.passPoint = 0
        this.MonsterArr = []
        this.MonsterStartPArr = []
        this.init = init
        this.NextStage = NextStage
        this.YMax = 0
        this.XMax = 0
        this.flag = false
    }
    search() {
        for (let i = 0; i < this.maps[this.Status["level"]]["mapBase"].length; i++) {
            this.YMax = this.maps[this.Status["level"]]["mapBase"].length - 1
            this.XMax = this.maps[this.Status["level"]]["mapBase"][0].length - 1
            console.log(this.YMax, this.XMax);
            for (let j = 0; j < this.maps[this.Status["level"]]["mapBase"][i].length; j++) {
                if (this.maps[this.Status["level"]]["mapBase"][i][j] === 9) {
                    this.pacMan = [i, j]
                    this.StartP = [i, j]
                } else if (this.maps[this.Status["level"]]["mapBase"][i][j] === 8) {
                    this.MonsterArr.push([i, j])
                    this.MonsterStartPArr.push([i, j])
                } else if (this.maps[this.Status["level"]]["mapBase"][i][j] === 0) {
                    this.passPoint++
                }
            }
        }
    }

    play() {
        let MyTable = document.querySelector("#MyTable")
        let keepKey = ""

        let GetTableP = (MyTable, y = 0, x = 0, className = "wall") => {
            if (this.pacMan[0] === 0 || this.pacMan[0] === this.YMax || this.pacMan[1] === 0|| this.pacMan[1] === this.XMax) {
                return false
            }
            return MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].classList.contains(className)
        }
        let GoTableP = (MyTable, y = 0, x = 0, className = "zero") => {
                if((this.pacMan[1] === 0)&&keepKey =="ArrowLeft"){
                    if (MyTable.rows[this.pacMan[0]].childNodes[this.XMax].classList.contains(className)) {
                        MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                        MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                        MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                        MyTable.rows[this.pacMan[0] ].childNodes[this.XMax].id = "pacMan"
                        MyTable.rows[this.pacMan[0]].childNodes[this.XMax].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                        this.pacMan[1] +=this.XMax
                        this.Status.score++
                    } else if (MyTable.rows[this.pacMan[0]].childNodes[this.XMax].classList.contains("ok")) {
                        MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                        MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                        MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""

                        MyTable.rows[this.pacMan[0] ].childNodes[this.XMax].id = "pacMan"
                        MyTable.rows[this.pacMan[0]].childNodes[this.XMax].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                        this.pacMan[1] +=this.XMax
                    }
            }else  if((this.pacMan[1] === this.XMax)&&keepKey =="ArrowRight"){
                if (MyTable.rows[this.pacMan[0]].childNodes[0].classList.contains(className)) {
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                    MyTable.rows[this.pacMan[0] ].childNodes[0].id = "pacMan"
                    MyTable.rows[this.pacMan[0]].childNodes[0].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                    this.pacMan[1] =0
                    this.Status.score++
                } else if (MyTable.rows[this.pacMan[0]].childNodes[this.XMax].classList.contains("ok")) {
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                    MyTable.rows[this.pacMan[0] ].childNodes[0].id = "pacMan"
                    MyTable.rows[this.pacMan[0]].childNodes[0].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                    this.pacMan[1] =0
                }
            }else  if((this.pacMan[0] === 0)&&keepKey =="ArrowUp"){
                if (MyTable.rows[this.YMax].childNodes[this.pacMan[1]].classList.contains(className)) {
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                    MyTable.rows[this.YMax].childNodes[this.pacMan[1]].id = "pacMan"
                    MyTable.rows[this.YMax].childNodes[this.pacMan[1]].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                    this.pacMan[0] =this.YMax
                    this.Status.score++
                }else if (MyTable.rows[0].childNodes[this.pacMan[1]].classList.contains("ok")) {
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                    MyTable.rows[this.YMax].childNodes[this.pacMan[1]].id = "pacMan"
                    MyTable.rows[this.YMax].childNodes[this.pacMan[1]].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                    this.pacMan[0] =this.YMax
                }
            }else  if((this.pacMan[0] === this.YMax)&&keepKey =="ArrowDown"){
                if (MyTable.rows[0].childNodes[this.pacMan[1]].classList.contains(className)) {
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                    MyTable.rows[0].childNodes[this.pacMan[1]].id = "pacMan"
                    MyTable.rows[0].childNodes[this.pacMan[1]].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                    this.pacMan[0] =0
                    this.Status.score++
                }else if (MyTable.rows[0].childNodes[this.pacMan[1]].classList.contains("ok")) {
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                    MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                    MyTable.rows[0].childNodes[this.pacMan[1]].id = "pacMan"
                    MyTable.rows[0].childNodes[this.pacMan[1]].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                    this.pacMan[0] =0
                }
            }else{



            if (MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].classList.contains(className)) {
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""

                MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].id = "pacMan"
                MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                this.pacMan[0] += y
                this.pacMan[1] += x
                this.Status.score++
            } else if (MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].classList.contains("ok")) {
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].id = "pacMan"
                MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                this.pacMan[0] += y
                this.pacMan[1] += x
            } else if (MyTable.rows[this.pacMan[0] + y].childNodes[this.pacMan[1] + x].classList.contains("MonsterBox")) {
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].className = "ok"
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = ""
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                this.pacMan[0] = this.StartP[0]
                this.pacMan[1] = this.StartP[1]
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = "pacMan"
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                keepKey = ""
                this.Status.status = 0
            }}
        }

        let MonsterGetTableP = (MyTable,index, element, y = 0, x = 0) => {
            if (MyTable.rows[element[0] + y].childNodes[element[1] + x].classList.contains("wall") || MyTable.rows[element[0] + y].childNodes[element[1] + x].classList.contains("MonsterBox")) {
                return false
            }
            return true
        }
        let MonsterGoTableP = (MyTable,index, element, y = 0, x = 0) => {
            if (MyTable.rows[element[0] + y].childNodes[element[1] + x].classList.contains("zero") || MyTable.rows[element[0] + y].childNodes[element[1] + x].classList.contains("ok")) {
                MyTable.rows[element[0] + y].childNodes[element[1] + x].classList.toggle("MonsterBox")
                MyTable.rows[element[0] + y].childNodes[element[1] + x].innerHTML = `<canvas class="Monster" width="53" height="53"  />`
                MyTable.rows[element[0]].childNodes[element[1]].classList.toggle("MonsterBox")
                if (MyTable.rows[element[0]].childNodes[element[1]].classList.contains("zero")) {
                    MyTable.rows[element[0]].childNodes[element[1]].innerHTML = `<p class="Point"/>`
                } else {
                    MyTable.rows[element[0]].childNodes[element[1]].innerHTML = ""
                }
                element[0] += y
                element[1] += x
            } 
            if (MyTable.rows[element[0]].childNodes[element[1]].id ===("pacMan")){
                MyTable.rows[element[0]].childNodes[element[1]].classList.toggle("MonsterBox")
                if (MyTable.rows[element[0]].childNodes[element[1]].classList.contains("zero")) {
                    MyTable.rows[element[0]].childNodes[element[1]].innerHTML = `<p class="Point"/>`
                } else {
                    MyTable.rows[element[0]].childNodes[element[1]].innerHTML = ""
                }
                element[0] = this.MonsterStartPArr[index][0]
                element[1] = this.MonsterStartPArr[index][1]
                MyTable.rows[element[0]].childNodes[element[1]].classList.toggle("MonsterBox")
                MyTable.rows[element[0]].childNodes[element[1]].innerHTML = `<canvas class="Monster" width="53" height="53"  />`
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = ""
                this.pacMan[0] = this.StartP[0]
                this.pacMan[1] = this.StartP[1]
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].id = "pacMan"
                MyTable.rows[this.pacMan[0]].childNodes[this.pacMan[1]].innerHTML = `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"/></td>`
                this.Status.status = 0

            }

        
        }
        document.body.addEventListener("keydown", e => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
                keepKey = e.key
            }
        })


        let timer = setInterval(() => {
            pacManGo()
            MonsterGo()
            this.Status.StatusUpData()
            if (this.Status.status === 0) {
                if (this.Status.life !== 0) {
                    this.Status.life--
                    this.Status.status = 1
                } else {
                    alert("死了")
                    clearInterval(timer)
                    this.init()
                }
            }
            if (this.Status.score === this.passPoint) {
                this.Status.level += 1
                this.Status.score = 0
                this.Status.StatusUpData()
                clearInterval(timer)
                this.NextStage();

            }
            if (this.Status.level === this.maps.length-1) {
                this.init()
                alert("過關") 
            }
            this.Create.createMonster()
        }, 400-(1+this.Status.level)*30
        );



        let MonsterGo = () => {
            this.MonsterArr.map((element, index) => {
                let MonY = element[0] - this.pacMan[0]
                let MonX = element[1] - this.pacMan[1]
                let YHandle = ""
                let XHandle = ""
                MonY >= 0 ? YHandle = "down" : YHandle = "top"
                MonY == 0 ? YHandle = "horizontality" : null
                MonX >= 0 ? XHandle = "right" : XHandle = "left"
                MonX == 0 ? XHandle = "horizontality" : null
                let Handle = YHandle + XHandle
                switch (Handle) {
                    case "downright": //右下
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], +1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], +1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
                        }
                        break;
                    case "topright": //上右
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], +1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], +1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
                        }
                        break;
                    case "downleft": //左下
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], +1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], +1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
                        }
                        break;
                    case "topleft": //左上
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], +1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], +1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
                        }
                        break;
                    case "horizontalityright": //水平右
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
                        }
                        break;
                    case "horizontalityleft": //水平左
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
                        }
                        break;
                    case "tophorizontality": //垂直上
                        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], +1, 0)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], +1, 0)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
                        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
                            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
                        }
                break;
                        case "downhorizontality": //垂直下
        if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], -1, 0)) {
            MonsterGoTableP(MyTable, index,this.MonsterArr[index], -1, 0)
        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, -1)) {
            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, -1)
        } else if (MonsterGetTableP(MyTable, index,this.MonsterArr[index], 0, +1)) {
            MonsterGoTableP(MyTable, index,this.MonsterArr[index], 0, +1)
        }
        break;
                    default:
        break;
}
            })


        }
let pacManGo = () => {
    switch (keepKey) {
        case "ArrowUp":
            if (!GetTableP(MyTable, -1, 0)) {
                GoTableP(MyTable, -1, 0)
            }
            break;

        case "ArrowDown":
            if (!GetTableP(MyTable, +1, 0)) {
                GoTableP(MyTable, +1, 0)

            }
            break;

        case "ArrowLeft":
            if (!GetTableP(MyTable, 0, -1)) {
                GoTableP(MyTable, 0, -1)

            }
            break;

        case "ArrowRight":
            if (!GetTableP(MyTable, 0, +1)) {
                GoTableP(MyTable, 0, +1)

            }
            break;

        default:
            break;
    }
    this.Create.createPacMan()

}







    }
}
export default Play