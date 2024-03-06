//maths
//tens
var zero = new Decimal(0)
var one = new Decimal(1)
var two = new Decimal(2)
var three = new Decimal(3)
var four = new Decimal(4)
var five = new Decimal(5)
var six = new Decimal(6)
var seven = new Decimal(7)
var eight = new Decimal(8)
var nine = new Decimal(9)
var ten = new Decimal(10)




//count things
function countPowerUpgrades() {
    let count = 0
    if (hasUpgrade('p', 11)) count++
    if (hasUpgrade('p', 12)) count++
    if (hasUpgrade('p', 13)) count++
    if (hasUpgrade('p', 14)) count++
    if (hasUpgrade('p', 21)) count++
    if (hasUpgrade('p', 22)) count++
    if (hasUpgrade('p', 23)) count++
    if (hasUpgrade('p', 24)) count++
    count = new Decimal(count)
    return count
}
function countKm5buyables() {
    let count = zero
    count = count.add(getBuyableAmount('h', 11))
    count = count.add(getBuyableAmount('h', 12))
    return count
}
function countAchievement() {
    let count = 0
    if (hasAchievement('a', 11)) count++
    if (hasAchievement('a', 12)) count++
    if (hasAchievement('a', 13)) count++
    if (hasAchievement('a', 14)) count++
    if (hasAchievement('a', 15)) count++
    if (hasAchievement('a', 21)) count++
    if (hasAchievement('a', 22)) count++
    if (hasAchievement('a', 23)) count++
    if (hasAchievement('a', 24)) count++
    if (hasAchievement('a', 25)) count++
    count = new Decimal(count)
    return count
}
function countEndgame() {
    let count = 0
    if (hasAchievement('a', 991)) count++
    count = new Decimal(count)
    return count
}




//others
function isMobile() {
    let check = true
    if (typeof screen.orientation !== undefined) check = false
    return check
}




//stat lyaer use here!!!!
//text color lol
function textColor(color, str) {
	return `<text style='color:${color}'>${str}</text>`
}
//text background
function textBackground(color, str) {
	return `<text style='background:${color}'>${str}</text>`
}
//text outline
function textOutline(px, color, str) {
	return `<text style='-webkit-text-stroke:${px}px ${color}'>${str}</text>`
}
function textSize(px, str) {
    return `<text style='font-size:${px}px'>${str}</text>`
}
//total display
function totalStat(layerID) {
	return tmp[layerID].resource + ': Total Boost Display'
}

//s for static
function totalsStat(layerID) {
	return tmp[layerID].resource + `: Total Cost Divide Display`
}

//when != layer resource
function totalStatFD(str) {
	return `${str}: Total Boost Display`
}

function totalsStatFD(str) {
	return `${str}: Total cost divide Display`
}
//list
function listStat(layerID) {
    return `${tmp[layerID].resource} Layer Boost List`
}
function listsStat(layerID) {
    return `${tmp[layerID].resource} Layer Cost Divide List`
}

function listStatFD(str) {
    return `${str} Layer Boost List`
}
function listsStatFD(str) {
    return `${str} Layer Cost Divide List`
}
