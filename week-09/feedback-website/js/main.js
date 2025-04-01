document.addEventListener('DOMContentLoaded', () => {

  const introSection = document.getElementById('introduction')
  const userInfoSection = document.getElementById('user-info')
  const announcer = document.getElementById('announcer')
  const introContinueButton = document.getElementById('intro-continue')

  introContinueButton.addEventListener('click', () => {
    introSection.hidden = true
    userInfoSection.hidden = false
    window.location.hash = '#user-info'
    document.getElementById('name').focus()
    announcer.textcontent = 'Moved to user information section' //announce to the screen reader
  })

  const userInfoForm = document.getElementById('user-info-form')
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const nameError = document.getElementById('name-error')
  const emailError = document.getElementById('email-error')
  let userName = ''

  const clearError = (input, errorElement) => {
    input.removeAttribute('aria-invalid')
    errorElement.textContent = ''
    errorElement.hidden = true
  }
  const showError = (input, errorElement, message) => {
    input.setAttribute('aria-invalid', 'true')
    errorElement.textContent = message
    errorElement.hidden = false
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) { //.trim() removes any spaces 
      clearError(nameInput, nameError)
    }
  })
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) { //.trim() removes any spaces
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError)
      }
    }
  })

  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent page reload when form is submitted
    let isValid = true

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your name')
      isValid = false
      nameInput.focus()
    } else {
      clearError(nameInput, nameError)
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email adress')
      isValid = false
      if (!nameError.textContent) { //if name is correct - move focus to email input
        emailInput.focus()
      }
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailInput, 'Please enter a valid email adress')
      isValid = false
      if (!nameError.textContent) { //if name is correct - move focus to email input
        emailInput.focus()
      }
    } else {
      clearError(emailInput, emailError)
    }

    if (isValid) {
      userName = nameInput.value.trim()
      userInfoSection.hidden = true

      announcer.textContent = 'Moved to feedback form section' //announce to the screen reader

    }

  })



})