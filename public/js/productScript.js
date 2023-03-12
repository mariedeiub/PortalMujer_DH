window.addEventListener('load', function() {
    let form = document.querySelector('form');
   
    form.addEventListener('submit', (evento)=>{
        evento.preventDefault();
        let errors = [];

        let nombre = document.querySelector('#nombre');
        let marca = document.querySelector('#marca');
        let tamaño = document.querySelector('#tamaño');
        let color = document.querySelector('#color');
        let precio = document.querySelector('#precio');
        let stock = document.querySelector('#stock');
        let categoria = document.querySelectorAll('#categoria');
        let descripcion = document.querySelector('#descripcionID');
        let imagen = document.querySelector('#foto');

        //------------------VALIDO NOMBRE ------------------------//
        if (nombre.value == '' || nombre.value.length < 2) {
            errors.push('Debe introducir un nombre con mas de 2 caracteres');
        }

        //------------------VALIDO MARCA ------------------------//
        if (marca.value == '' || marca.value.length < 2) {
            errors.push('Debe introducir una marca con mas de 2 caracteres');
        }
        
        //------------------VALIDO TAMAÑO ------------------------//
        if (tamaño.value == '' ) {
            errors.push('Debe introducir un tamaño');
        }

        //------------------VALIDO COLOR ------------------------//
        if (color.value == '' || color.value.length < 2) {
            errors.push('Debe introducir un color');
        }

        //------------------VALIDO PRECIO ------------------------//
        if (precio.value == '') {
            errors.push('Debe introducir un precio');
        }

        //------------------VALIDO STOCK ------------------------//
        if (stock.value == ''  || stock.value < 1) {
            errors.push('El stock debe ser 1 o mayor');
        }
  
        
        //------------------VALIDO CATEGORIA ------------------------//
        let categoriaSelect = false;
        categoria.forEach(cat => {
            if(cat.checked){
                categoriaSelect = cat.checked
                console.log('CATEGORIA SELECCIONADA' + cat.value)
            }
        })
        if (!categoriaSelect) {
            errors.push('Debe seleccionar al menos una categoria');
        }

        //------------------VALIDO DESCRIPCION ------------------------//
        if (descripcion.value == '') {
            errors.push('Debe introducir una descripcion con mas de 20 caracteres');
        }

        //------------------VALIDO IMAGEN ------------------------//
        let extensionesPermitidas= ['jpg', 'jpeg', 'png', 'gif']
        let extension = imagen.value.substring(imagen.value.lastIndexOf('.')+1).toLowerCase();
        if(extensionesPermitidas.indexOf(extension)<0){
            console.log(extension)
            errors.push('La imagen cargada tiene una extension invalida, las posibles extensiones son jpg, jpeg, png o gif');
        }
 
        //VALIDO SI HAY ERRORES EN EL FORMULARIO
        if (errors.length > 0) {
            evento.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        }else{
            form.submit();
        }
    });

});