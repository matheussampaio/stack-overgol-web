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
        <TableRow v-for="(user, index) in users" :key="index" :user="user"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import TableRow from './TableRow'

export default {
  components: {
    TableRow
  },
  props: ['users']
}
</script>

<style>

</style>
