function updateBrightness (value: number) {
    brightness = value
    strip.setBrightness(brightness)
    changeState(activeState)
}
input.onButtonPressed(Button.A, function () {
    desiredState += 1
    if (desiredState > 6) {
        desiredState = 1
    }
})
input.onButtonPressed(Button.AB, function () {
    updateBrightness(64)
})
input.onButtonPressed(Button.B, function () {
    updateBrightness(brightness / 2)
})
function testSequence () {
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    strip.show()
    for (let index = 0; index < strip.length(); index++) {
        basic.pause(5)
        strip.shift(1)
        strip.show()
    }
    strip.clear()
    strip.show()
}
function changeState (state: number) {
    if (state == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    } else if (state == 2) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (state == 3) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
    } else if (state == 4) {
        strip.showRainbow(1, 360)
    } else if (state == 5) {
        strip.showColor(neopixel.colors(NeoPixelColors.White))
    } else if (state == 6) {
        strip.showColor(neopixel.rgb(230, 80, 0))
    } else {
        strip.clear()
        strip.show()
    }
}
let activeState = 0
let brightness = 0
let desiredState = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 150, NeoPixelMode.RGB)
updateBrightness(64)
testSequence()
desiredState = 1
basic.forever(function () {
    if (activeState != desiredState) {
        changeState(desiredState)
        activeState = desiredState
    } else if (activeState == 4) {
        strip.rotate(1)
        strip.show()
    } else {
    	
    }
})
