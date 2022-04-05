import Api from '@/services/Api'

export default {
  validateCredentials (email, password) {
    return Api().get('login', {
      params: {
        userEmail: email,
        userPassword: password
      }
    })
  }
}
