var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer')

const mainController = require('../controllers/mainController')

// metodo storage de multer para subir y almacenar las fotos de cada producto
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({ storage: storage });

/* GET home page. */
router.get('/', mainController.index);

// ruta hacia el listado de productos
router.get('/list', mainController.list);

// ruta hacia el detalle de cada producto
router.get('/detail/:id', mainController.detail);

// ruta hacia el formulario de creacion
router.get('/create', mainController.create);
// ruta con el metodo que guarda la pelicula nueva
router.post('/create', upload.any(), mainController.store);

// ruta hacia el formulario de edicion
router.get('/edit/:id', mainController.edit);
// ruta con el metodo para actualizar la informacion
router.post('/edit/', mainController.update);

// ruta para eliminar productos
router.delete('/delete/:id', mainController.delete);

module.exports = router;
