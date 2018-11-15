<template>
  <div class="hInput">
    <input class="input" :type="type" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" :readonly="readonly" :maxlength="max" :minlength="min" :disabled="disabled" ref="input" :class="[inputClass]">
  </div>
</template>

<script>
export default {
  name: 'hInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    readonly: Boolean,
    disabled: Boolean,
    min: Number,
    max: Number,
    inputClass: String
  },
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .noline{
    border: none;
  }
  .hInput{
    width: 100%;
  }
  .input{
    width: 100%;
    height: 2rem;
    font-size: 0.85rem;
    padding: 0 5px;
    color: #282525;
  }
</style>