<template>
  <ion-page>
    <the-menu />
    <ion-content :fullscreen="true">
      <post-layout :content="content" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

import TheMenu from "../components/TheMenu.vue";
import PostLayout from "../layouts/PostLayout.vue";
import useDocument from "../hooks/document";
import Document from "../models/Document";

export default defineComponent({
  name: "Document",
  components: {
    IonContent,
    IonPage,
    TheMenu,
    PostLayout,
  },
  setup() {
    const route = useRoute();
    const { getDocument, documents } = useDocument();
    const content = ref<Document>();

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

    watchEffect(() => {
      const collection = route.params.collection as string;
      const document = route.params.document as string || "index";
      
      const _document: Document | undefined = documents.value.get(`${ collection }:${ document }`);
      if (_document) {
        content.value = _document;
      }
    });

    return {
      content,
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
