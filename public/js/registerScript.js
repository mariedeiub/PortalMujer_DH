window.addEventListener('load', function() {
    let form = document.querySelector('form');
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    form.addEventListener('submit', (evento)=>{
        evento.preventDefault();
        let errors = [];

        let nombre = document.querySelector('#nombre');
        let apellido = document.querySelector('#apellido');
        let edad= document.querySelector('#edad');
        let usuario = document.querySelector('#usuario')
        let email = document.querySelector('#mail');
        let contraseña = document.querySelector('#contraseña');
        let confirmarContraseña = document.querySelector('#repetirContraseña')

        if(nombre.value  == '' || nombre.value.length < 2){
            errors.push('El campo nombre deben estar completos y tener al menos 2 caracteres');
            form.nombre.focus();
        }

        if(apellido.value  == '' || apellido.value.length < 2){
            errors.push('El campo apellido deben estar completos y tener al menos 2 caracteres');
            form.apellido.focus();
        }

        if(edad.value  == '' || edad.value< 18){
            errors.push('Debe ser mayor de edad');
            form.edad.focus();
        }

        if(usuario.value  == '' || usuario.value.length < 8){
            errors.push('El campo nombre de usuario debe estar completo y tener al menos 8 caracteres');
            form.usuario.focus();
        }


        if (email.value == '') {
            errors.push('Debe introducir un email');
            form.email.focus();
        } else if (!validEmail.test(email.value)){
            errors.push('Debe introducir un email valido');
            form.email.focus();
        } 
        // else{
        //     fetch("http://localhost:3001/ferreteria")
        //     .then(() => {
        //         errors.push('Email ingresado ya esta en uso');
        //         form.email.focus();
        // })
        //     .catch(e => console.log(e))
        // }

        if (contraseña.value == '' || contraseña.value.length < 8) {
            errors.push('El campo contraseña debe estar completeto y tener al menos 8 caracteres');
            form.contraseña.focus();
        }else if (contraseña.value !== confirmarContraseña.value) {
            errors.push('El campo contraseña y repetir contraseña deben ser iguales');
            form.contraseña.focus();
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