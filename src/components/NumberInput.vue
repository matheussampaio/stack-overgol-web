<template>
  <div :class="{ 'invalid': error }">
    <input class="centered text-center form-input number-input"
      :class="{'disabled': disabled }"
      max="5"
      min="0.01"
      step="0.01"
      @input="onInput"
      @change="onInput"
      type="number"
      v-model.number="formattedNumber">
    <div v-if="error" class="text-error text-small">
      Rating inválido.
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'disabled'],
  data() {
    return {
      newValue: this.value
    }
  },
  methods: {
    onInput() {
      if (this.error) {
        return
      }

      this.$emit('onFieldChanged', { newValue: this.newValue })
    }
  },
  computed: {
    formatter() {
      const options = { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }

      return new Intl.NumberFormat('arab', options)
    },
    formattedNumber: {
      get() {
        return this.formatter.format(this.newValue)
      },
      set(v) {
        this.newValue = v
      }
    },
    error() {
      return typeof this.newValue !== 'number' || this.newValue <= 0 || this.newValue > 5
    }
  },
  watch: {
    value(newValue) {
      this.newValue = newValue
    }
  }
}
</script>

<style scoper>
.number-input {
  width: 50%
}

.invalid {
  flex-flow: column;
}

.text-small {
  font-size: x-small;
}
</style>
