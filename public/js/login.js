
const loginFormHandler = async (event) => {
  event.preventDefault();
  
  const email    = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();


    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert("Please try again, those details were incorrect.\n\nTo reset your login details, please email\:\n\nadmin@email.com\n");
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

