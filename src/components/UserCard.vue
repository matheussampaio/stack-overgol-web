<template>
  <div class="card user-card">
    <div class="columns card-body">
      <div class="column col-3">
        {{fullName}}
      </div>
      <NumberInput class="column col-3"
        :value="user.rating"
        @onFieldChanged="onFieldChanged($event, 'rating')">
        Rating
      </NumberInput>
      <CheckboxInput class="column col-3"
        :value="user.is_admin"
        @onFieldChanged="onFieldChanged($event, 'is_admin')">
        Administrador
      </CheckboxInput>
      <CheckboxInput class="column col-3"
        :value="user.is_subscriber"
        @onFieldChanged="onFieldChanged($event, 'is_subscriber')">
        Mensalista
      </CheckboxInput>
    </div>
  </div>
</template>

<script>
import CheckboxInput from '@/components/CheckboxInput'
import NumberInput from '@/components/NumberInput'

export default {
  components: {
    NumberInput,
    CheckboxInput
  },
  props: ['user'],
  computed: {
    fullName() {
      return `${this.user.first_name} ${this.user.last_name}`.trim()
    }
  },
  methods: {
    onFieldChanged(event, field) {
      const payload = {
        resource: 'users',
        operation: 'update',
        payload: {
          id: this.user.uid,
          [field]: event.newValue
        }
      }

      this.$emit('onUserUpdated', payload)
    }
  }
}
</script>

<style>
.user-card {
  margin-bottom: 16px;
}

.card-body {
  display: flex;
  justify-content: space-between;
}

.user-card .column {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
