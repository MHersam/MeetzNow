# Firebase User Management
This document gives an overview about the different ways Firebase user data can be created, updated, accessed and deleted.
A Firebase User has a fixed set of basic properties—a unique ID, a primary email address, a name and a photo URL
## 1. Firebase Console
Firebase console is a fully visual website, that lets you manage users, configure firebase itself and the different sign in methods.
Firebase Console can be accessed here: https://console.firebase.google.com/
## 2. Backend
### 2.1 Admin SDK
The Firebase Admin SDK allows you to integrate your own servers with Firebase Authentication. You can use the Admin SDK to manage your users or to manage authentication tokens.
Setup with code snippets in node.js, java, python and go: https://firebase.google.com/docs/admin/setup
#### 2.1.1 User management from backend via Admin SDK
The admin user management API provides programmatic access to those same users.
See https://firebase.google.com/docs/auth/admin/manage-users for further information

## 3. Frontend
The user data is accessible in a user object and will be set in our user state, where it can be acccessed from anywhere within the vue app.
The object can be received with a listener: https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed_in_user

All functions with code snippets: https://firebase.google.com/docs/auth/web/manage-users
### 3.1 Some important functions
#### 3.1.1 Get data from user object
https://firebase.google.com/docs/auth/web/manage-users#get_a_users_profile
#### 3.1.2 Delete a user
https://firebase.google.com/docs/auth/web/manage-users#delete_a_user