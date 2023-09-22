function validation(values) {
    const errors = {};
    const emailpattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const mobilepattern = /^\+91[5-9]\d{9}$/;
    const passwordpattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (values.firstname === "") {
      errors.firstname = "First name should not be empty";
    }

    if (values.lastname === "") {
      errors.lastname = "Last name should not be empty";
    }

    if (values.name === "") {
        errors.name = "*Name should not be empty";
      }


    if (values.mobilenumber === undefined) {
      errors.mobilenumber = "* Enter Mobile Number";
    }
    else if(!mobilepattern.test(values.mobilenumber))
    {
      errors.mobilenumber="*Enter a valid MobileNo";
    }


    if (values.email === "") {
      errors.email = "Email should not be empty";
    } 
    else if (!emailpattern.test(values.email))
     {
      errors.email = "Enter a valid email";
    }


    if (values.password === "")
     {
      errors.password = "Password should not be empty";
    }
    alert(values.confirmpassword);

    if (values.confirmpassword !== values.password)
    {
       errors.confirmpassword = "Passwords don't match";
   }
   else if(!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(values.password))
  {
    errors.confirmpassword="password must contain at least 8 characters,one number, one lowercase letter, and one special character";
  }

 
    return errors;
  }
  
  export default validation;
  