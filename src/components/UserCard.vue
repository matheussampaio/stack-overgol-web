<template>
  <div class="card user-card form-horizontal"
    :class="{ 'dirt': isDirt && !updating, 'updating': updating, 'success': success }">
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
import debounce from 'lodash/debounce'

import CheckboxInput from '@/components/CheckboxInput'
import NumberInput from '@/components/NumberInput'

export default {
  components: {
    NumberInput,
    CheckboxInput
  },
  props: ['user', 'disabled'],
  data() {
    return {
      updating: false,
      success: false,
      changes: {
        rating: {
          changed: false,
          value: 0
        },
        is_subscriber: {
          changed: false,
          value: false
        },
        is_admin: {
          changed: false,
          value: false
        }
      }
    }
  },
  computed: {
    fullName() {
      return `${this.user.first_name} ${this.user.last_name}`.trim()
    },
    isDirt() {
      return this.changes.rating.changed
        || this.changes.is_subscriber.changed
        || this.changes.is_admin.changed
    }
  },
  methods: {
    onFieldChanged(event, field) {
      this.changes[field].changed = true
      this.changes[field].value = event.newValue

      this.updateUser()
    },
    updateUser() {
      if (this.updateUserDebounced == null) {
        this.updateUserDebounced = debounce(() => {
          const payload = {
            id: this.user.uid
          }

          if (this.changes.rating.changed) {
            payload.rating = this.changes.rating.value
          }

          if (this.changes.is_subscriber.changed) {
            payload.is_subscriber = this.changes.is_subscriber.value
          }

          if (this.changes.is_admin.changed) {
            payload.is_admin = this.changes.is_admin.value
          }

          this.updating = true

          this.$emit('onUserUpdated', {
            payload,
            resource: 'users',
            operation: 'update'
          })
        }, 2000)
      }

      this.updateUserDebounced()
    }
  },
  watch: {
    user(newUser) {
      if (this.changes.rating.changed) {
        this.changes.rating.changed = this.changes.rating.value !== newUser.rating
        this.success = true
      }

      if (this.changes.is_subscriber.changed) {
        this.changes.is_subscriber.changed = this.changes.is_subscriber.value !== newUser.is_subscriber
        this.success = true
      }

      if (this.changes.is_admin.changed) {
        this.changes.is_admin.changed = this.changes.is_admin.value !== newUser.is_admin
        this.success = true
      }

      this.updating = false

      setTimeout(() => { this.success = false }, 500)
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

.dirt {
  box-shadow: 0px 0px 5px 3px rgba(255, 255, 0, 1);
}

.updating {
  box-shadow: 0px 0px 5px 3px rgba(255, 199, 0, 1);
}

.success {
  box-shadow: 0px 0px 5px 3px rgba(4, 140, 0, 1);
}

.form-field  {
  display: flex;
  align-items: center;
}
</style>
