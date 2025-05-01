const RegisterViewModel = {
    firstname:       "",
    lastname:        "",
    dateOfBirth:     "",
    accountType:     "",
    email:           "",
    phone:           "",
    address:         "",
    address2:        "",
    city:            "",
    state:           "",
    postalCode:      "",
    country:         "",
    password:        "",
    confirmPassword: "",
    licenseNumber:   "",
    specialty:       "",
    pharmacyName:    "",
    pharmacyAddress: "",
  
    clearFields() {
      Object.keys(this).forEach(key => {
        if (typeof this[key] === "string") {
          this[key] = "";
        }
      });
    },
  
    getPayload() {
      return {
        account_type:   this.accountType,
        address1:       this.address,
        address2:       this.address2,
        city:            this.city,
        country:         this.country,
        dob:             this.dateOfBirth,
        email:           this.email,
        fee:             "",
        first_name:      this.firstname,
        hours:           "",
        last_name:       this.lastname,
        license_id:      this.licenseNumber,
        password:        this.password,
        pharmacy_name:   this.pharmacyName,
        phone:           this.phone,
        specialization:  this.specialty,
        state:           this.state,
        username:        this.email,
        zipcode:         this.postalCode,
      };
    }
  };
  
  export default RegisterViewModel;
  