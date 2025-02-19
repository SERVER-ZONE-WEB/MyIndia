function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.toggle('hidden');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
    return /^[0-9]{10}$/.test(mobile);
}

function validateInput(input) {
    return validateEmail(input) || validateMobile(input);
}

function handleLogin(event) {
    event.preventDefault();
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('loginPassword').value;

    if (!validateInput(loginId)) {
        alert('Please enter a valid email or 10-digit mobile number');
        return false;
    }

    // Here you would typically make an API call to verify credentials
    console.log('Login attempt:', { loginId, password });
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const signupId = document.getElementById('signupId').value;
    const password = document.getElementById('signupPassword').value;

    if (!validateInput(signupId)) {
        alert('Please enter a valid email or 10-digit mobile number');
        return false;
    }

    // Here you would typically make an API call to create account
    console.log('Signup attempt:', { fullName, signupId, password });
    return false;
}

function handleGoogleLogin() {
    const googleAuth2 = gapi.auth2.getAuthInstance();
    googleAuth2.signIn().then(
        function(googleUser) {
            const profile = googleUser.getBasicProfile();
            const userData = {
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl()
            };
            console.log('Google login success:', userData);
            // Here you would handle the Google login with your backend
        },
        function(error) {
            console.error('Google login failed:', error);
        }
    );
}

function handleFacebookLogin() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            FB.api('/me', {fields: 'name,email'}, function(response) {
                console.log('Facebook login success:', response);
                // Here you would handle the Facebook login with your backend
            });
        } else {
            console.error('Facebook login failed');
        }
    }, {scope: 'email'});
}

// Initialize Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
    });
};

// Load Facebook SDK
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
