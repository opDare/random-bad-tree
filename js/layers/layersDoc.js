addLayer("stat", {
    name: "stat",
    symbol: "STA",
    color: "white",
    row: "side",
    type: "none",
    startData() {return {
        points: new Decimal(0)
    }},
    ptStatCal() {
        ptHg = new Decimal(1); //H layers
	    if (hasUpgrade('h', 11)) ptHg = ptHg.times(3);
	    if (hasUpgrade('h', 12)) ptHg = ptHg.times(upgradeEffect('h', 12));
	    if (hasUpgrade('h', 24)) ptHg = ptHg.times(upgradeEffect('h', 24));
        if (hasUpgrade('h', 31)) ptHg = ptHg.times(upgradeEffect('h', 31));
        if (hasUpgrade('h', 42)) ptHg = ptHg.times(10);
        if (getBuyableAmount('h', 11).gte(1)) ptHg = ptHg.times(buyableEffect('h', 11))
	    ptHp = new Decimal(0); 
	    if (hasUpgrade('h', 21)) ptHp = ptHp.add(1);
	    ptHa = new Decimal(0); 
	    if (hasUpgrade('h', 23)) ptHa = ptHa.add(50);
        ptH = ptHg.pow(ptHp.add(1)).add(ptHa)
        
        ptTg = new Decimal(1); //T layers
            STm5 = new Decimal(1).add(new Decimal(0.1).times(player.t.st.div(3600)));
        if (hasMilestone('t', 4)) ptTg = ptTg.times(STm5);
        ptT = ptTg.pow(1).add(0);
        
        ptKg = new Decimal(1); //Kawaii as korone
        if (hasChallenge('k', 11)) ptKg = ptKg.times(1.5);
        if (hasUpgrade('k', 12)) ptKg = ptKg.times(2);
        if (hasUpgrade('k', 14)) ptKg = ptKg.times(upgradeEffect('k', 14))
        ptKp = new Decimal(0);
        if (hasChallenge('k', 12)) ptKp = ptKp.add(0.3);
        if (hasChallenge('k', 14)) ptKp = ptKp.add(1);
        ptK = ptKg.pow(ptKp.add(1))

	    ptg = ptHg.times(ptTg).times(ptKg)
        if (inChallenge('k', 13) && hasUpgrade('k', 101)) ptg = ptg.times(0.0028)
        if (ptg.lt(1)) ptg = new Decimal(1)
	    ptp = ptHp.add(ptKp)
        if (inChallenge('k', 12)) ptp = new Decimal(0.1);
        if (inChallenge('k', 13)) ptp = ptp.add(10);
	    pta = ptHa
    },
    tooltip() {
        return "Stats for all boost"
    },
    tabFormat: {
        "Infos": {
            content: [
                ["infobox", "infos"]
            ]
        },
        "Atoms": {
            content: [
                ["infobox", "ptTotal"],
                ["infobox", "ptH"],
                ["infobox", "ptK"]
            ]
        },
        "ResetTime": {
            content: [
                ["infobox", "rtTotal"],
                ["infobox", "rtT"],
                ["infobox", "rtH"],
                ["infobox", "rtK"]
            ]
        },
        "Hi": {
            content: [
                ["infobox", "hTotal"],
                ["infobox", "hH"],
                ["infobox", "hK"],
                ["infobox", "hP"]
            ]
        },
        "Kawaii": {
            content: [
                ["infobox", "kTotal"],
                ["infobox", "kK"]
            ],
            unlocked() {return hasUpgrade('k', 15) || hasUpgrade('t', 13)}
        },
        "Power": {
            content: [
                ["microtabs", "Power_Layer"]
            ],
            unlocked() {return hasUpgrade('h', 64)}
        },
        "Test": {
            content: [
                ["infobox", "test"]
            ],
            unlocked() {return false}
        }
    },
    microtabs: {
        Power_Layer: {
            "Power": {
                content:[
                    ["infobox", "pTotal"],
                    ["infobox", "pP"]
                ]
            },
            "Energy": {
                content: [
                    ["infobox", "eInfo"],
                    ["infobox", "eTotal"],
                    ["infobox", "eE"]
                ],
                unlocked() {return hasMilestone('p', 1)}
            }
        }
    },
    infoboxes: {
        //Others
        infos: { //Don't touch
            title: "<b> Must read:<b>",
            body() {
                return "This Layer shows all boost given by anywhere, please note that total boost in boost list isn't completely correct.<br>"+
                "All total boost calculate with this formula below, unless there are special note <br><br>"+
                "(mult<sup>1+exp</sup>)+add<br>"+
                "If total mult, exp, and add are 60, 0.01 and 20 respectively, the formula is:<br><br>"+
                "60<sup>1.01</sup>+20=82.5"+
                "<br><br>idk why i make this useless thing."
            }
        },
        //Atoms
        ptTotal: {
            title: "Atoms: Total Boost Display",
            body() {
                let desc ="<h3>You have total ×<em>"+ format(getPointGen())+ "</em> boost for Atoms with total layer boost below: </h3><br>"
                if (inChallenge('k', 12)) desc = desc + "<br> Challenge Kc2: ^0.1 (locked)"
                if (inChallenge('k', 13)) desc = desc + "<br> Challenge Kc3: +^10"
                if (inChallenge('k', 13) && hasUpgrade('k', 101)) desc = desc + "<br> Kc3.1: x0.0028"
                if (inChallenge('k', 13) && hasUpgrade('k', 102)) desc = desc + "<br> Kc3.2: x100"
                desc = desc + "<br> <b>Time Boost:</b> ×"+ format(ptTg)+ " ,+^"+ format(0)+ " and +"+ format(0)
                desc = desc + "<br> <b>Hi Boost:</b> ×"+ format(ptHg)+ " ,+^"+ format(ptHp)+ " and +"+ format(ptHa)
                if (player.k.best.gte(1)) desc = desc + "<br> <b>Kawaii Boost:</b> ×"+ format(ptKg)+ " ,+^"+ format(ptKp)+ " and +"+ format(0)
                desc = desc + "<br><br>Total: ×"+format(ptg)+" ,+^"+format(ptp)+ " and +"+format(pta)+ " | ×"+format(getPointGen())
                return desc
            }
        },
        ptT: { //useless
            title() {return listStat('t')},
            body() {
                let desc = "<h3>Times Layer has total ×<em>"+ format(ptT)+ "</em> boost for Atoms with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasMilestone('t', 4)) desc = desc + "STm5: x" + format(STm5)+ "<br>"
                return desc
            }
        },
        ptH: {
            title: "Hi Layer Boost List",
            body() {
                let desc = "<h3>Hi Layer has total ×<em>"+ format(ptH)+ "</em> boost for Atoms with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('h', 11)) desc = desc + "H1: x3<br>"
                if (hasUpgrade('h', 12)) desc = desc + "H2: x" + format(upgradeEffect('h', 12))+ "<br>"
                if (hasUpgrade('h', 24) && (!inChallenge('k', 11))) desc = desc + "H8: x" + format(upgradeEffect('h', 24))+ "<br>"
                if (hasUpgrade('h', 31)) desc = desc + "H9: x" + format(upgradeEffect('h', 31))+ "<br>"
                if (hasUpgrade('h', 42)) desc = desc + "H14: x10 <br>"
                if (getBuyableAmount('h', 11).gte(1)) desc += `Hb1: x${buyableEffect('h', 11)}<br>`
                desc = desc + "Total: x" + format(ptHg)+ "<br><br><h3>Powers:</h3><br>"
                if (hasUpgrade('h', 21) && (!inChallenge('k', 11))) desc = desc + "H5: +^1<br>"
                desc = desc + "Total: +^" + format(ptHp) + "<br><br><h3>Adds:</h3><br>"
                if (hasUpgrade('h', 23) && (!inChallenge('k', 11))) desc = desc + "H7: +50<br>"
                desc = desc + "Total: +" + format(ptHa)
                return desc
            }
        },
        ptK: {
            title: "Kawaii Layer Boost List",
            body() {
                let desc = "<h3>Hawaii Layer has total ×<em>"+ format(ptK)+ "</em> boost for Atoms with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasChallenge('k', 11)) desc = desc + "Kc1: x1.5<br>"
                if (hasUpgrade('k', 12)) desc = desc + "H1: x2<br>"
                if (hasUpgrade('k', 14)) desc = desc + "H3: x" + format(upgradeEffect('k', 14))+ "<br>"
                desc = desc + "Total: x" + format(ptKg)+ "<br><br><h3>Powers:</h3><br>"
                if (hasChallenge('k', 12)) desc = desc + "Kc2: +^0.3<br>"
                if (hasChallenge('k', 14)) desc = desc + "Kc4: +^1<br>"
                desc = desc + "Total: +^" + format(ptKp) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(0)
                return desc
            },
            unlocked() {return player.k.best.gte(3)} 
        },

        //Resettimes
        rtTotal: {
            title() {return totalStat('t')},
            body() { 
                let desc = "<h3>You have total ×<em>"+ format(tmp.t.gainMult)+ "</em> boost for ResetTimes with total layer boost below: </h3><br>"+
                "<br> <b>Time Boost:</b> ×"+ format(rtTg)+ " ,+^"+ format(0)+ " and +"+format(0)+ " | Total: ×"+format(rtT)
                if (hasUpgrade('h', 33)) desc = desc + "<br> <b>Hi Boost:</b> ×"+ format(rtHg)+ " ,+^"+ format(0)+ " and +"+format(0)+ " | Total: ×"+format(rtH)
                if (hasUpgrade('k', 13)) desc = desc + "<br> <b>Hi Boost:</b> ×"+ format(rtKg)+ " ,+^"+ format(0)+ " and +"+format(0)+ " | Total: ×"+format(rtK)
                desc = desc + "<br><br>Total: ×"+format(rtg)+" ,+^"+format(rtp)+ " and +"+format(rta)+ " | ×"+format(tmp.t.gainMult)
                return desc
            }
        },
        rtT : {
            title: "Time Layer Boost List",
            body() {
                let desc = "<h3>Time Layer has total ×<em>"+ format(rtT)+ "</em> boost for ResetTimes with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('t', 11)) desc = desc + "RT1: x1.1"+ "<br>"
                if (hasUpgrade('t', 11)) desc = desc + "RT2: x3"+ "<br>"
                desc = desc + "Total: x" + format(rtTg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(new Decimal(0)) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            },
        },
        rtH: {
            title: "Hi Layer Boost List",
            body() {
                let desc = "<h3>Hi Layer has total ×<em>"+ format(rtH)+ "</em> boost for ResetTimes with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('h', 33)) desc = desc + "H11: x" + format(upgradeEffect('h', 33))+ "<br>"
                if (hasUpgrade('h', 42)) desc = desc + "H14: x10 <br>"
                desc = desc + "Total: x" + format(rtHg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(new Decimal(0)) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            },
            unlocked() {return hasUpgrade('h', 33)}
        },
        rtK: {
            title: "Kawaii Layer Boost List:",
            body() {
                let desc = "<h3>Kawaii Layer has total ×<em>"+ format(rtK)+ "</em> boost for ResetTimes with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('k', 13)) desc = desc + "K2: x" + format(upgradeEffect('k', 13))+ "<br>"
                desc = desc + "Total: x" + format(rtKg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(new Decimal(0)) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            },
            unlocked() {return hasUpgrade('k', 13)}
        },

        //Hi
        hTotal: {
            title() {return totalStat('h')},
            body() {
                let desc = "<h3>You have total ×<em>"+ format(tmp.h.gainMult)+ "</em> boost for Hi with total layer boost below: </h3><br>"
                if (inChallenge('k', 14)) desc = desc + "<br> Challenge Kc4: log<sub>3.1415</sub>(Hi'b)<br>"
                desc = desc + "<br> <b>Hi Boost:</b> ×"+ format(hHg)+ " ,+^"+ format(0)+ " and +"+format(0)+ " | Total: ×"+format(hH)
                if (player.k.best.gte(1)) desc = desc + "<br> <b>Kawaii Boost:</b> ×"+ format(hKg)+ " ,+^"+ format(0)+ " and +"+format(0)+ " | Total: ×"+format(hK);
                if (tmp.p.layerShown == true) desc = desc + "<br> <b>Power Boost:</b> ×"+ format(hPg)+ " ,+^"+ format(hPp)+ " and +"+format(0)+ " | Total: ×"+format(hP);
                desc = desc + "<br><br>Total: ×"+ format(hg)+ " ,+^"+ format(hp)+ " and +"+format(ha)+ " | Total: ×"+format(hTotal);
                return desc
            }
        },
        hH: {
            title: "Hi Layer Boost List",
            body() {
                let desc = "<h3>Hi Layer has total ×<em>"+ format(hH)+ "</em> boost for Hi with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('h', 14)) desc = desc + "H4: x3<br>"
                if (hasUpgrade('h', 32)) desc = desc + "H10: x3<br>"
                if (hasUpgrade('h', 34)) desc = desc + "H12: x" + format(upgradeEffect('h', 34))+ "<br>"
                if (hasUpgrade('h', 42)) desc = desc + "H14: x10 <br>"
                if (hasUpgrade('h', 62)) desc = desc + "H18: x10 <br>"
                if (getBuyableAmount('h', 12).gte(1)) desc += `Hb1: x${buyableEffect('h', 12)}<br>`
                desc = desc + "Total: x" + format(hHg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(0) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            }
        },
        hK: {
            title: "Kawaii Layer Boost List",
            body() {
                let desc = "<h3>Kawaii Layer has total ×<em>"+ format(hK)+ "</em> boost for Hi with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasMilestone('k', 0)) desc = desc + "Km1: x2<br>"
                if (hasUpgrade('k', 15)) desc = desc + "K4: x"+format(player.k.best.pow(2))+"<br>"
                desc = desc + "Total: x" + format(hKg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(0) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            }
        },
        hP: {
            title: "Power Layer Boost List",
            body() {
                let desc = "<h3>Power Layer has total ×<em>"+ format(hP)+ "</em> boost for Hi with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                desc = desc + "Total: x" + format(hPg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Power Layer effect: +^"+format(tmp.p.effect)+"<br>"
                desc = desc + "Total: +^" + format(hPp) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            },
            unlocked() {return tmp.p.layerShown}
        },

        //Kawaii
        kTotal: {
            title() {return totalsStat('k')},
            body() {
                let desc = "<h3>You have total ×<em>"+ format(tmp.k.gainMult)+ "</em> cost divide for Kawaii with total layer divide below: </h3><br>"
                desc = desc + "<br> <b>Hawaii divide:</b> ×"+ format(kKg)+ " ,+^"+ format(0)+ " and +"+format(0)+ " | Total: ×"+format(kK)
                desc = desc + "<br><br>Total: ×"+ format(kg)+ " ,+^"+ format(kp)+ " and +"+format(ka)+ " | Total: ×"+format(kTotal)
                return desc
            }
        },
        kK: {
            title: "Kawaii Layer cost divide List",
            body() {
                let desc = "<h3>Kawaii Layer has total ×<em>"+ format(kK)+ "</em> cost divide for Hi with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('k', 15)) desc = desc + "K4: x100,000,000<br>"
                desc = desc + "Total: x" + format(kKg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(new Decimal(0)) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            }
        },

        //Powers
        pTotal: {
            title() {return totalStat('p')},
            body() {
                let desc = "<h3>You have total ×<em>"+ format(tmp.p.gainMult)+ "</em> boost for Hi with total layer boost below: </h3><br>"
                desc = desc + "<br> <b>Power Boost:</b> ×"+ format(pPg)+ " ,+^"+ format(zero)+ " and +"+format(zero)+ " | Total: ×"+format(pP)
                desc = desc + "<br><br>Total: ×"+ format(pg)+ " ,+^"+ format(pp)+ " and +"+format(pa)+ " | Total: ×"+format(tmp.p.gainMult)
                return desc
            }
        },
        pP: {
            title: "Power Layer Boost List",
            body() {
                let desc = "<h3>Power Layer has total ×<em>"+ format(hP)+ "</em> boost for Power with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('p', 11)) desc = desc + "P1: x2<br>"
                if (hasUpgrade('p', 12)) desc = desc + "P2: x2<br>"
                if (hasUpgrade('p', 13)) desc = desc + "P3: x" + format(upgradeEffect('p', 13))+ "<br>"
                if (hasUpgrade('p', 14)) desc = desc + "P4: +" + format(upgradeEffect('p', 14))+ "x<br>"
                if (hasUpgrade('p', 23)) desc = desc + "P7: x" + format(upgradeEffect('p', 23))+ "<br>"
                desc = desc + "Total: x" + format(pPg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(zero) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(zero)
                return desc
            }
        },

        //Energy
        eInfo: {
            title: "Energy Info (Must Read)",
            body() {
                let desc = "Energy Total Boost calculate with the formula below<br><br>"
                desc += "generator×(mult<sup>1+exp</sup>)+add"
                return desc
            }
        },
        eTotal: {
            title() {return totalStat('e')},
            body() {//eEg here is generator
                let desc = "<h3>You have total ×<em>"+ format(tmp.e.gainMult)+ "</em> boost for Energy with total layer boost below: </h3><br>"
                desc = desc + `<br> <b>Power Boost:</b> Generator: +${formatWhole(tmp.e.generatorGain)}, ×` + format(tmp.e.energyMult)+ " ,+^"+ format(zero)+ " and +"+format(zero)+ " | Total: ×"+format(eE)
                return desc
            }
        },
        eE: {
            title() {return listStat('e')},
            body() {
                let desc = "<h3>Power Layer has total ×<em>"+ format(hP)+ "</em> boost for Power with list below:</h3><br><br>"
                desc += "<h3>Generator:</h3><br>"
                if (getBuyableAmount('e', 11).gte(1)) desc+= `Eb1: +${buyableEffect('e', 11)}<br>`
                if (getBuyableAmount('e', 12).gte(1)) desc+= `Eb2: +${buyableEffect('e', 12)}<br>`
                if (getBuyableAmount('e', 13).gte(1)) desc+= `Eb3: +${buyableEffect('e', 13)}<br>`
                desc = desc + "Total: +"+formatWhole(tmp.e.generatorGain)+"<br><br><h3>Multiply:</h3><br>"
                desc = desc + "Total: x" + format(tmp.e.energyMult)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(zero) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(zero)
                return desc
            }
        },

        //test
        test: {
            title() {return totalStat('h')},
            //body() {return totalBodyStat('h')}
        }
    }
})
/*addLayer("infos", {
    name: "infos",
    symbol: "In",
    color: "blue",
    row: "side",
    tooltip() {
        return "Tips for game"
    },
    tabFormat: {
        "Main": {
            content: [
                ["infobox", "main"]
            ]
        },
    },
    infoboxes: {
        main: {
            title: "Welcome to this trash random tree",
            body() {return "Hi, welcome. I don't know what can i say. Just get numbers as big as possible."}
        }
    }
})*/