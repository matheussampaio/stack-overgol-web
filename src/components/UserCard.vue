<template>
  <div class="card user-card form-horizontal">
    <div class="form-group">
      <div class="form-field col-3 ">
        <div class="text-ellipsis">
          {{fullName}}
        </div>
      </div>
      <NumberInput class="form-field col-3"
        :value="user.rating"
        :disabled="disabled"
        @onFieldChanged="onFieldChanged($event, 'rating')">
        Rating
      </NumberInput>
      <CheckboxInput class="form-field col-3 text-ellipsis"
        :value="user.is_admin"
        :disabled="disabled"
        @onFieldChanged="onFieldChanged($event, 'is_admin')">
        Administrador
      </CheckboxInput>
      <CheckboxInput class="form-field col-3 text-ellipsis"
        :value="user.is_subscriber"
        :disabled="disabled"
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
  props: ['user', 'disabled'],
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

<style scoped>
.user-card {
  margin-bottom: 16px;
}
.user-card .form-group {
  padding-left: 16px;
  padding-right: 16px;
}

.form-field  {
  display: flex;
  align-items: center;
}
</style>
