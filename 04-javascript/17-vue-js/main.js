import { createApp } from 'vue'

const app = createApp({
    data() {
        return {
            name: "Pizza Royale",
            price: 12
        }
    }
})

app.mount("#app")