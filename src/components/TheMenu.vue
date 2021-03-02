<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button
          v-for="menuItem in menuItems"
          :router-link="menuItem.link"
          :key="menuItem.id"
          >{{ menuItem.label }}</ion-button
        >
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import useDocument from "../hooks/document";
import MenuItem from "../models/MenuItem";
import Marked, { Renderer } from "marked";

export default defineComponent({
  name: "TheMenu",
  components: {
    IonButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const menu = ref();
    const menuBody = ref("");

    const title = ref("");
    const menuItems = ref<MenuItem[]>([]);

    const { getDocument, documents } = useDocument();

    const renderer: Renderer = new Renderer();
    renderer.link = (href: string, title: string, text: string) => {
      menuItems.value.push({
        id: menuItems.value.length,
        label: text,
        link: href,
      });

      return "";
    };

    getDocument("site", "menu");

    watchEffect(() => {
      menu.value = documents.value.get("site:menu");
      if (menu.value) {
        Marked(menu.value.body, { renderer });

        title.value = menu.value.attributes?.title;
        document.title = title.value;
      }
    });

    return {
      menu,
      menuBody,
      title,
      menuItems,
    };
  },
});
</script>
