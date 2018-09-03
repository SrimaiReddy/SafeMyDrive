<template>
<div class="settings-page">
  <div class="card">
   <div class="card-body">
<form>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-5 col-form-label">Current Password:</label>
    <div class="col-sm-7" :class="{invalid: $v.password.$error}">
      <input type="password" class="form-control" placeholder="Current Password" v-model.lazy="password" @blur="$v.password.$touch()">
      <p v-if="!$v.password.isUnique">The current password is not matched!!</p>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-5 col-form-label">New Password:</label>
    <div class="col-sm-7" :class="{invalid: $v.newpassword.$error}">
      <input type="password" class="form-control" placeholder="New Password" v-model="newpassword" @blur="$v.newpassword.$touch()">
      <p v-if="!$v.newpassword.minLength"> Password must have at least {{ $v.newpassword.$params.minLength.min }} letters. </p>
    </div>
  </div>
    <div class="form-group row">
    <label for="inputPassword" class="col-sm-5 col-form-label">Confirm Password:</label>
    <div class="col-sm-7" :class="{invalid: $v.repeatPassword.$error}">
      <input type="password" class="form-control" placeholder="Confirm Password" v-model="repeatPassword">
        <p v-if="!$v.repeatPassword.sameAsPassword"> Password must be identical. </p>
    </div>
  </div>
  <div class="form-group row">
      <label for="changePassword" class="col-sm-5 col-form-label"></label>
    <div class="col-sm-7">
    <button type="submit" class="btn btn-primary" :disabled="this.$v.$invalid" @click="changePassword">Change Password</button>
    </div>
</div>

</form>
   </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import User from '@/services/auth'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      password: '',
      newpassword: '',
      repeatPassword: ''
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
      async isUnique (password) {
        if (password === '') return true
        return axios({
          method: 'post',
          url: 'http://localhost:3000/safemydrive/user/checkpassword',
          data: {
            token: window.localStorage.getItem('token'),
            password: this.password
          }
        }).then((res) => {
          return res.data.message
        }).catch(() => {
          localStorage.removeItem('token')
          this.auth = User.check()
          this.$router.push({path: '/sessionTimeout'})
        })
      }
    },
    newpassword: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('newpassword')
    }
  },
  methods: {
    changePassword () {
      console.log('change password')
    }
  }
}
</script>

<style>
.settings-page {
  width: 600px;
  margin: 0 auto;
  padding: 30px 0;
}
</style>
