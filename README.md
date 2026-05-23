# Project is currently under active development

README.md will be added once the core features are completed.

## Current Issues / TODO

### 1. Email verification flow issue
User credentials are currently stored in the database before OTP/email verification is completed.  
Need to fix the auth flow so users are only persisted after successful verification.

### 2. OTP refresh / resend functionality
Add a "Resend OTP" or "Refresh OTP" button on the Verify OTP page when the OTP expires.

### 3. Redirect after OTP verification
After successful OTP verification, users should be redirected directly to the homepage/dashboard instead of the signin page.

### 4. Dynamic username on homepage
Currently the homepage displays a hardcoded username ("Apurve").  
Need to fetch and display the authenticated user's actual name.

### 5. Upvote / Downvote interaction issue
Upvote and Downvote controls are currently non-functional and need proper button handlers and backend integration.
