<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="navbar-header">
  <router-link to="/" class="navbar-brand">SafeMyDrive</router-link>
  </div>
  <div class="collapse navbar-collapse">
    <ul class="nav navbar-nav mr-auto">
       <router-link to="/home" activeClass="active" tag="li"><a>Home</a></router-link>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <router-link to="/signup" tag="li"><a>Sign Up</a></router-link>
      <router-link to="/signin" tag="li"><a>Sign In</a></router-link>
    </ul>
  </div>
</nav>
</template>
<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>
