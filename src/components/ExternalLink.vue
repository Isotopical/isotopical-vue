<template>
  <a
    :href="link.href"
    :title="link.title"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ link.text }}
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Link } from "../models/Element";

export default defineComponent({
  name: "ExternalLink",
  props: {
    link: {
      type: Object as PropType<Link>,
    },
  }
});
</script>