import {
    baseUserList,
    patientDataList,
    doctorDataList
} from '../assets/js/const';

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
  gender:          "",

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
      gender:         this.gender
    };
  }

/*
    // Properties of the view model
    // These properties are used to bind data from the view (UI) to the view model
    firstname: "",
    lastname: "",
    sex: "",
    dateOfBirth: "",
    accountType: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    specialty: "",
    pharmacyName: "",
    pharmacyAddress: "",

    // Helper function that registers a user and creates a role-specific entry
    addUser() {
        console.log("Users Before Registration: ", baseUserList);

        // Basic validation
        if (
            !this.firstname ||
            !this.lastname ||
            !this.email ||
            !this.sex ||
            !this.dateOfBirth ||
            !this.address ||
            !this.city ||
            !this.state ||
            !this.postalCode ||
            !this.accountType ||
            !this.password ||
            !this.confirmPassword
        ) {
            throw new Error("Invalid input: Ensure all required fields are filled.");
        }

        // Ensure the user doesn't already exist
        const existingUser = baseUserList.find(user => user.email === this.email);
        if (existingUser) {
            throw new Error("User already exists: " + this.email);
        }

        // Generate unique incremental ID for the new base user
        const newUserId = baseUserList.length > 0 ? baseUserList[baseUserList.length - 1].id + 1 : 1;

        // Create the new base user object
        const newUser = {
            id: newUserId,
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            phoneNumber: this.phone,
            address: this.address,
            city: this.city,
            state: this.state,
            postalCode: this.postalCode,
            sex: this.sex,
            dateOfBirth: this.dateOfBirth,
            role: this.accountType,
            password: this.password
        };

        // Add user to base user list
        baseUserList.push(newUser);
        localStorage.setItem("baseUserList", JSON.stringify(baseUserList));

        // Create an associated record in the role-specific table
        if (this.accountType === "patient") {
            const newPatient = {
                userId: newUserId,
                mrn: this.generateRandomMRN(patientDataList),
                sex: this.sex || "Not Specified",
                doctor: null, // No doctor assigned by default
                appointments: [] // No appointments yet
            };
            patientDataList.push(newPatient);
        } else if (this.accountType === "doctor") {
            const newDoctor = {
                userId: newUserId,
                licenseNumber: this.licenseNumber,
                specialty: this.specialty,
                patients: [],
                appointments: [],
                acceptingNewPatients: true
            };
            doctorDataList.push(newDoctor);
        }

        console.log("Updated Base User List: ", baseUserList);
        console.log("Updated Patient Data: ", patientDataList);
        console.log("Updated Doctor Data: ", doctorDataList);

        // Clear input fields after successful registration
        this.clearFields();

        return newUser;
    },

    // Helper function for generating a unique MRN
    generateRandomMRN(existingPatients) {
        let newMRN;
        do {
            newMRN = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit number
        } while (existingPatients.some(patient => patient.mrn === newMRN)); // Ensure uniqueness
        return newMRN;
    },

    // Helper method that calls the service layer
    clearFields() {
        this.firstname = "";
        this.lastname = "";
        this.sex = "";
        this.dateOfBirth = "";
        this.accountType = "";
        this.email = "";
        this.phone = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.postalCode = "";
        this.password = "";
        this.confirmPassword = "";
        this.licenseNumber = "";
        this.specialty = "";
        this.pharmacyName = "";
        this.pharmacyAddress = "";
    },
*/
};

export default RegisterViewModel;
