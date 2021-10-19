const main = document.querySelector('main')

const getHTML = (options) => {

    let {url, success, error} = options

    const xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState !== 4) return;

        if(xhr.status >= 200 && xhr.status < 300) {
            let html = xhr.responseText
            success(html)
        } else {
            let message = xhr.statusText || 'Ocurrió un error'
            error(`Error ${xhr.status}: ${message}`)
        }
    })

    xhr.open('GET', url)

    xhr.setRequestHeader('Content-type', 'text/html; charset=utf-8')

    xhr.send()
}

document.addEventListener("DOMContentLoaded", () => {
    getHTML({
        url: "assets/home.html",
        success: html => main.innerHTML = html,
        error: err => main.innerHTML = `<h2>${err}</h2>`
    })
})

document.addEventListener('click', e => {
    if(e.target.matches('header a')){
        e.preventDefault()
        getHTML({
            url: e.target.href,
            success: html => main.innerHTML = html,
            error: err => main.innerHTML = `<h2>${err}</h2>`
        })
    }
})