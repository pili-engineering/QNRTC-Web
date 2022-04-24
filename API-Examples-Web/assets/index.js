
function alert(message, type) {
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    if (!alertPlaceholder) {
        const div = document.createElement("div")
        div.className = "container"
        document.body.append(div)
        alertPlaceholder = document.createElement("div")
        div.appendChild(alertPlaceholder)
    }

    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}