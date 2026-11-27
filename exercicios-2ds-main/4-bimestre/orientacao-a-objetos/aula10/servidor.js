
const app = require("../servidor")

const porta = Number(process.env.PORT) || 3000

app.listen(porta, () => {
    console.log(`Servidor na porta ${porta}`)
})
