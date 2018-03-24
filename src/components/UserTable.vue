<template>
  <div>
    <h1 class="title">Stack Overgol Web</h1>

    <UserCard v-for="user in users" :key="user.uid" :user="user" @onUserUpdated="updateUser($event)"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import UserCard from '@/components/UserCard'

export default {
  components: {
    UserCard
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser'
    })
  },
  mounted() {
    this.$store.dispatch('watchUsers')
  }
}
</script>

<style scoped>
.title {
  padding: 30px;
  text-align: center;
}
</style>
