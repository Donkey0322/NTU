import React from 'react'
const handleSignUp = () => {
  const form = document.querySelector('form');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // get values

    const mail = form.email.value;
    const password = form.password.value;
    const customer_name = form.name.value;
    const gender = form.gender.value;
    const birthday = form.birthday.value;
    const phone_number = form.phone.value;

    try {
      const res = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({ mail, password, customer_name, gender, birthday, phone_number }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        emailError.textContent = data.errors.mail;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        // location.assign('/');
      }

    }
    catch (err) {
      console.log(err);
    }

  });
}


const signUp = () =>{
  return 
  (
    <form action="/signup">
    <h2>Sign up</h2>
    <label for="email">Email</label>
    <input type="text" name="email" required />
    <div class="email error"></div>
    <label for="password">Password</label>
    <input type="password" name="password" required />
    <div class="password error"></div>
    <label for="name">姓名</label>
    <input type="text" name="name" required />
    <label for="gender">性別</label>
    <input type="text" name="gender" required />
    <label for="birthday">生日</label>
    <input type="text" name="birthday" required />
    <label for="phone">電話號碼</label>
    <input type="text" name="phone" required />
    <button onClick = {handleSignUp}>Sign up</button>
    </form>
  )
} 


export default signUp;
