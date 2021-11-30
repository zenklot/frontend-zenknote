<template>
  <div class="logout">

  </div>
</template>

<script>
export default {
name:"Logout",
beforeCreate(){
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    this.$router.push({ path: "/" });
}
}
</script>

<style>

</style>