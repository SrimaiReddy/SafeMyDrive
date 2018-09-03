<template>
<div class="profile-page">
  <div class="card">
   <div class="card-body">
   <form>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Name:</label>
    <label class="col-sm-5 col-form-label">{{ fullname }}</label>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">Email :</label>
    <label class="col-sm-5 col-form-label">{{ email }}</label>
  </div>
  </form>
   </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      fullname: ''
    }
  },
  mounted () {
    console.log('called created')
    axios({
      method: 'post',
      url: 'http://localhost:3000/safemydrive/user/details?token=' + window.localStorage.getItem('token')
    }).then((result) => {
      this.email = result.data.email
      this.fullname = result.data.fullname
    })
  }
}
</script>

<style>
.profile-page {
  width: 500px;
  margin: 0 auto;
  padding: 30px 0;
}
</style>
