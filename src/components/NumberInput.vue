<template>
  <div>
    <input class="centered text-center form-input number-input"
      :class="{'disabled': disabled}"
      @input="onInput"
      @change="onInput"
      type="number"
      v-model.number="formattedNumber">
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

input.form-input.number-input:invalid {
  border-color: #CACED7;
  box-shadow: none;
}
</style>
