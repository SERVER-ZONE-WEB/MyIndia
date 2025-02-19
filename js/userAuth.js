class UserAuth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("myIndia_users")) || [];
    this.currentUser =
      JSON.parse(localStorage.getItem("myIndia_currentUser")) || null;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validateMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
  }

  validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  }

  registerUser(userData) {
    const { fullName, loginId, password } = userData;

    // Validate input
    if (!fullName || !loginId || !password) {
      throw new Error("All fields are required");
    }

    // Check if loginId is email or mobile
    const isEmail = this.validateEmail(loginId);
    const isMobile = this.validateMobile(loginId);

    if (!isEmail && !isMobile) {
      throw new Error("Please enter a valid email or 10-digit mobile number");
    }

    if (!this.validatePassword(password)) {
      throw new Error(
        "Password must contain at least 8 characters, including uppercase, lowercase and numbers"
      );
    }

    // Check if user already exists
    const existingUser = this.users.find(
      (user) => user.email === loginId || user.mobile === loginId
    );

    if (existingUser) {
      throw new Error("Account already exists with this email/mobile");
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      fullName,
      email: isEmail ? loginId : "",
      mobile: isMobile ? loginId : "",
      password,
      createdAt: new Date().toISOString(),
    };

    // Save user
    this.users.push(newUser);
    localStorage.setItem("myIndia_users", JSON.stringify(this.users));

    return newUser;
  }

  loginUser(loginId, password) {
    const user = this.users.find(
      (u) =>
        (u.email === loginId || u.mobile === loginId) && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Set current user
    this.currentUser = user;
    localStorage.setItem("myIndia_currentUser", JSON.stringify(user));

    return user;
  }

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem("myIndia_currentUser");
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// Initialize auth globally
window.userAuth = new UserAuth();
