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
        <span v-for="element in elements" :key="element.id">
          <external-link
            v-if="element.type === ElementType.ExternalLink"
            :link="element.link"
          />

          <internal-link
            v-else-if="element.type === ElementType.InternalLink"
            :link="element.link"
          >
            {{ element.link.text }}
          </internal-link>

          <p v-else-if="element.type === ElementType.Paragraph">{{ element.content }}</p>
        </span>

        <p>{{ body }}</p>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from "@ionic/vue";
import { defineComponent, ref, PropType, watchEffect } from "vue";
import ExternalLink from "../components/ExternalLink.vue";
import InternalLink from "../components/InternalLink.vue";
import Document from "../models/Document";
import { Element, ElementType } from "../models/Element";

import Marked, { Renderer } from "marked";

export default defineComponent({
  name: "PostLayout",
  props: {
    content: {
      type: Object as PropType<Document>,
    },
  },
  components: {
    IonCol,
    IonGrid,
    IonRow,
    ExternalLink,
    InternalLink,
  },
  setup(props) {
    const body = ref("");
    const elements = ref<Element[]>([]);

    const renderer: Renderer = new Renderer();
    renderer.link = (href: string, title: string, text: string) => {
      const id = elements.value.length;

      if (href.startsWith("http")) {
        elements.value.push({
          id: id,
          type: ElementType.ExternalLink,
          link: {
            href: href,
            title: title,
            text: text,
          },
          content: `${text}:${href}`,
        });
      } else {
        elements.value.push({
          id: id,
          type: ElementType.InternalLink,
          link: {
            href: href,
            title: title,
            text: text,
          },
          content: `${text}:${href}`,
        });
      }

      return `{${ id }}`;
    };

    renderer.paragraph = (text: string) => {
      const id = elements.value.length;
      
      elements.value.push({
        id: id,
        type: ElementType.Paragraph,
        content: `[${ text }]`
      });

      return `{${ id }}`;
    };

    watchEffect(() => {
      body.value = Marked(props.content?.body || "", { renderer });
    });

    return {
      body,
      elements,
      ElementType,
    };
  },
});
</script>
