const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function(req, res) {

    const filtrorepresentante = req.query.nombre || null
    controller.getrepresentante( filtrorepresentante )
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error inesperado', 500, error)
        })
})

router.post('/', function(req, res) {
    controller.addrepresentante( req.body.cedula, req.body.nombre, req.body.apellido, req.body.correo, req.body.telefono)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 400, 'Error en controlador.')
        })
})

router.patch('/:id', function(req, res) {
    controller.updaterepresentante(req.params.id_representante, req.body.cedula, req.body.nombre, req.body.apellido, req.body.correo, req.body.telefono)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

router.delete('/:id', function(req, res) {
    controller.deleterepresentante(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Información inválida', 500, error)
        })
})

module.exports = router