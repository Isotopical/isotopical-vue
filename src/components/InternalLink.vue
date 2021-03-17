<template>
  <router-link
    :to="link.href"
    :title="link.title"
  >
    {{ link.text }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Link } from "../models/Element";

export default defineComponent({
  name: "InternalLink",
  props: {
    link: {
      type: Object as PropType<Link>,
    },
  }
});
</script>