<template>
  <ion-grid>
    <ion-row>
      <ion-col
        sizeXs="12"
        offsetSm="1"
        sizeSm="10"
        offsetMd="2"
        sizeMd="8"
        offsetLg="3"
        sizeLg="6"
        offsetXl="3"
        sizeXl="6"
      >
        <span v-html="body"></span>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from "@ionic/vue";
import { defineComponent, ref, PropType, watchEffect } from "vue";
import Document from "../models/Document";

import Marked from "marked";

export default defineComponent({
  name: "PostLayout",
  props: {
    content: {
      type: Object as PropType<Document>
    },
  },
  components: {
    IonCol,
    IonGrid,
    IonRow,
  },
  setup(props) {
    const body = ref("");

    watchEffect(() => {
      body.value = Marked(props.content?.body || "");
    });

    return {
      body,
    }
  },
});
</script>