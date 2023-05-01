class Create {
    //MyTable 反映表格
    //mapData這邊是處理過後的了
    constructor(MyTable, mapData){
        this.MyTable=MyTable
        this.mapData=mapData
    }
    createMap() {
        let createmap = JSON.parse(JSON.stringify(this.mapData))
        for (let i in this.mapData["mapBase"]) {
            var I = Number(i)
            if (I !== 0 && I !== this.mapData["mapBase"].length - 1) {
                for (let f in this.mapData["mapBase"][i]) {
                    let F = Number(f)
                    if (this.mapData["mapBase"][I][F] === 1) {
                        if (this.mapData["mapBase"][I - 1][F] === 1 && this.mapData["mapBase"][I + 1][F] === 1 && (this.mapData["mapBase"][I][F + 1] !== 1 || this.mapData["mapBase"][I][F - 1] !== 1)) {
                            createmap["mapBase"][I][F] = "|"
                        } else if ((this.mapData["mapBase"][I - 1][F] !== 1 || this.mapData["mapBase"][I + 1][F] !== 1) && this.mapData["mapBase"][I][F + 1] === 1 && this.mapData["mapBase"][I][F - 1] === 1) {
                            createmap["mapBase"][I][F] = "-"
                        } else if (this.mapData["mapBase"][I + 1][F] === 1 && (this.mapData["mapBase"][I][F + 1] === 1 && (this.mapData["mapBase"][I][F - 1]) !== 1 && this.mapData["mapBase"][I - 1][F] !== 1)) {//「
                            createmap["mapBase"][I][F] = "「"
                        } else if (this.mapData["mapBase"][I + 1][F] === 1 && (this.mapData["mapBase"][I][F - 1] === 1 && (this.mapData["mapBase"][I][F + 1]) !== 1 && this.mapData["mapBase"][I - 1][F] !== 1)) {//﹃
                            createmap["mapBase"][I][F] = "﹃"
                        } else if (this.mapData["mapBase"][I - 1][F] === 1 && (this.mapData["mapBase"][I][F - 1] === 1 && (this.mapData["mapBase"][I][F + 1]) !== 1 && this.mapData["mapBase"][I + 1][F] !== 1)) {//』
                            createmap["mapBase"][I][F] = "』"
                        } else if (this.mapData["mapBase"][I - 1][F] === 1 && (this.mapData["mapBase"][I][F + 1] === 1 && (this.mapData["mapBase"][I][F - 1]) !== 1 && this.mapData["mapBase"][I + 1][F] !== 1)) {//﹄
                            createmap["mapBase"][I][F] = "﹄"
                        } else {
                            if (this.mapData["mapBase"][I + 1][F + 1] !== 1) {
                                createmap["mapBase"][I][F] = "「"
                            } else if (this.mapData["mapBase"][I + 1][F - 1] !== 1) {
                                createmap["mapBase"][I][F] = "﹃"
                            } else if (this.mapData["mapBase"][I - 1][F - 1] !== 1) {
                                createmap["mapBase"][I][F] = "』"
                            } else if (this.mapData["mapBase"][I - 1][F + 1] !== 1) {
                                createmap["mapBase"][I][F] = "﹄"
                            }
                        }
                    }
                }
            } else {
                for (let f in this.mapData["mapBase"][I]) {
                    let F = Number(f)
                    if (F === 0 && I === 0) {
                        createmap["mapBase"][I][F] = "「"
                        continue
                    } else if (F === 0 && I === this.mapData["mapBase"].length - 1) {
                        createmap["mapBase"][I][F] = "﹄"
                        continue
                    } else if (F === this.mapData["mapBase"][I].length - 1 && I === 0) {
                        createmap["mapBase"][I][F] = "﹃"
                        continue

                    } else if (F === this.mapData["mapBase"][I].length - 1 && this.mapData["mapBase"].length - 1) {
                        createmap["mapBase"][I][F] = "』"
                        continue
                    } else if (createmap["mapBase"][I][F] === 1) {
                        createmap["mapBase"][I][F] = "-"
                    }
                }
            }
        }


        let data = ""
        for (let i in createmap["mapBase"]) {
            data += `<tr style="border-color:${createmap["borderColor"]}" >`
            for (let f in createmap["mapBase"][i]) {
                let key = createmap["mapBase"][i][f]
                switch (key) {
                    case 0:
                        data += `<td class='zero'><p class="Point"/></td>`
                        continue
                    case 1:
                        data += `<td class='wall one'></td>`
                        continue
                    case "|":
                        data += `<td class='wall' ><p class='straight' style="border-color:${createmap["borderColor"]}" /></td>`
                        continue
                    case "-":
                        data += `<td class='wall'><p class='vertical' style="border-color:${createmap["borderColor"]} ;"/></td>`
                        continue
                    case "「":
                        data += `<td class='wall'><p class='upperLeft'style="border-color:${createmap["borderColor"]}"/></td>`
                        continue
                    case "﹃":
                        data += `<td class='wall'><p class='upperRight' style="border-color:${createmap["borderColor"]}" /></td>`
                        continue
                    case "』":
                        data += `<td class='wall'><p class='bottomRight' style="border-color:${createmap["borderColor"]}" /></td>`
                        continue
                    case "﹄":
                        data += `<td class='wall'><p class='bottomLeft' style="border-color:${createmap["borderColor"]}" /></td>`
                        continue
                    case 9:
                        data += `<td id="pacMan"><canvas id="myCanvas" width="53" height="53"  /></td>`
                        continue
                    case 8:
                        data += `<td class="ok MonsterBox"><canvas class="Monster" width="53" height="53"  /></td>`
                        continue
                }


            }
            data += "</tr>"
        }
        this.MyTable.insertAdjacentHTML("afterBegin", data)
    }
    createPacMan() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "rgba(255,255,255,0.2);"
        ctx.fill()
        function test() {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.fillStyle = "red"
            ctx.lineTo(25, 25)
            ctx.arc(25, 25, 18, Math.PI * .8, Math.PI * 1.15, true);
            ctx.lineTo(25, 25)
            ctx.stroke();
            ctx.fill()
            ctx.closePath()
            setTimeout(() => {
                ctx.beginPath();
                ctx.moveTo(25, 25)
                ctx.arc(25, 25, 18, Math.PI * 1.04, Math.PI * 1.18, false);
                ctx.lineWidth = .6;
                ctx.fillStyle = "red"
                ctx.fill()
                ctx.stroke();
                ctx.closePath()
                ctx.beginPath();
                ctx.moveTo(25, 25)

                ctx.arc(25, 25, 18, Math.PI * 1, Math.PI * .78, true);

                ctx.lineWidth = .6;
                ctx.fillStyle = "red"
                ctx.fill()
                ctx.stroke();
                ctx.closePath()
            }, 500);
            setTimeout(() => {
                ctx.beginPath();
                ctx.moveTo(25, 25)
                ctx.arc(25, 25, 40, 0, Math.PI * 2, false);
                ctx.fillStyle = "rgb(36, 35, 35)"
                ctx.fill()
                ctx.closePath()
                test()
            }, 1000)
        }
        test()
    }

    createMonster() {
        var c = document.querySelectorAll(".Monster");
        c.forEach(element => {
            var ctx = element.getContext("2d");
            ctx.fillStyle = "rgba(255,255,255,0.2);"
            ctx.fill()
            function test() {
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.fillStyle = "green"
                ctx.lineTo(25, 25)
                ctx.arc(25, 25, 18, Math.PI * .8, Math.PI * 1.15, true);
                ctx.lineTo(25, 25)
                ctx.stroke();
                ctx.fill()
                ctx.closePath()
                setTimeout(() => {
                    ctx.beginPath();
                    ctx.moveTo(25, 25)
                    ctx.arc(25, 25, 18, Math.PI * 1.04, Math.PI * 1.18, false);
                    ctx.lineWidth = .6;
                    ctx.fillStyle = "green"
                    ctx.fill()
                    ctx.stroke();
                    ctx.closePath()
                    ctx.beginPath();
                    ctx.moveTo(25, 25)

                    ctx.arc(25, 25, 18, Math.PI * 1, Math.PI * .78, true);

                    ctx.lineWidth = .6;
                    ctx.fillStyle = "green"
                    ctx.fill()
                    ctx.stroke();
                    ctx.closePath()
                }, 500);
                setTimeout(() => {
                    ctx.beginPath();
                    ctx.moveTo(25, 25)
                    ctx.arc(25, 25, 40, 0, Math.PI * 2, false);
                    ctx.fillStyle = "rgb(36, 35, 35)"
                    ctx.fill()
                    ctx.closePath()
                    test()
                }, 1000)
            }
            test()
        }
        );




    }





}
export default Create