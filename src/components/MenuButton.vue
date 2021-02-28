<template>
  <ion-button></ion-button>
</template>

<script lang="ts">
import { IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "TheMenu",
  components: {
    IonButton,
  },
  setup(props) {
    console.log(props);
    return {
      props
    }
  }
});
</script>
