<template>
  <div>
    <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
              <div class="card">
                <div class="card-body">
                  <div class="alert alert-success" v-if="signed && msg" role="alert">
                      {{ msg }}
                  </div>
                  <div class="alert alert-danger" v-else-if="!signed && msg" role="alert">
                      {{ msg }}
                  </div>
                  <form>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-4 col-form-label">Mail ID</label>
                        <div class="col-sm-8">
                          <input type="text" name="emailID" class="form-control" id="inputEmail" placeholder="Email ID">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                        <div class="col-sm-8">
                          <input type="password" name="password" class="form-control" id="inputPassword" placeholder="Password">
                        </div>
                      </div>
                    <button type="submit" class="btn btn-primary" @click.prevent="signIn">Sign In</button>
                  </form>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data () {
    return {
      msg: '',
      signed: false
    }
  },
  methods: {
    signIn () {
      this.msg = ''
      let data = new FormData(document.querySelector('form'))
      axios.post('http://localhost:3000/safemydrive/user/signin', {
        email: data.get('emailID'),
        password: data.get('password')
      }).then(response => {
        if (response.data.token) {
          this.msg = 'Signed in successfully. Redirecting ....'
          this.signed = true
          localStorage.setItem('token', response.data.token)

          let _this = this
          setTimeout(function () {
            _this.$router.push({ path: '/dashboard' })
          }, 1000)
        } else {
          this.msg = response.data.message
          this.signed = false
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  padding: 40px !important;
}
</style>
