<template>
  <tr>
    <TableCell v-for="cell in cells" :key="cell.field"
      :type="cell.type"
      :value="user[cell.field]"
      @onFieldChanged="onFieldChanged($event, cell)"
      />
  </tr>
</template>

<script>
import TableCell from '@/components/TableCell'

export default {
  components: {
    TableCell
  },
  props: ['user'],
  data() {
    return {
      cells: [
        { type: 'text', field: 'first_name' },
        { type: 'text', field: 'last_name' },
        { type: 'number', field: 'rating' },
        { type: 'checkbox', field: 'is_subscriber' },
        { type: 'checkbox', field: 'is_admin' }
      ]
    }
  },
  methods: {
    onFieldChanged(event, cell) {
      const payload = {
        resource: 'users',
        operation: 'update',
        payload: {
          id: this.user.uid,
          [cell.field]: event.newValue
        }
      }

      this.$emit('onUserUpdated', payload)
    }
  }
}
</script>
