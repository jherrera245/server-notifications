//elementos del formulario
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const buttonSendNotification = document.querySelector("#button-send-notification");

buttonSendNotification.addEventListener('click', (e) => {
    if (title.value === "" || description.value === "") {
        return;
    }

    const message = {
        title: title.value,
        message: description.value
    }

    fetch('/send-notifications', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }).then( 
        response => { 
            console.log(response);
            if (response.status === 200 && response.ok) {
                clearForm();
                okSend();
            }
        }
    ).catch(
        error => { 
            console.log(error) 
        }
    );
});


const clearForm = () => {
    title.value = null;
    description.value = null;
}

const okSend = () => {
    Swal.fire(
        'Enviado!',
        'Tu notificacion fue enviada correctamente',
        'success'
    );
}