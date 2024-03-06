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
        if (hasMilestone('k', 4)) hKg = hKg.times(player.k.best.pow(2));
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
                    /*["column", [
                        ["row", [['display-text', function() {return inChallenge('k', 21) ? "this challenge need a long time to idle, take a rest" : ""}]]], 
                        ["row", function() {return inChallenge('k', 21) ? [["buyable", 11], "blank", "blank", ["buyable", 12]] : ""}] //I FIND IT
                        //["buyable", 11], "blank", "blank", ["buyable", 12]
                    ]]*/
                    
                    ["column", function() {return inChallenge('k', 21) ?
                    [
                        ["row", [["display-text", "test"]]],
                        ["row", [["buyable", 11], "blank", "blank", ["buyable", 12]]],
                        ["row", [["upgrade", 1001], ["upgrade", 1002]]]
                    ] : "" }]
                    
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
            tooltip: "log<sub>50</sub>(Hi)",
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
            description: "You can get kawaii now. (Perm)",
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

        //cha
        1001: {
            title: "Km5.1: Cost of buyables cost reduce by the total buyables amount in this challenge",
            description: "The 'creature' of balance update",
            tooltip: "1+(TB)<sup>0.01",
            cost: new Decimal("25000000"),
            unlocked() {return getBuyableAmount('h', 11).gte(3) && inChallenge('k', 21)},
            effect() {
                let eff = one.add(countKm5buyables().pow(0.01))
                if (eff.lt(1)) eff = one
                return eff
            },
            effectDisplay() { 
                return `÷${format(upgradeEffect(this.layer, this.id))}`
            }
        },
        1002: {
            title: "Km5.2: Kb2 buyables amount count in Kb1 effect and double Kb2 effect",
            description: "Why did i make this challenge",
            cost: new Decimal("25000"),
            currencyDisplayName: "Atoms",
            currencyInternalName: "points",
            unlocked() {return getBuyableAmount('h', 12).gte(5) && inChallenge('k', 21)}
        },
        //endgame
        991: {
            title: "v0.0: Endgame<br>i have no idea",
            description: "make isEndgame() function return true!!!",
            cost: new Decimal('1e48'),
            unlocked() {return hasUpgrade('p', 24) && hasUpgrade('h', 64)}
        },
    },
    buyables: {
        11: {
            title: "Hb1: Hi -> Atoms",
            display() {
                let desc = "x1.1 Atoms Boost for buyable<br>"
                desc += `Amount: ${formatWhole(getBuyableAmount('h', 11))}/100<br>`
                desc += `Currently effect: ${format(this.effect())}x<br>`
                desc += `Cost: ${format(this.cost())} Hi`
                return desc
            },
            canAfford() {if (!hasUpgrade('h', 61)) {return player[this.layer].points.gte(this.cost())} else if (hasUpgrade('h', 64)) {return player[this.layer].points.gte(this.cost())} else {}},
            cost() {
                base = inChallenge('k', 21) ? three : new Decimal(1e3);
                cost = new Decimal('1e6').times(base.pow(getBuyableAmount(this.layer, this.id)))
                if (hasUpgrade('h', 1001)) cost = cost.div(upgradeEffect('h', 1001))
                return cost
            },
            buy() {
                player.h.points = player.h.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = new Decimal(1.1);
                effect = base.pow(getBuyableAmount('h', 11))
                if (hasUpgrade('h', 1002)) effect = base.pow(getBuyableAmount('h', 11).add(getBuyableAmount('h', 12)))
                return effect
            },
            purchaseLimit: 100,
            unlocked() {return inChallenge('k', 21) || hasChallenge('k', 21)}
        },
        12: {
            title: "Hb2: Atoms -> Hi",
            display() {
                let desc = "x1.05 Hi boost per buyable<br>"
                desc += `Amount: ${formatWhole(getBuyableAmount('h', 12))}/50<br>`
                desc += `Currently effect: ${format(this.effect())}x<br>`
                desc += `Cost: ${format(this.cost())} Atoms`
                return desc
            },
            canAfford() {if (!hasUpgrade('h', 61)) {return player.points.gte(this.cost())} else if (hasUpgrade('h', 64)) {return player.points.gte(this.cost())} else {}},
            cost() {
                base = inChallenge('k', 21) ? new Decimal(1.3) : new Decimal(250)
                cost = new Decimal('1e4').times(base.pow(getBuyableAmount(this.layer, this.id)))
                if (hasUpgrade('h', 1001)) cost = cost.div(upgradeEffect('h', 1001))
                return cost
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {
                base = new Decimal(1.05);
                effect = base.pow(getBuyableAmount('h', 11))
                if (hasUpgrade('h', 1002)) effect = effect.times(2)
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
        if (hasUpgrade('h', 43) && player.k.best.gte(4)) {exp = 3} else if (player.k.points == 3) {exp = 1e308} else {exp = exp}
        if (!hasUpgrade('h', 61)) {} else if (hasUpgrade('h', 64)) {} else {exp = 1e308}
        return exp
    },
    layerShown() {
        if (hasUpgrade('h', 31) || hasMilestone('k', 0)) return true
    },
    canBuyMax() {return hasMilestone('k', 3)},
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
            description: "This upgrade only work when you have only 2 kawaii and have no Km4. x20 Hi<br>won't cost you",
            tooltip: "512k is too hard for you, I was testing this with x10 dev speed",
            cost: new Decimal(2),
            unlocked() {
                return player.k.points.eq(2) && (!hasMilestone('k', 3))
            },
            effect() {
                let eff = new Decimal(1)
                if (player.k.points.eq(2)) eff = new Decimal(20)
                if (this.unlocked() == false) eff = one
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
            tooltip: "Kawaii<sup>0.9</sup>",
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
            requirementDescription: "Km4: Quadruple Cute",
            effectDescription: "get 4 kawaii, you can buy max now.",
            done() {return player.k.points.gte(4)},
            unlocked() {return hasMilestone('k', 2)}
        },
        4: {
            requirementDescription: "Km5: 5 Kawaii",
            effectDescription() {
                return "Best Kawaii boost Hi<br>Currently: "+format(this.effect())+"x"
            },
            tooltip: "Kawaii<sup>2<sub>",
            done() {
                return player.k.points.gte(5)
            },
            unlocked() {return hasMilestone('k', 3)},
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
                desc = "small boost";
                if (hasChallenge('k', 11)) desc = "x1.5 atom gain";
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
                desc = "some boost";
                if (hasChallenge('k', 12)) desc = "+^0.3 atom gain";
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
                desc = "new things";
                if (hasChallenge('k', 13)) desc = "gg, some new upgrades in Hi Layers";
                return desc
            },
            unlocked() {return hasChallenge('k', 12)},
            onExit() {player.k.upgrades = []}
        },
        14: {
            name: "Kc4: Watch gura <br>saying 'A'",
            challengeDescription: "she is too cute, log(&pi;) your hi total boost<br>Formula: log<sub>3.1415</sub>(Hi'b)<br> (recommand after get Km5)",
            canComplete() {return player.h.points.gte("1e10")},
            goalDescription: "1e10 Hi",
            rewardDescription() {
                desc = "new things and some boost";
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
                let desc = "Hi non-challenge upgrades break, but there are some buyables<br>"
                desc = desc + `(recommand after get ${show})`
                return desc
            },
            canComplete() {return getBuyableAmount('h', 11).gte(20) && getBuyableAmount('h', 12).gte(50)},
            goalDescription() {
                let desc = "Buy ??? and ???"
                if (tmp.p.layerShown) desc = "Buy 20 Kb1 and 50 Kb2"
                hasChallenge('k', 21) ? desc = "Buy 20 Kb1 and 50 Kb2" : ""
                return desc
            },
            rewardDescription() {
                desc = "new things";
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
        return player.p.points.eq(0) ? zero : eff
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

}),
addLayer("e", { 
    name: "energy",
    symbol: "E",
    color: "orange",
    position: 2,
    row: 1,
    branches: ['p'],
    startData() {return{
        points: zero,
        clickTime: one,
        mult: zero
    }},
    resource: "Energy",
    type: "none",
    layerShown() {return (hasMilestone('p', 1) && shiftDown) ? true : false},
    tooltip: "Sub layer in Power layer",
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
        ["display-text", function() {return "For some reason, Generators not produce energy, not powers (Hold shift to show sub layer in tree tab)"}],
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
}),
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
            tGain = rtGain;
            player.shift = false
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
            cost: new Decimal(200)
        },
        12: {
            title: "RT2: Do something",
            description: "x1.01 Atoms",
            cost: new Decimal(3500),
            unlocked() {return hasUpgrade('t', 11)}
        },
        13: {
            title: "RT3: waste times",
            description: "idk what to do, x3 rt",
            cost: new Decimal("1e5"),
            unlocked() {return hasUpgrade('t', 12)}
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
}),
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
        if (hasUpgrade('t', 12)) ptTg = ptTg.times(1.01)
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
        if (inChallenge('k', 12)) ptp = new Decimal(0);
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
                ["infobox", "ptT"],
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
        ptT: {
            title() {return listStat('t')},
            body() {
                let desc = "<h3>Time Layer has total ×<em>"+ format(ptT)+ "</em> boost for ResetTimes with list below:</h3><br><br>"
                desc = desc + "<h3>Multiply:</h3><br>"
                if (hasUpgrade('t', 12)) desc = desc + "RT2: x1.01<br>"
                if (hasMilestone('t', 4)) desc = desc + `STm5: x${STm5}<br>`
                desc = desc + "Total: x" + format(ptTg)+ "<br><br><h3>Powers:</h3><br>"
                desc = desc + "Total: +^" + format(new Decimal(0)) + "<br><br><h3>Adds:</h3><br>"
                desc = desc + "Total: +" + format(new Decimal(0))
                return desc
            },
            unlocked() {return hasUpgrade('t', 12) || hasMilestone('t', 4)}
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
                if (hasUpgrade('k', 15)) desc = desc + "Km5: x"+format(player.k.best.pow(2))+"<br>"
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
