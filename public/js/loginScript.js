window.addEventListener('load', function() {
    let form = document.querySelector('form');
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    form.addEventListener('submit', (evento)=>{
        evento.preventDefault();
        let errors = [];

        let email = document.querySelector('#usuario');
        let password = document.querySelector('#contraseña');

        if (email.value == '') {
            errors.push('Debe introducir un email');
            form.email.focus();
        } else if (!validEmail.test(email.value)){
            errors.push('Debe introducir un email valido');
            form.email.focus();
        } 
        // else{
        //     fetch("http://localhost:3001/ferreteria")
        //     .then(() => console.log("EMAIL EXISTENTE"))
        //     .catch(e => {
        //         errors.push('Email ingresado no existe');
        //         form.email.focus();
        //     })
        // }

        if (password.value == '' || password.value.length < 8) {
            errors.push('Debe introducir una contraseña valida');
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