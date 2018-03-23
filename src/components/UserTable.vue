<template>
  <div>
    <h1>Stack Overgol Web</h1>

    <table>
      <thead>
        <tr>
          <th>First Name</th><th>Last Name</th><th>Rating</th><th>Subcriber</th><th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="(user, index) in users" :key="index" :user="user" @onUserUpdated="updateUser($event)"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import TableRow from '@/components/TableRow'

export default {
  components: {
    TableRow
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

<style>

</style>
