<template>
  <div>
    <label class="centered form-switch text-ellipsis">
      <input :class="{'disabled': disabled}" @input="onInput" @change="onInput" type="checkbox" v-model="newValue">
      <i class="form-icon"></i>
      <slot/>
    </label>
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
  watch: {
    value(newValue) {
      this.newValue = newValue
    }
  }
}
</script>
