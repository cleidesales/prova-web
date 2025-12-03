import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const porta = process.env.PORTA

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api Funcionando!')
})

import teste from './routes/teste.js'
app.use('/teste', teste)

// Importar rotas de Cursos e Alunos
import cursosRoutes from './routes/cursos.js'
import alunosRoutes from './routes/alunos.js'

app.use('/cursos', cursosRoutes)
app.use('/alunos', alunosRoutes)

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})