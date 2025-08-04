const $ = document.querySelector.bind(document)

const successBtn = $('.success-btn')
const infoBtn = $('.info-btn')
const warningBtn = $('.warning-btn')
const errorBtn = $('.error-btn')

function toast({
    title = '',
    message = '',
    type = 'info',
    duration = '3000'
}) {
    const main = $('.wrapper')
    if(main) {
        const toast = document.createElement('div')

        const autoRemove = setTimeout(() => {
            main.removeChild(toast)
        }, duration + 1000)

        toast.onclick = function(e) {
            if(e.target.closest('.toast-close')) {
                main.removeChild(toast)
                clearTimeout(autoRemove)
            }
            
        }

        const icons = {
            success: 'fa-circle-check',
            info: 'fa-circle-info',
            warning: 'fa-circle-exclamation',
            error: 'fa-triangle-exclamation'
        }

        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2)
        
        toast.classList.add('toast', `toast-${type}`)
        toast.style.animation = `slideInLeft .3s ease, fadeOut 1s ${delay}s linear forwards`

        toast.innerHTML = `
            <div class="toast-icon ${icon}">
                <i class="fa-solid "></i>
            </div>

            <div class="toast-body">
                <h3 class="toast-title">${title}</h3>
                <p class="toast-message">${message}</p>
            </div>

            <div class="toast-close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `
        main.appendChild(toast)
    }
}


function showSuccessMessage() {
    toast({
        title: 'Success',
        message: 'Anyone with access can view your invited visitors',
        type: 'success',
        duration: 3000
    })
}

function showInfoMessage() {
    toast({
        title: 'Info',
        message: 'Anyone with access can view your invited visitors',
        type: 'info',
        duration: 3000
    })
}

function showWarningMessage() {
    toast({
        title: 'Warning',
        message: 'Anyone with access can view your invited visitors',
        type: 'warning',
        duration: 3000
    })
}

function showErrorMessage() {
    toast({
        title: 'Error',
        message: 'Anyone with access can view your invited visitors',
        type: 'error',
        duration: 3000
    })
}