const {body} = require ('express-validator')

const productFormMiddleware = [
    body('nombre')
        .notEmpty().withMessage('Debes completar el campo Nombre')
        .isLength({min:5}).withMessage('El nombre del producto debe tener por lo menos 5 caracteres'),
    body('marca').notEmpty().withMessage('Debes completar el campo Marca'),
    body('tamanio').notEmpty().withMessage('Debes completar el campo Tamaño'),
    body('precio').notEmpty().withMessage('Debes completar el campo Precio'),
    body('stock').notEmpty().withMessage('Debes completar el campo Stock'),
    // body('categoria').custom(value=>{
    //     console.log('CATEGORIA ' + value)
    // }),
    body('descripcion')
        .notEmpty().withMessage('Debe poner una descripcion')
        .isLength({min:20}).withMessage('La descripcion debe tener al menos 20 caracteres'),
    // body('img').custom((value, {req}) =>{
    //     let file = req.file;
    //     let extensionesPermitidas = ['JPG', 'JPEG', 'PNG', 'GIF'];
    //     console.log('ENTRA A VALIDACION DE ARCHIVO' + value)
    //     if(file){
    //         let fileExtension = path.extname(file.originalname)
    //         console.log('EXTENSION:  ' + fileExtension);
    //         if(!extensionesPermitidas.includes(fileExtension)){
    //             throw new Error(`Las extensiones permitidas son ${extensionesPermitidas}.`)
    //         }
    //     }
    //     return  true;
    // })
]

module.exports = productFormMiddleware;