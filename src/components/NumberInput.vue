<template>
  <div>
    <input class="form-input number-input"
      :class="{'disabled': disabled}"
      @input="onInput"
      @change="onInput"
      type="number"
      v-model.number="formattedNumber">
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: ['type', 'value', 'disabled'],
  data() {
    return {
      newValue: this.value
    }
  },
  methods: {
    // eslint-disable-next-line func-names
    onInput() {
      if (this.onInputDebounced == null) {
        this.onInputDebounced = debounce(() => {
          this.$emit('onFieldChanged', { newValue: this.newValue })
        }, 2000)
      }

      this.onInputDebounced()
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
  text-align: center;
  width: 50%
}

input.form-input.number-input:invalid {
  border-color: #CACED7;
  box-shadow: none;
}
</style>
