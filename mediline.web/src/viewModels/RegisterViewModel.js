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
      if (typeof this[key] === "string") this[key] = "";
    });
  },

  getPayload() {
    const acct =
      this.accountType === "pharmacist"
        ? "pharmacy"
        : this.accountType;

    return {
      account_type:   acct,
      address1:       this.address,
      address2:       this.address2,
      city:           this.city,
      country:        "United States of America",
      dob:            this.dateOfBirth,
      email:          this.email,
      fee:            "150",
      first_name:     this.firstname,
      hours:          "9:00-21:00",
      last_name:      this.lastname,
      license_id:     this.licenseNumber,
      password:       this.password,
      pharmacy_name:  this.pharmacyName,
      phone:          this.phone,
      specialization: this.specialty,
      state:          this.state,
      username:       this.email,
      zipcode:        this.postalCode,
    };
  }
};

export default RegisterViewModel;
