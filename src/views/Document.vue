<template>
  <ion-page>
    <the-menu />
    <ion-content :fullscreen="true">
      <span v-html="mdContent"></span>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
} from "@ionic/vue";
import TheMenu from "../components/TheMenu.vue";
import { defineComponent, watch, ref } from "vue";
import { useRoute } from "vue-router";
import useDocument from "../hooks/document";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    TheMenu,
  },
  setup() {
    const route = useRoute();
    const { getDocument } = useDocument();
    const mdContent = ref("");

    const fetchDocument = (_params: any) => {
      const collection = _params.collection as string;
      const document = _params.document as string;

      getDocument(collection, document);
    };

    fetchDocument(route.params);

    watch(
      () => route.params,
      async (newParams) => {
        fetchDocument(newParams);
      }
    );

    return {
      mdContent,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
