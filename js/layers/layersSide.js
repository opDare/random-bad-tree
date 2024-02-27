addLayer("t", {
    name: "Time",
    symbol: "T",
    color: "grey",
    row: "side",
    type: "none",
    resource: "ResetTimes",
    tooltip() {
        return "Time Count"
    },
    startData() { return { 
        unlocked: true,
        points: new Decimal(0.001),
        pt: new Decimal(0.001),
        st: new Decimal(0.001),
    } },    
    update(diff) {
        if (player.offTime !== undefined) player.t.st = new Decimal(0); 
        rtGain = tmp.t.gainMult;
        tGain = new Decimal(1);
        if (player.offTime !== undefined) {
            rtGain = new Decimal(0);
            tGain = rtGain
        }
        if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 63)) {} else {rtGain = new Decimal(0)}
        player.t.points = player.t.points.plus(rtGain.times(diff));
        player.t.pt = player.t.pt.plus(tGain.times(diff));
        player.t.st = player.t.st.plus(tGain.times(diff));
    },
    gainMult() {
        rtTg = new Decimal(1); //T times
        if (hasUpgrade('t', 11)) rtTg = rtTg.times(1.1);
        if (hasUpgrade('t', 12)) rtTg = rtTg.times(3);
        rtT = rtTg

        rtHg = new Decimal(1); //Hi times
        if (hasUpgrade('h', 33)) rtHg = rtHg.times(upgradeEffect('h', 33))
        if (hasUpgrade('h', 42)) rtHg = rtHg.times(10)
        rtH = rtHg
        rtKg = new Decimal(1);
        if (hasUpgrade('k', 13)) rtKg = rtKg.times(upgradeEffect('k', 13))
        rtK = rtKg
        rtg = rtTg.times(rtHg).times(rtKg);//counts
        rtp = new Decimal(0);
        rta = new Decimal(0);
        gain = rtg.pow(rtp.add(1)).add(rta)
        return gain
    },

    tabFormat: [
        ["display-text", function() {return "You have total "+ format(player.t.points)+ " ResetTimes | " + format(player.t.pt) + " Playtimes | "+ format(player.t.st) + " Session Times"}],
        ["display-text", function() {
            let desc = "";
            if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 64)) {} else {desc = "For some reason, the clock is overloaded, make time stop running"}
            return desc
        }],
        "blank",
        ["microtabs", "Upgrades"]
    ],
    microtabs: {
        Upgrades: {
            "ResetTimes": {
                content: [
                    ["column", [
                        ["row", [["display-text", function() {return "This is ResetTime Board"}]]],
                        ["row", [["display-text", function() {return "<i>Every reset layer reset this</i>"}]]],
                        ["row", ["blank"]],
                        ["row", ["blank"]],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]]
                    ]]
                ]
            },
            "Session Times": {
                content: [
                    ["column", [
                        ["row", [["display-text", function() {return "This is Session Time Board"}]]],
                        ["row", ["blank"]],
                        ["row", ["blank"]],
                        ["row", ["milestones"]],
                        ["row", ["blank"]],
                        ["row", ["blank"]],
                        ["row", [["upgrade", 101]]]
                    ]]
                ]
            }
        }
    },
    milestones: {
        0: {
            requirementDescription: "STm1: Times blow",
            effectDescription: "ok. unlock next milestone<br>(10 minutes)",
            done() {
                return player.t.st.gte(600)
            }
        },
        1: {
            requirementDescription: "STm2: afk in roblox???",
            effectDescription: "nice 20 minutes waste",
            done() {
                return player.t.st.gte(1200)
            },
            unlocked() {
                return hasMilestone('t', 0)
            }
        },
        2: {
            requirementDescription: "STm3: ok you are crazy",
            effectDescription: "an hour, in a sit",
            done() {
                return player.t.st.gte(3600)
            },
            unlocked() {
                return hasMilestone('t', 1)
            }
        },
        3: {
            requirementDescription: "STm4: ...",
            effectDescription: "1.5 hours, can you rest 5 minutes.",
            done() {
                return player.t.st.gte(5400)
            },
            unlocked() {
                return hasMilestone('t', 2)
            }
        },
        4: {
            requirementDescription: "STm5:ok you win",
            effectDescription: "2 hours, give you some reward",
            tooltip() {
                desc = "+0.1 atom boost every hour in session time<br>" +
                "Currently: x"+format(new Decimal(1).add(new Decimal(0.1).times(player.t.st.add(1).div(3600))));
                return desc
            },
            done() {
                return player.t.st.gte(7200)
            },
            unlocked() {
                return hasMilestone('t', 3)
            },
        }
    },
    upgrades: {
        //rt
        11: {
            title: "RT1: Use times",
            description: "x1.1 rt",
            cost: new Decimal(1200)
        },
        12: {
            title: "RT2: waste times",
            description: "idk what to do, x3 rt",
            cost: new Decimal("1e5"),
            unlocked() {return hasUpgrade('t', 11)}
        },
        /*13: {
            title: "RT3: Master of wasting times",
            description: "Double Kawaii gain",
            cost: new Decimal("1e8"),
            unlocked() {
                return hasUpgrade('t', 12)
            }
        },*/
        101: {
            title: "ST1: Using times???",
            description: "why?????",
            cost: new Decimal(10000),
            currencyDisplayName: "Session Times",
            currencyInternalName: "st",
            currencyLayer: "t"
        } 
        //st
        //Did dumb things below lol, i was forgot milestone exist 
        /*
        101: {
            title: "ST1: 10 Minutes in a sit",
            description: "ok. unlock next upgrade",
            cost() {
                if (!player.t.st.gte(600) || hasUpgrade('t', 101)) {return new Decimal(600)} else {return new Decimal(0)}
            },
            currencyDisplayName: "Session Times",
            currencyInternalName: "st",
            currencyLayer: "t"
        },
        102: {
            title: "ST2: get kicked in roblox due to afk",
            description: "20 minutes waste",
            cost() {
                if (!player.t.st.gte(1200) || hasUpgrade('t', 102)) {return new Decimal(1200)} else {return new Decimal(0)}
            },
            currencyDisplayName: "Session Times",
            currencyInternalName: "st",
            currencyLayer: "t",
            unlocked() {return hasUpgrade('t', 101)}
        },
        103: {
            title: "ST3: why",
            description: "an hour, so what?",
            cost() {
                if (!player.t.st.gte(3600) || hasUpgrade('t', 103)) {return new Decimal(3600)} else {return new Decimal(0)}
            },
            currencyDisplayName: "Session Times",
            currencyInternalName: "st",
            currencyLayer: "t",
            unlocked() {return hasUpgrade('t', 102)}
        },
        104: {
            title: "ST4: ...",
            description:  "2 hours... How can you play that long.<br>",
            cost() {
                if (!player.t.st.gte(7200) || hasUpgrade('t', 104)) {return new Decimal(7200)} else {return new Decimal(0)}
            },
            currencyDisplayName: "Session Times",
            currencyInternalName: "st",
            currencyLayer: "t",
            unlocked() {return hasUpgrade('t', 103)}
        }*/
    }
}),
addLayer("a", {
    name: "Achievement",
    symbol: "A",
    color: "yellow",
    row: "side",
    tooltip: "Achievement",
    tabFormat: {
        "Main": {
            content: [
                ["display-text", function() {return `Achievement: ${formatWhole(countAchievement())}/10`}],
                "blank",
                "blank",
                ["achievements", [1]],
                ["achievements", [2]]
            ]
        },
        "Endgame": {
            content: [
                ["display-text", function() {return `You have ${formatWhole(countEndgame())}/1 Endgame Achievements`}],
                "blank",
                "blank",
                ["achievements", [99]]
            ]
        },
    },
    achievements: {
        11: {
            name: "A1: Buy nothing",
            tooltip: "Purchase an upgrade that does literally nothing",
            done() {return hasUpgrade('h', 13)}
        },
        12: {
            name: "A2: Time is money, and money are atoms",
            tooltip: "Purchase H8",
            done() {return hasUpgrade('h', 24)}
        },
        13: {
            name: "A3: これは可愛いようね！",
            tooltip: "Start journey of cute",
            done() {return player.k.points.gte(1)}
        },
        14: {
            name: "A4: Challenging",
            tooltip: "You did a challenge :shock:",
            done() {return hasChallenge('k', 11)}
        },
        15: {
            name: "A5: too big",
            tooltip: "STOP RAISING IT (1e50)",
            done() {return player.h.points.gte("1e50")}
        },
        21: {
            name: "A6: Seems useless",
            tooltip: "0.01%???",
            done() {return hasUpgrade('h', 41)}
        },
        22: {
            name: "A7: Power",
            tooltip: "It power Hi!",
            done() {return tmp.p.effect.gt(0)}
        },
        23: {
            name: "A8: Energy",
            done() {return player.e.points.gte(1)}
        },
        24: {
            name: "A9: boost boost boost boost boost bo...",
            tooltip: "@.@",
            done() {return hasUpgrade('p', 23)}
        },
        25: {
            name: "A10: Random achievemt",
            done() {return hasChallenge('k', 21)}
        },
        991: {
            name: "v0.0 Endgame",
            tooltip: "Thanks for your support and playing!",
            done() {return isEndgame() == true}
        }
    }
})