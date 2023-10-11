function validation(values,fields) {
    const errors = {};
    const emailpattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const mobilepattern = /^\+91[5-9]\d{9}$/;
    const passwordpattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const pincodepattern = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;


  // alert("validations hitted");

  fields.forEach(field => {

    if (field === 'firstname') {
        if (values.firstname === "") {
        errors.firstname = "First name should not be empty";
      }
    }

  if (field === 'lastname') {
    if (values.lastname === "") {
      errors.lastname = "Last name should not be empty";
    }
   }

    if (field === 'name') {
    if (values.name === "") {
        errors.name = "*Name should not be empty";
      }
    }

      if (field === 'mobilenumber') {
    if (values.mobilenumber === "") {
      errors.mobilenumber = "* Enter Mobile Number";
    }
    else if(!mobilepattern.test(values.mobilenumber))
    {
      errors.mobilenumber="*Enter a valid MobileNo";
    }
    }


    if (field === 'email') {
    if (values.email === "") {
      errors.email = "Email should not be empty";
    } 
    else if (!emailpattern.test(values.email))
     {
      errors.email = "Enter a valid email";
    }
    }

    if (field === 'password') {
    if (values.password === "")
     {
      errors.password = "Password should not be empty";
    }
    }
  

    if (field === 'confirmpassword') {
    if (values.confirmpassword !== values.password)
    {
       errors.confirmpassword = "Passwords don't match";
    }
    }
    //  else if(!/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(values.password))
    // {
    //   errors.confirmpassword="password must contain at least 8 characters,one number, one lowercase letter, and one special character";
    // }
     // for ADDRESS FIELDS
     if (field === 'personnameofAddress') {
    if (values.personnameofAddress === "") {
      errors.personnameofAddress = "Name should not be empty";
    }
    }

    if (field === 'mobilenumofAddress') {
     if (values.mobilenumofAddress === "") {
      errors.mobilenumofAddress = " Enter Mobile Number";
    }
    else if(!mobilepattern.test(values.mobilenumofAddress))
    {
      errors.mobilenumofAddress="*Enter a valid MobileNo";
    }
     }

    if (field === 'pincode') {
    if (values.pincode === "") {
      errors.pincode = "* Enter Pin Code";
    }
    else if(!pincodepattern.test(values.pincode))
    {
      errors.pincode="*Enter a valid PinCode";
    }
    }

    if (field === 'locality') {
    if (values.locality === "") {
      errors.locality = "Locality should not be empty";
    }
    }

    if (field === 'houseNo') {
    if (values.houseNo === "") {
      errors.houseNo = "Enter House No";
    }
    }

    if (field === 'selectedCity') {
    if (values.selectedCity === "") {
      errors.selectedCity = "city should not be empty";
    }
    }

    if (field === 'selectedState') {
    if (values.selectedState === "") {
      errors.selectedState = "Select any state";
    }
    }

    if (field === 'selectedState') {
      if (values.selectedState === "") {
        errors.selectedState = "Select any state";
      }
     }

    if (field === 'addresslbl') {
    if (values.addresslbl === "") {
      errors.addresslbl = "Select Address Label";
    }
    }

});


    return errors;
  }
  
  export default validation;
  