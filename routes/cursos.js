import express from 'express'
import CursoController from '../controllers/CursoController.js'

const router = express.Router()

// GET /cursos - Listar todos os cursos
router.get('/', CursoController.listarTodos)

// GET /cursos/:id - Buscar curso por ID
router.get('/:id', CursoController.buscarPorId)

// POST /cursos - Criar novo curso
router.post('/', CursoController.criar)

// PUT /cursos/:id - Atualizar curso
router.put('/:id', CursoController.atualizar)

// DELETE /cursos/:id - Deletar curso
router.delete('/:id', CursoController.deletar)

export default router
