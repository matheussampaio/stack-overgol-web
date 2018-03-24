<template>
  <div>
    <p v-if="user" class="user-infos text-center">
      Oi {{user.displayName}}, seu UID é <code>{{user.uid}}</code>.
    </p>

    <p v-if="user && userIsNotAdmin" class="toast toast-warning text-center">
      Você não está autorizado à alterar os dados.
    </p>

    <UserCard v-for="user in users" :key="user.uid"
      :user="user"
      :disabled="userIsNotAdmin"
      @onUserUpdated="updateUser($event)"/>
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
    },
    user() {
      return this.$store.state.user
    },
    userIsNotAdmin() {
      return !this.$store.state.isAdmin
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
.user-infos {
  padding: 8px;
}
</style>
