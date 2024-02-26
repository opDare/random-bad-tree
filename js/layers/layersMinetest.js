addLayer("m", {
    name: "Mining",
    symbol: "M",
    position: 1,
    row: 1,
    color: "grey",
    branches: ['h'],
    type: "none",
    resource: "Franc",
    startData() { return {
        points: new Decimal(0),
        pickTier: new Decimal(0),
        //material
            //common
                //1
                stone: new Decimal(0),
                tin: new Decimal(0),
                coal: new Decimal(0),
            //uncommon
                //1
                iron: new Decimal(0),
                gold: new Decimal(0),
            //rare
                //1
                jade: new Decimal(0),
            //legendary
                //1
                diamond: new Decimal(0),
            //Divine
                //1
                ddarreism: new Decimal(0)
    }},
    tooltip() {
    },
    layerShown() {
        return false
    },
    tabFormat: [
        ["display-text", function()  {return "<h1><font color='red'>Not Done, how can you get in here"}]
    ]   
})