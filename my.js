const ColorConverter = require('cie-rgb-color-converter');


new Vue({
    el: "#app",
    data() {
        return {
            lights: null
        }
    },
    mounted() {
        fetch('http://192.168.86.157/api/J9Sd33gAwMcZAeMxFSI0nIIW-iOBfwEGYU2cOytY/lights',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(lights => this.lights = lights);
    },

    methods: {
        toggleLight(lightId, light) {
            fetch('http://192.168.86.157/api/J9Sd33gAwMcZAeMxFSI0nIIW-iOBfwEGYU2cOytY/lights/' + lightId + '/state/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    on: !light.state.on
                })
            }).then(() => this.lights[lightId].state.on = !light.state.on)
        },
        brightness(light) {
            return (light.state.bri/255*100).toFixed(0)
        },
        setBrightness(lightId, light) {
            fetch('http://192.168.86.157/api/J9Sd33gAwMcZAeMxFSI0nIIW-iOBfwEGYU2cOytY/lights/' + lightId + '/state/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bri: parseInt(light.state.bri)
                })
            })

            console.log(light.state.bri)
        },
        lightColor(light) {
            const xy = light.state.xy
            const bri = light.state.bri
            
            let rgb = ColorConverter.xyBriToRgb(xy[0], xy[1], bri)
            console.log(rgb)

            return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"
        }
    }
})

