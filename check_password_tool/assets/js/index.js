const $ = document.querySelector.bind(document)

const passInput = $('.password-input')
const processBar = $('.process-bar')
const strengthText = $('.strength-text')

function checkPasswordStrength() {
    const password = passInput.value
    let strength = 0
    
    if(password.length > 0) strength += 10
    if(password.length >= 6) strength += 10
    if(password.length >= 8) strength += 10
    if(password.length >= 12) strength += 10
    if(password.length >= 16) strength += 10

    if(/[A-Z]/.test(password)) strength += 10
    if(/[a-z]/.test(password)) strength += 10
    if(/[0-9]/.test(password)) strength += 10
    if(/[/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10

    strength = Math.min(100, strength)
    
    
    let strengthClass = 'weak'
    let strengthMessage = 'Yếu'

    if(strength > 20) {
        strengthClass = 'medium'
        strengthMessage = 'Trung bình'
    }
    if(strength > 40) {
        strengthClass = 'fair'
        strengthMessage = 'Khá'
    }
    if(strength > 60) {
        strengthClass = 'strong'
        strengthMessage = 'Mạnh'
    }
    if(strength > 80) {
        strength += 10
        strengthClass = 'very-strong'
        strengthMessage = 'Rất mạnh'
    }

    processBar.style.width = strength + '%'
    processBar.className = 'process-bar ' + strengthClass
    strengthText.textContent = strengthMessage + ' (' + strength + '%)'
}