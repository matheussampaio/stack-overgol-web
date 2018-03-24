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
  watch: {
    value(newValue) {
      this.newValue = newValue
    }
  }
}
</script>
