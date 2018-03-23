<template>
  <td>
    <!-- Checkbox -->
    <input v-if="isCheckboxField" @input="onInput" @change="onInput" type="checkbox" v-model="newValue">

    <!-- Number -->
    <input v-else-if="isNumberField" @input="onInput" @change="onInput" type="number" v-model.number="formattedNumber">

    <!-- Text -->
    <input v-else @input="onInput" @change="onInput" type="text" v-model="newValue">
  </td>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: ['type', 'value'],
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
    isCheckboxField() {
      return this.type === 'checkbox'
    },
    isNumberField() {
      return this.type === 'number'
    },
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
    value(newValue, oldValue) {
      this.newValue = newValue
    }
  }
}
</script>
