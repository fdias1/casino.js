const button = document.querySelector('#submit')
const emailField = document.querySelector('#email')
const response = document.querySelector('#response')

button.onclick = event => {
    event.preventDefault()
    const email = emailField.value
    fetch('/v1/register',{  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok==true) {
            response.style.display='flex'
            response.innerHTML = `<h2 class="title">Your token is:</h2><h4>${data.payload.token}</h4>`
        } else {
            response.style.display='flex'
            response.innerHTML = `<h2 class="title">Error:</h2><h4>${data.message}</h4>`
        }
    })
}
