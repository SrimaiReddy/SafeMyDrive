<template>
<div class="signup-form">
<div class="card">
<div class="card-body">
    <h2>Register</h2>
    <div class="form-group" :class="{invalid: $v.fullname.$error}">
        <input type="text"  class="form-control" placeholder="Full Name" v-model="fullname" @blur="$v.fullname.$touch()" auto>
    </div>
    <div class="form-group" :class="{invalid: $v.email.$error}">
        <input type="email" class="form-control" placeholder="Email" v-model="email" @blur="$v.email.$touch()">
        <p v-if="!$v.email.email">Please provide a valid email address.</p>
    </div>
    <div class="form-group" :class="{invalid: $v.password.$error}">
        <input type="password" id="password" class="form-control" placeholder="Password" required="required" v-model="password" @blur="$v.password.$touch()">
    </div>
    <div class="form-group">
        <input type="password" id="confirm_password" class="form-control" placeholder="Confirm Password" required="required" v-model="confirmPassword">
    </div>
    <div class="form-group">
        <label class="checkbox-inline"><input type="checkbox" required="required"> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
    </div>
    <div class="form-group">
    <button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
</div>
<div class="text-center">Already have an account? <a href="#">Sign in</a></div>
</div>
</div>
</div>
</template>
<script>
import {required, email, minLength,sameAs} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    fullname: {
      required
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {

    }
  }
}
</script>

<style>
  .form-group.invalid input {
    background-color: rgb(238, 169, 169);
  }
    .form-group.invalid label {
    background-color: rgb(238, 169, 169);
  }
body {
  color: #fff;
  font-family: "Roboto", sans-serif;
}
.signup-form {
  width: 400px;
  margin: 0 auto;
  padding: 30px 0;
}
.signup-form h2 {
  color: #636363;
  margin: 0 0 15px;
  position: relative;
  text-align: center;
}
.signup-form h2:before,
.signup-form h2:after {
  content: "";
  height: 2px;
  width: 30%;
  background: #d4d4d4;
  position: absolute;
  top: 50%;
  z-index: 2;
}
.signup-form h2:before {
  left: 0;
}
.signup-form h2:after {
  right: 0;
}
.signup-form .btn {
  font-size: 16px;
  font-weight: bold;
  min-width: 140px;
  outline: none !important;
}
</style>
