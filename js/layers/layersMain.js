addLayer("h", {
    name: "Oh hi", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0)
    }},
    color: "#94EE4E",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Hi", // Name of prestige currency
    baseResource: "atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        // if you are watching this, the hHg/kKg/ptHg are only for stats, these are not needed to be in
        hHg = new Decimal(1); //Hi times
        if (hasUpgrade('h', 14)) hHg = hHg.times(3);
        if (hasUpgrade('h', 32)) hHg = hHg.times(3);
        if (hasUpgrade('h', 34)) hHg = hHg.times(upgradeEffect('h', 34))
        if (hasUpgrade('h', 42)) hHg = hHg.times(10)
        if (hasUpgrade('h', 62)) hHg = hHg.times(10)
        if (getBuyableAmount('h', 12).gte(1)) hHg = hHg.times(buyableEffect('h', 12))
        hH = hHg;

        hKg = new Decimal(1); //Kawaii times
        if (hasMilestone('k', 0)) hKg = hKg.times(2);
        if (hasUpgrade('k', 15)) hKg = hKg.times(player.k.best.pow(2));
        hK = hKg;

        hPg = new Decimal(1);
        hPp = new Decimal(0);
        if (player.p.points.gte(1)) hPp = hPp.add(tmp.p.effect);
        hP = hPg.pow(hPp.add(1))

        hg = hHg.times(hKg); //count times
        if (hasUpgrade('k', 11)) hg = hg.times(upgradeEffect('k', 11))
        hp = hPp //count pow
        ha = new Decimal(0); //count add
        mult = hg.pow(hp.add(1)).add(ha); //total
        if (inChallenge('k', 14)) mult = mult.log(3.1415)
        hTotal = mult;
        return mult
    },
    passiveGeneration() {
        return hasUpgrade('h', 41) ? 0.0001 : 0
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for Hi", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return
        let keptUpgrades = [];
        if (hasUpgrade('p', 22) && resettingLayer == "p") keptUpgrades.push(11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44);
        if (inChallenge('k', 21)) keptUpgrades.length = 0

        let keep = [];

        layerDataReset(this.layer, keep);
        player[this.layer].upgrades.push(...keptUpgrades);
    },
    tabFormat: [
        "main-display",
        ["display-text", function() {return "Your hi has boost of ×<em>"+format(tmp[this.layer].gainMult)+"</em>"}],
        "blank",
        ["row", ["prestige-button", "blank", "blank", ["clickable", 11]]],
        "blank",
        ["microtabs", "Tiers"],
        ["microtabs", "Challenge"]
    ],
    microtabs: {
        Tiers: {
            "Tier 1": {
                content: [
                    ["column", [
                        /*["row", [["display-text", function() {
                            let desc = ""
                            if (inChallenge('k', 21)) desc = "Sorry idk how to hide microtabs"
                            return desc
                        }]]],*///i didn't know how to hide microtabs stuff
                        ["row", function() {return inChallenge('k', 21) ? "" : [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]}],
                        //["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]
                        ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                        ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]],
                        ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44]]]
                    ]]
                ],
                unlocked() {return inChallenge('k', 21) ? false : true}
            },
            "Tier 2": {
                content: [
                    ["column", [
                        /*["row", [["display-text", function() {
                            let desc = ""
                            if (inChallenge('k', 21)) desc = "Sorry idk how to hide microtabs, recommand to move to tier 1 for better view"
                            return desc
                        }]]],*/
                        ["row", function() {return inChallenge('k', 21) ? "" : [["buyable", 11], "blank", "blank", ["buyable", 12]]}],
                        ["row", function() {return inChallenge('k', 21) ? "" : [["upgrade", 61], ["upgrade", 62], ["upgrade", 63], ["upgrade", 64]]}],
                        ["row", [['upgrade', 991]]]
                    ]]
                ],
                unlocked() {
                    return hasUpgrade('h', 44)
                }
            },
        },
        Challenge: {
            "Challenge Km5 Tab": {
                content: [
                    ["column", [
                        ["row", [['display-text', function() {return inChallenge('k', 21) ? "this challenge need a long time to idle, take a rest" : ""}]]], 
                        ["row", function() {return inChallenge('k', 21) ? [["buyable", 11], "blank", "blank", ["buyable", 12]] : ""}] //I FIND IT
                        //["buyable", 11], "blank", "blank", ["buyable", 12]
                    ]]
                ],
                unlocked() {return inChallenge('k', 21)}
            }
        }
    },
    layerShown(){return true},
    upgrades: {
        //Hi (T1: 1-5)
        11: {
            title: "H1: Hi",
            description: "Triple atoms gain",
            cost() {
                let cost = one
                if (inChallenge('k', 21)) cost = new Decimal(Infinity)
                return cost
            }
        },
        12: {
            title: "H2: Welcome",
            description: ":3, atom boost atom",
            tooltip: "(Atoms+1)<sup>0.05",
            cost: new Decimal("1"),
            unlocked() {
                return hasUpgrade('h', 11)
            },
            effect() {
                let eff = player.points.add(1).pow(0.05)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        13: {
            title: "H3: Pog",
            description() {
                let desc = "Nothing";
                if (hasUpgrade('h', 22)) desc = "ok. still nothing here."
                return desc
            },
            cost: new Decimal("2"),
            unlocked() {
                return hasUpgrade('h', 12)
            }
        },
        14: {
            title: "H4: Say more hi",
            description: "Triple Hi",
            cost: new Decimal("5"),
            unlocked() {
                return hasUpgrade('h', 13)
            }
        },
        21: {
            title: "H5: Get Hi 15 pro msx",
            description: "+^1 atoms gain",
            cost: new Decimal("20"),
            unlocked() {
                return hasUpgrade('h', 14) && (!inChallenge('k', 11))
            }
        },
        22: {
            title: "H6: hahahahah",
            description: "Better description in Pog(H3) upgrade",
            cost: new Decimal("30"),
            unlocked() {
                return hasUpgrade('h', 21) && (!inChallenge('k', 11))
            }
        },
        23: {
            title: "H7: pick up some atoms",
            description: "atom grind +50",
            tooltip() {
                desc = "";
                if (inChallenge('k', 12)) desc = "I am OP now!!!!";
                return desc
            },
            cost: new Decimal("30"),
            unlocked() {
                return hasUpgrade('h', 22) && (!inChallenge('k', 11))
            }
        },
        24: {
            title: "H8: wasting time",
            description: "Resettimes boost atoms a lot",
            tooltip: "log(RT)",
            cost: new Decimal(150),
            unlocked() {
                return hasUpgrade('h', 23) && (!inChallenge('k', 11))
            },
            effect() {
                let eff = player.t.points.add(1).log10()
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        31: {
            title: "H9: New things",
            description: "new layer, Hi boost Atoms",
            tooltip: "log<sub>50</sub>(Atoms)",
            cost() {
                let cost = new Decimal(1500);
                if (inChallenge('k', 11)) cost = cost.div(45);
                return cost
            },
            unlocked() {
                return hasUpgrade('h', 24) || (inChallenge('k', 11) && hasUpgrade('h', 14))
            },
            effect() {
                let eff = player.h.points.add(1).log(50)
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        32: {
            title: "H10: Hello again",
            description: "no idea, triple hi omg",
            cost: new Decimal(150000),
            unlocked() {return (hasChallenge('k', 13) && hasUpgrade('h', 31))},
        },
        33: {
            title: "H11: Hello here",
            description: "atoms boost RT",
            tooltip: "(log<sub>75</sub>(Atoms))^0.6",
            cost: new Decimal("5e5"),
            unlocked() {return (hasUpgrade('h', 32))},
            effect() {
                let eff = player.points.add(1).log(75).pow(0.6)
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        34: {
            title: "H12: Hello there",
            description: "Hi boost Hi",
            tooltip() {
                desc = "log<sub>6.9</sub>(Hi/420)"
                if (hasUpgrade('p', 21)) desc = "2log<sub>6.9</sub>(Hi/420)"
                return desc
            },
            cost: new Decimal("5e5"),
            unlocked() {return hasUpgrade('h', 33)},
            effect() {
                let eff = player.h.points.add(1).div(42).log(6.9)
                if (hasUpgrade('p', 21)) eff = eff.times(2)
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        41: {
            title: "H13: ChatGPT",
            description: "Get 0.1‰ of Hi gain every second",
            cost: new Decimal("5e6"),
            unlocked() {return hasUpgrade('h', 34)}
        },
        42: {
            title: "H14: <h1>MASSIVE BOOST",
            description: "tenfold atoms, hi and rt",
            cost: new Decimal("7.5e6"),
            unlocked() {return hasUpgrade('h', 41)}
        },
        43: {
            title: "H15: New things in kawaii",
            description: "You can get kawaii now",
            cost: new Decimal("1e11"),
            unlocked() {return hasUpgrade('h', 42)}
        },
        /*43: {
            title: "H15: New layer. new day",
            description: "Another layer",
            cost: new Decimal("5e8"),
            unlocked() {return hasUpgrade('h', 42)}
        },*/
        44: {
            title: "H16: Start Tier 2",
            description: "new dimension",
            cost: new Decimal("1e20"),
            unlocked() {return hasUpgrade('h', 43) && hasChallenge('k', 14)}
        },

        //Hi (T2 6-10)
        61: {
            title: "H17: The beginning, what you want?",
            description() {
                desc = "???";
                if (hasUpgrade('h', 61)) desc = "Nothing, surprised!"
                return desc
            },
            cost(){
                let cost = new Decimal('2e20')
                if (inChallenge('k', 21)) cost = new Decimal(Infinity)
                return cost
            },
            onPurchase() {
                player.h.points = new Decimal("1e9e9")
            }
        },
        62: {
            title: "H18: Like it?",
            description: "Reward you a free tenfold boost for hi!",
            cost: new Decimal("1e9e9"),
            unlocked() {return hasUpgrade('h', 61)},
            onPurchase() {
                player.h.points = new Decimal("1e51")
            }
        },
        63: {
            title: "H19: oh i forgot reset something",
            description: "nothing haha",
            cost: new Decimal("1e50"),
            unlocked() {return hasUpgrade('h', 62)},
            onPurchase() {
                player.points = new Decimal(10);
                player.h.points = new Decimal(10);
            }
        },
        64: {
            title: "H20: End of the minigame in tier 2",
            description: "what a fun roller coaster lol, time for new layer",
            cost: new Decimal("1e22"),
            unlocked() {return hasUpgrade('h', 63)},
            onPurchase() {
                player.points = new Decimal(10);
                player.h.points = new Decimal(10);
            }
        },
        991: {
            title: "v0.0: Endgame<br>i have no idea",
            description: "make isEndgame() function return true!!!",
            cost: new Decimal('1e48'),
            unlocked() {return hasUpgrade('p', 24) && hasUpgrade('h', 64)}
        }
    },
    buyables: {
        11: {
            title: "Hb1: Hi -> Atoms",
            display() {
                let desc = "x1.05 Atoms Boost<br>"
                desc += `Amount: ${formatWhole(getBuyableAmount('h', 11))}/100<br>`
                desc += `Currently effect: ${format(this.effect())}x<br>`
                desc += `Cost: ${format(this.cost())} Hi`
                return desc
            },
            canAfford() {if (!hasUpgrade('h', 61)) {return player[this.layer].points.gte(this.cost())} else if (hasUpgrade('h', 64)) {return player[this.layer].points.gte(this.cost())} else {}},
            cost() {
                base = inChallenge('k', 21) ? ten : new Decimal(1e3);
                cost = new Decimal('1e6').times(base.pow(getBuyableAmount(this.layer, this.id)))
                return cost
            },
            buy() {
                player.h.points = player.h.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = new Decimal(1.1);
                effect = base.pow(getBuyableAmount('h', 11))
                return effect
            },
            purchaseLimit: 100,
            unlocked() {return inChallenge('k', 21) || hasChallenge('k', 21)}
        },
        12: {
            title: "Hb2: Atoms -> Hi",
            display() {
                let desc = "x1.03 Hi boost<br>"
                desc += `Amount: ${formatWhole(getBuyableAmount('h', 12))}/50<br>`
                desc += `Currently effect: ${format(this.effect())}x<br>`
                desc += `Cost: ${format(this.cost())} Atoms`
                return desc
            },
            canAfford() {if (!hasUpgrade('h', 61)) {return player.points.gte(this.cost())} else if (hasUpgrade('h', 64)) {return player.points.gte(this.cost())} else {}},
            cost() {
                base = inChallenge('k', 21) ? five : new Decimal(250)
                cost = new Decimal('1e4').times(base.pow(getBuyableAmount(this.layer, this.id)))
                return cost
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = new Decimal(1.05);
                effect = base.pow(getBuyableAmount('h', 11))
                return effect
            },
            purchaseLimit: 50,
            unlocked() {return inChallenge('k', 21) || hasChallenge('k', 21)}
        }
    },
    clickables: {
        11: {
            title: "Hold to reset",
            display: "(Mobile QoL)",
            onClick() {if(canReset(this.layer)) doReset(this.layer)},
            onHold() {if(canReset(this.layer)) doReset(this.layer)},
            canClick() {return true},
        }
    }
}),
addLayer("k", {
    name: "Kawaii",
    symbol: "K",
    //<img src='js/layers/images/SmolAme.gif' style='width:calc(40%);height:calc(40%);margin:10%'>
    position: 0,
    row: 1,
    color: "Pink",
    branches: ['h'],
    startData() {return {
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},
    resource: "Kawaii",
    baseResource: "Hi",
    type: "static",
    requires: new Decimal(2000),
    baseResource: "Hi",
    baseAmount() {
        return player.h.points
    },
    exponent() {
        let exp = 3;
        if (inChallenge('k', 13)) exp = 1e308; //inf lol
        if (hasUpgrade('h', 43)) {exp = 3} else if (player.k.points == 3) {exp = 1e308} else {exp = exp}
        if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 64)) {} else {exp = 1e308}
        return exp
    },
    layerShown() {
        if (hasUpgrade('h', 31) || hasMilestone('k', 0)) return true
    },
    gainMult() {
        kKg = new Decimal(1);
        if (hasUpgrade('k', 15)) kKg = kKg.times("1e8");
        kK = kKg;

        kg = kKg;
        kp = new Decimal(0);
        ka = new Decimal(0);
        kTotal = kg.pow(kp.add(1)).add(ka);
        mult = new Decimal(1).div(kTotal)
        return mult
    },
    tabFormat: [
        "main-display",
        ["display-text", function() {return "Kawaii cost has nerf of ×<em>"+format(kTotal)+"</em>"}],
        ["display-text", function() {return "Your best prestige points is "+format(player.k.best)}],
        "blank",
        ["row", ["prestige-button", "blank", "blank", ["clickable", 11]]],
        "blank",
        ["display-text", function() {return "You have "+format(player.h.points)+" Hi"}],
        ["display-text", function() {
            desc = "";
            if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 64)) {} else {desc = "<h1><font color='red'>Nice try, you can't prestige"}
            return desc 
        }],
        "blank",
        "milestones",
        "blank",
        "upgrades",
        "blank",
        "challenges"

    ],
    hotkeys: [{key: "k", description: "K: Reset for Kawaii", onPress(){if (canReset(this.layer)) doReset(this.layer)}},],
    upgrades: {
        /* temp ups
        1: {
            title: "",
            description: "",
            cost: new Deecimal(0),
            unlocked() {
                return hasChallenge('k', 13)
            }
        }
        */
        11: {
            title: "Balance this stupid thing",
            description: "This upgrade only work when you have only 2 kawaii and 1 reset layer. x10 Hi<br>won't cost you",
            tooltip: "512k is impossible for you, I was testing this with x10 dev speed",
            cost: new Decimal(2),
            unlocked() {
                return player.k.points.eq(2) && (tmp.p.layerShown == false)
            },
            effect() {
                let eff = new Decimal(1)
                if (player.k.points.eq(2)) eff = new Decimal(10)
                if (tmp.p.layerShown == true) eff = one
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            },
            onPurchase() {
                player.k.points = new Decimal(2)
            }
        },
        12: {
            title: "K1: We are kawaii",
            description: "double atom gain",
            cost: new Decimal(4),
            unlocked() {return player.k.points.gte(4) || hasUpgrade('k', 12)}
        },
        13: {
            title: "K2: time is cute",
            description: "kawaii boost rt gain",
            tooltip: "Kawaii^0.9",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('k', 12)},
            effect() {
                let eff = player.k.points.pow(0.9);
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        14: {
            title: "K3: Boost boosts boost",
            description: "Boost of Hi boost atom boost rn",
            tooltip: "log<sub>2</sub>(Hi'b)<sup>0.5</sup>",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('k', 13)},
            effect() {
                let eff = tmp.h.gainMult.add(1).log(2).pow(0.5);
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        15: {
            title: "K4: Kawaii you ne!",
            description: "divide kawaii cost by 100,000,000",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('k', 14)}
        },
        //chall
        101: {
            title: "Kc3.1: Fubuki is so~~~~~",
            description: "so~~~~~",
            tooltip: "log<sub>69420</sub>(1.0314159) atom gain",
            cost: new Decimal("1e87"),
            currencyDisplayName: "Atoms",
            currencyInternalName: "points",
            unlocked() {
                return inChallenge('k', 13)
            },
            onPurchase() {
                player.points = new Decimal(0);
                player.h.points = new Decimal(0);
            }
        },
        102: {
            title: "Kc3.2: DAMN CUTE",
            description: "lol gg, x100 atom gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Atoms",
            currencyInternalName: "points",
            unlocked() {
                return inChallenge('k', 13) && hasUpgrade('k', 101)
            },
            onPurchase() {
                player.points = new Decimal(0);
                player.h.points = new Decimal(0);
            }
        },
    },
    milestones: {
        0: {
            requirementDescription: "Km1: Cute",
            effectDescription: "Get a Kawaii, double Hi gain",
            done() {
                return player.k.points.gte(1)
            }
        },
        1: {
            requirementDescription: "Km2: Triple Cute",
            effectDescription: "Unlock challenges",
            done() {
                return player.k.points.gte(3)
            },
            unlocked() {return hasMilestone('k', 0)}
        },
        2: {
            requirementDescription: "Km3: Huh?",
            effectDescription: "3 Kawaii and 3 Challenges done, start upgrades in Hi",
            done() {
                return player.k.points.gte(3) && (hasChallenge('k', 11) && hasChallenge('k', 12) && hasChallenge('k', 13))
            },
            unlocked() {return hasMilestone('k', 1)}
        },
        3: {
            requirementDescription: "Km4: 5 Kawaii",
            effectDescription() {
                return "Best Kawaii boost Hi<br>Currently: "+format(this.effect())+"x"
            },
            tooltip: "Kawaii<sup>2<sub>",
            done() {
                return player.k.points.gte(5)
            },
            unlocked() {return hasMilestone('k', 2)},
            effect() {
                return player.k.best.pow(2)
            }
        }
    },
    challenges: {
        11: {
            name: "Kc1: Playing games",
            challengeDescription: "Hi's row 2 upgrades are useless now, but row 3 upgrades cost divide by 45",
            tooltip: "",
            canComplete() {return player.h.points.gte(200)},
            goalDescription: "200 Hi",
            rewardDescription() {
                desc = "???";
                if (hasChallenge('k', 11)) desc = "Unlock the second challenge, x1.5 atom gain";
                return desc
            },
            unlocked() {return hasMilestone('k', 1)}
        },
        12: {
            name: "Kc2: lock the door",
            challengeDescription: "Pow of atom's gain locked to ^0.1",
            canComplete() {return player.h.points.gte(2000)},
            goalDescription: "2000 Hi",
            rewardDescription() {
                desc = "???";
                if (hasChallenge('k', 12)) desc = "Unlock the third challenge, +^0.3 atom gain";
                return desc
            },
            unlocked() {return hasChallenge('k', 11)}
        },
        13: {
            name: "Kc3: Throw rubbish",
            challengeDescription: "+^5 atom gain, but you have to buy all upgrades about this challenge (No prestige)",
            canComplete() {return (player.h.points.gte("1e69") && hasUpgrade('k', 102))},
            goalDescription: "1e69 Hi",
            rewardDescription() {
                desc = "???";
                if (hasChallenge('k', 13)) desc = "gg, some new upgrades in Hi Layers";
                return desc
            },
            unlocked() {return hasChallenge('k', 12)}
        },
        14: {
            name: "Kc4: Watch gura <br>saying 'A'",
            challengeDescription: "she is too cute, log(&pi;) your hi total boost<br>Formula: log<sub>3.1415</sub>(Hi'b)<br> (recommand after get Km4)",
            canComplete() {return player.h.points.gte("1e10")},
            goalDescription: "1e10 Hi",
            rewardDescription() {
                desc = "???";
                if (hasChallenge('k', 14)) desc = "more things in Hi, Atom pow +^1";
                return desc
            },
            unlocked() {return hasChallenge('k', 13)}
        },
        21: {
            name() {return "Kc5: H...i....."},
            challengeDescription() {
                let show = tmp.p.layerShown ? "P5" : "??"
                if (hasChallenge('k', 21)) show = "P5"
                let desc = "Hi upgrades break, but there are some buyables<br>"
                desc = desc + `(recommand after get ${show})`
                return desc
            },
            canComplete() {return player.points.gte(50000) && player.h.points.gte(2.5e8)},
            goalDescription: "50,000 Atoms and 250,000,000 Hi",
            rewardDescription() {
                desc = "???";
                if (hasChallenge('k', 21)) desc = "Unlock the buyables those in challenges";
                return desc
            },
            /*style() {return{ //i give up
                'background-image': "url('Km5.jpg')",
                'background-size': 'cover',
                'font-size': '15px',
	            'color': 'white',
                'text-shadow': '0 0 10px black',
            }},*/
            onEnter() {
                player.h.upgrades = [];
                player.h.buyables[11] = zero
                player.h.buyables[12] = zero
            },
            onExit() {
                player.h.buyables[11] = zero
                player.h.buyables[12] = zero
            },
            unlocked() {return hasChallenge('k', 14)}
        },
        99: {
            name() {
                return textColor('red', '<b>K Boss: Smol Ame (Next update maybe)')
            },
            challengeDescription() {
                return textColor('red', 'nothing rn')
            },
            canComplete() {return false},
            fullDisplay() {
                let desc = textOutline( 2, 'red', textColor('black', '<b><h1>GROUND POUND</h1><b><br>'))
                //desc = desc + textOutline(1, 'black', textColor('white', '<b><h2>this is future boss, maybe playable in next update (doesnt mean you beat the whole layer)</b></h2>'))
                return desc
            },
            style() {return{
                'background-image': "url('SmolAme.gif')",
                'background-size': 'cover',
            }},
            unlocked() {return isEndgame()}
        }
    },
    clickables: {
        11: {
            title: "Hold to reset",
            display: "(Mobile QoL)",
            onClick() {if(canReset(this.layer)) doReset(this.layer)},
            onHold() {if(canReset(this.layer)) doReset(this.layer)},
            canClick() {return true},
        }
    }
}),
addLayer("p", {
    name: "power",
    symbol: "P",
    position: 1,
    row: 1,
    color: "yellow",
    branches: ['h'],
    startData() { return {
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},
    resource() {
        desc = "Power"
        if (player.p.points.gte(2)) desc = desc + "s";
        return desc
    },
    baseResource: "Hi",
    type: "normal",
    requires: new Decimal("1e22"),
    baseAmount() {return player.h.points},
    exponent() {
        let exp = 0.5
        if (inChallenge('k', 13)) exp = (1/1e308);
        if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 64)) {} else {exp = (1/1e308)}
        return exp
    },
    layerShown() {return hasUpgrade('h', 64) || player.p.best.gte(1)},
    effect() {
        logbase = four
        if (hasUpgrade('p', 24)) logbase = new Decimal(3.75)
        eff = player.p.points.pow(0.09).log(logbase)
        return eff
    },
    effectDescription() {
        desc = "which are boosting Hi gain by +^" + format(tmp.p.effect)+'<br>'
        logbase = '4'
        if (hasUpgrade('p', 24)) logbase = '3.75'
        desc += `Formula: log<sub>${logbase}</sub>(Powers<sup>0.09</sup>)`
        return desc
    },
    hotkeys: [{key: "p", description: "P: Reset for Powers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},],
    gainMult() {
        pPg = new Decimal(1);
        if (hasUpgrade('p', 11)) pPg = pPg.times(2);
        if (hasUpgrade('p', 12)) pPg = pPg.times(2);
        if (hasUpgrade('p', 13)) pPg = pPg.times(upgradeEffect('p', 13));
        if (hasUpgrade('p', 14)) pPg = pPg.times(upgradeEffect('p', 14));
        if (hasUpgrade('p', 23)) pPg = pPg.times(upgradeEffect('p', 23));
        pP = pPg;

        pg = pPg;
        pp = new Decimal(0);
        pa = new Decimal(0);
        mult = pg.pow(pp.add(1)).add(pa);
        return mult
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                ["display-text", function() {return "Your Powers has boost of ×<em>"+format(tmp[this.layer].gainMult)+"</em>"}],
                ["display-text", function() {return "Your total Powers is "+formatWhole(player.p.total)}],
                "blank",
                ["row", ["prestige-button", "blank", "blank", ["clickable", 101],'blank', ["clickable", 102]]],
                "blank",
                ["display-text", function() {return "You have "+format(player.h.points)+" Hi"}],
                ["display-text", function() {
                    desc = "";
                    if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 64)) {} else {desc = "<h1><font color='red'>No."}
                    return desc 
                }],
                "blank",
                "milestones",
                "blank",
                "upgrades"
            ]
        },
        "Energy": {
            embedLayer: 'e',
            unlocked() {return hasMilestone('p', 1)} //test on
        }
    },
    clickables: {
        101: {
            title: "Hold to reset",
            display: "(Mobile QoL)",
            onClick() {if(canReset(this.layer)) doReset(this.layer)},
            onHold() {if(canReset(this.layer)) doReset(this.layer)},
            canClick() {return true},
        },
        102: {
            title: "Hi reset",
            display() {
                let desc = `<h2>(+${formatWhole(getResetGain('h'))})</h2><br>`
                desc = desc + "(Mobile QoL)"
                return desc
            },
            onClick() {if(canReset('h')) doReset('h')},
            onHold() {if(canReset('h')) doReset('h')},
            canClick() {return true},
            style() {return {
                'background-color': tmp.h.color
            }}
        }
    },
    milestones: {
        0: {
            requirementDescription: "Pm1: .",
            effectDescription: "You have a power only, what do you want to expect?",
            done() {
                return player.p.points.gte(1)
            }
        },
        1: {
            requirementDescription: "Pm2: 10M Powers",
            effectDescription: "new tab, new currency",
            done() {return player.p.points.gte(10000000)}
        }
    },
    upgrades: {
        //Powers (1-5)
        11: {
            title: "P1: Double Power gain",
            description: "Get more power now",
            cost: new Decimal(50)
        },
        12: {
            title: "P2: Sell for HK$0.87",
            description: "Great, double again",
            tooltip: "base on HK Electricity Bill",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('p', 11)}
        },
        13: {
            title: "P3: Build a power saver",
            description: "Total power boost power gain",
            tooltip: "log<sub>5</sub>(T'Power<sup>0.95</sup>)",
            cost: new Decimal(2500),
            unlocked() {return hasUpgrade('p', 12)},
            effect() {
                let base = player.p.total
                let eff = base.pow(0.95).log(5)
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        14: {
            title: "P4: buy a sora panel",
            description: "+1x power gain every power upgrade you have",
            tooltip() {return "wait, sora?"},
            cost: new Decimal(2000000),
            unlocked() {return hasUpgrade('p', 13)},
            effect() {
                let eff = countPowerUpgrades()
                return eff
            },
            effectDisplay() { 
                return "+"+format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        21: {
            title: "P5: run out of idea, let me chill",
            description: "chilling, double H12 boost",
            cost: new Decimal(50000000),
            unlocked() {return hasUpgrade('p', 14)}
        },
        22: {
            title: "P6: We like roller coaster",
            description: "keep tier 1 upgrades on power reset",
            cost: new Decimal('5e13'),
            unlocked() {return hasUpgrade('p', 21)}
        },
        23: {
            title: "P7: Boost's boost boosts boost",
            description: "get confused? let me explain:<br> Hi boost's H12 boost boosts power's boost",
            tooltip: "log(1+H12)<sup>1.1",
            cost: new Decimal('1e14'),
            unlocked() {return hasUpgrade('p', 22)},
            effect() {
                let eff = upgradeEffect('h', 34).add(1).log(10).pow(1.1)
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        24: {
            title: "P8: Go back to Hi",
            description: "Some new upgrades and divide power effect log base by 0.25",
            cost: new Decimal('1e15'),
            unlocked() {return hasUpgrade('p', 23)}
        }
    }

})
addLayer("e", { //v0.0 done = 100%, playtest = false
    name: "energy",
    symbol: "E",
    color: "orange",
    postion: 2,
    row: 1,
    branches: ['p'],
    startData() {return{
        points: zero,
        clickTime: one,
        mult: zero
    }},
    resource: "Energy",
    type: "none",
    layerShown() {return false},
    tooltip: "Tab layer in Power layer",
    energyMult() {
        let gain = one
        if (hasUpgrade('e', 15)) gain = gain.times(upgradeEffect('e', 15))
        return gain
    },
    generatorGain() {
        let gain = zero
        gain = gain.add(buyableEffect('e', 11))
        gain = gain.add(buyableEffect('e', 12))
        gain = gain.add(buyableEffect('e', 13))
        return gain
    },
    gainMult() {
        eE = tmp.e.generatorGain.times(tmp.e.energyMult)
        gain = eE
        return gain
    },
    manualMult() {
        let gain = one
        return gain 
    },
    update(diff) {
        let gain = tmp.e.gainMult
        player.e.points = player.e.points.add(gain.times(diff))
        if (player.e.clickTime.gt(1)) player.e.clickTime = player.e.clickTime.sub(one.times(diff))
    },

    tabFormat: [
        "main-display",
        ["display-text", function() {return "For some reason, Generators not produce energy, not powers"}],
        ["display-text", function() {return "You are getting "+format(tmp.e.gainMult)+ " Energy per second"}],
        ["display-text", function() {return "Your Powers has boost of ×<em>"+format(tmp.e.energyMult)+"</em>"}],
        "blank",
        ["clickables", [1]],
        "blank",
        "buyables",
        "blank",
        "blank",
       ["upgrades", [1]]
    ],
    buyables: {
        11: {
            title: "Eb1: Solar Panel",
            display() {
                let desc = "Getting energy from sun. <br>"
                eff = one
                if (hasUpgrade('e', 11)) eff = eff.times(2)
                desc = desc + formatWhole(eff)+" Energy/sec<br>"
                desc = desc + "You have total "+formatWhole(getBuyableAmount(this.layer, this.id))+ " Solar panels, which gain total "+format(this.effect().div(tmp.e.generatorGain).times(100))+"% of your energy<br>"
                desc = desc + "<h3>Cost: "+formatWhole(this.cost())+" Energy</h3><br>"
                desc = desc
                return desc
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            cost() {
                cost = ten.times(new Decimal(1.9).pow(getBuyableAmount(this.layer, this.id)))
                return cost
            },
            buy() {
                player.e.points = player.e.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = one
                if (hasUpgrade('e', 11)) base = base.times(2)
                effect = base.times(getBuyableAmount(this.layer, this.id))
                return effect
            },
            purchaseLimit: 30,
        },
        12: {
            title: "Eb2: Wind Turbine",
            display() {
                let desc = "Wind power. <br>"
                eff = five
                if (hasUpgrade('e', 12)) eff = eff.times(2)
                desc = desc + formatWhole(eff)+" Energy/sec<br>"
                desc = desc + "You have total "+formatWhole(getBuyableAmount(this.layer, this.id))+" Wind turbines, which gain total "+format(this.effect().div(tmp.e.generatorGain).times(100))+"% of your energy<br>"
                desc = desc + "<h3>Cost: "+formatWhole(this.cost())+" Energy</h3>"
                return desc
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            cost() {
                cost = new Decimal(100).times(new Decimal(2.1).pow(getBuyableAmount(this.layer, this.id)))
                return cost
            },
            buy() {
                player.e.points = player.e.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = five
                if (hasUpgrade('e', 12)) base = base.times(2)
                effect = base.times(getBuyableAmount(this.layer, this.id))
                return effect
            },
            purchaseLimit: 25,
            unlocked() {return getBuyableAmount('e', 11).gte(2)}
        },
        13: {
            title: "Eb3: Gas Generator",
            display() {
                let desc = "where did you get gas???<br>"
                eff = new Decimal(64)
                if (hasUpgrade('e', 13)) eff = eff.times(2)
                desc = desc + formatWhole(eff)+" Energy/sec<br>"
                desc = desc + "You have total "+formatWhole(getBuyableAmount(this.layer, this.id))+" Wind turbines, which gain total "+format(this.effect().div(tmp.e.generatorGain).times(100))+"% of your energy<br>"
                desc = desc + "<h3>Cost: "+formatWhole(this.cost())+" Energy</h3>"
                return desc
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            cost() {
                cost = new Decimal(5750).times(new Decimal(2.3).pow(getBuyableAmount(this.layer, this.id)))
                return cost
            },
            buy() {
                player.e.points = player.e.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = new Decimal(64)
                if (hasUpgrade('e', 13)) base = base.times(2)
                effect = base.times(getBuyableAmount(this.layer, this.id))
                return effect
            },
            purchaseLimit: 22,
            unlocked() {return getBuyableAmount('e', 12).gte(3)}
        },
        21: {
            title: "",
            unlocked() {return false}
        }
    },
    upgrades: {
        11: {
            title: "E1: Better material in solar panels",
            description: "Double solar panels effect",
            cost: new Decimal(500),
            unlocked() {return getBuyableAmount('e', 11).gte(6)}
        },
        12: {
            title: "E2: Wind Turbine more effective",
            description: "Double effect of wind turbine",
            cost: new Decimal(8750),
            unlocked() {return getBuyableAmount('e', 12).gte(4)}
        },
        13: {
            title: "E3: Better gas using",
            description: "Gas more clear now (?), Double effect of gas generator",
            cost: new Decimal(50000),
            unlocked() {return getBuyableAmount('e', 13).gte(3)}
        },
        14: {
            title: "E4: Will be in next update",
            description: "Double ??? effect",
            cost: new Decimal(Infinity),
            unlocked() {return hasUpgrade('e', 13)}
        },
        15: {
            title: "E5: Revamp manual generator",
            description: "Click it can get a short terms of boost",
            tooltip: "time = 5 sec<br>1+log<sub>7776</sub>(1+time)",
            cost: new Decimal(25000),
            effect() {
                let j = player.e.clickTime.log(7776)
                let eff = one.add(j)
                if (player.e.clickTime.lte(1)) eff = new Decimal(1)
                if (eff.lt(1)) eff = new Decimal(1)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            },
            unlocked() {return hasUpgrade('e', 11) && getBuyableAmount('e', 12).gte(5)}
        }
    },
    clickables: {
        11: {
            title: "Manual Generator",
            display() {
                desc = "Click to get "+format(tmp.e.manualMult)+" Energy"
                return desc
            },
            onClick() {
                player.e.points = player.e.points.add(tmp.e.manualMult)
                player.e.clickTime = six
            },
            canClick() {return true},
        }
    }
})
