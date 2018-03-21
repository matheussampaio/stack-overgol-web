<template>
  <td>
    <!-- Checkbox -->
    <input v-if="isCheckboxField" @input="onInput" @change="onInput" type="checkbox" v-model="newValue">

    <!-- Number -->
    <input v-else-if="isNumberField" @input="onInput" @change="onInput" type="number" v-model.number="newValue">

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
    onInput: debounce(function () {
      this.$emit('onFieldChanged', { newValue: this.newValue })
    }, 2000)
  },
  computed: {
    isCheckboxField() {
      return this.type === 'checkbox'
    },
    isNumberField() {
      return this.type === 'number'
    }
  }
}
</script>
