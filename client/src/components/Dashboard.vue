<template>
    <div><p>My User name and password {{ email }} </p></div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: ''
    }
  },
  mounted () {
    console.log('called created')
    axios({
      method: 'post',
      url: 'http://localhost:3000/safemydrive/user/details?token=' + window.localStorage.getItem('token'),
      headers: {
        'x-auth': window.localStorage.getItem('token')
      }
    }).then((result) => {
      this.email = result.data.email
    })
  }
}
</script>
