new Vue({
    el: "#app",
    data() {
        return {
            lights: null
        }
    },

    mounted() {
        fetch('http://192.168.0.3/api/1zFf8JfvVnd47S-MKejXbz--dK3N13KI14Z80lmU/lights',
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
            fetch('http://192.168.0.3/api/1zFf8JfvVnd47S-MKejXbz--dK3N13KI14Z80lmU/lights/' + lightId + '/state/', {
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
            fetch('http://192.168.0.3/api/1zFf8JfvVnd47S-MKejXbz--dK3N13KI14Z80lmU/lights/' + lightId + '/state/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bri: parseInt(light.state.bri)
                })
            })

            console.log(light.state.bri)
        }
    }
})