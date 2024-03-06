var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}],
        ["clickable", 991],
        ["clickables", [1]] 
    ],
    previousTab: "",
    leftTab: true,
    clickables: {
        991: {
            title: "Mobile shift",
            onClick() {
                player.shift = !player.shift
                shiftDown = player.shift
            },
            canClick() {return true},
            unlocked() {return isMobile()},
            style() {return{
                'height': '90px',
	            'width': '90px'
            }}
        },
        11: {
            title: "Hi reset",
            display() {
                let desc = `<h3>(+${formatWhole(getResetGain('h'))})<br>Total: ${formatWhole(player.h.points)}`
                return desc
            },
            onClick() {if(canReset('h')) doReset('h')},
            onHold() {if(canReset('h')) doReset('h')},
            canClick() {return true},
            style() {return {
                'background-color': tmp.h.color
            }}
        },
        12: {
            title: "Kawaii reset",
            display() {
                let gain = getResetGain('k')
                if (!canReset('k')) gain = zero
                let desc = `<h3>(+${formatWhole(gain)})<br>Total: ${formatWhole(player.k.points)}`
                return desc
            },
            onClick() {if(canReset('k')) doReset('k')},
            onHold() {if(canReset('k')) doReset('k')},
            canClick() {return true},
            unlocked() {return tmp.k.layerShown},
            style() {return {
                'background-color': tmp.k.color
            }}
        },
        13: {
            title: "Power reset",
            display() {
                let desc = `<h3>(+${formatWhole(getResetGain('p'))})<br>Total: ${formatWhole(player.p.points)}`
                return desc
            },
            onClick() {if(canReset('p')) doReset('p')},
            onHold() {if(canReset('p')) doReset('p')},
            canClick() {return true},
            unlocked() {return tmp.p.layerShown},
            style() {return {
                'background-color': tmp.p.color
            }}
        }
    }
})
