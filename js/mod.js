let modInfo = {
	name: "The Random Tree",
	id: "TRT",
	author: "op_Dare",
	pointsName: "atoms",
	modFiles: ["tree.js", "layers/functions.js",
	"layers/layersMain.js", "layers/layersSide.js", "layers/layersDoc.js"
	],

	discordName: "Trees, The DC server",
	discordLink: "https://discord.gg/R6hNx75skd",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "idk",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added 3 layers<br>
		- Added many things`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0);
	let exp = new Decimal(1); //exp start here
	if (hasUpgrade('h', 21) && (!inChallenge('k', 11))) exp = exp.add(1);
	if (hasChallenge('k', 12)) exp = exp.add(0.3)
	if (hasChallenge('k', 14)) exp = exp.add(1)
	if (inChallenge('k', 12)) exp = new Decimal(0.1);
	if (inChallenge('k', 13)) exp = exp.add(10);
	
	let gain = new Decimal(1);
	if (hasUpgrade('h', 11)) gain = gain.times(3); // times start here
	if (hasUpgrade('h', 12)) gain = gain.times(upgradeEffect('h', 12));
	if (hasUpgrade('h', 24) && (!inChallenge('k', 11))) gain = gain.times(upgradeEffect('h', 24));
	if (hasUpgrade('h', 31)) gain = gain.times(upgradeEffect('h', 31));
	if (hasUpgrade('h', 42)) gain = gain.times(10);
	if (hasMilestone('t', 4)) gain = gain.times(new Decimal(1).add(new Decimal(0.1).times(player.t.st.div(3600))));
	if (hasChallenge('k', 11)) gain = gain.times(1.5);
	if (hasUpgrade('t', 12)) gain = gain.times(2);
	if (hasUpgrade('k', 14)) gain = gain.times(upgradeEffect('k', 14));
	if (getBuyableAmount('h', 11).gte(1)) gain = gain.times(buyableEffect('h', 11))
	
	//in chal
	if (hasUpgrade('k', 101) && inChallenge('k', 13)) gain = gain.times(0.0028);
	if (hasUpgrade('k', 102) && inChallenge('k', 13)) gain = gain.times(100)
	if (gain.lt(1)) gain = new Decimal(1);
	gain = gain.pow(exp);
	if (hasUpgrade('h', 23) && (!inChallenge('k', 11))) gain = gain.add(50); //add start here
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('h', 991)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
