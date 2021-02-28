import { toRefs, reactive } from "vue";
import fm from "front-matter";
import axios from "axios";
import Document from "../models/Document";

const state = reactive<{
  error: any;
  loading: boolean;
  documents: Map<string, Document>;
}>({
  error: null,
  loading: false,
  documents: new Map(),
});

export default function () {
  const getDocument = async (_collection: string, _name = "index") => {
    if (_name === "") _name = "index";
    const documentKey = `${_collection}:${_name}`;

    if(!state.documents.has(documentKey)) {
      state.loading = true;

      axios
        .get(`assets/collections/${_collection}/${_name}.md`)
        .then((response) => {
          state.error = null;

          const data = fm<any>(response.data);
          const document: Document = {
            attributes: data.attributes,
            body: data.body,
          };
          state.documents.set(documentKey, document);
        })
        .catch((error) => {
          state.error = error;
        })
        .finally(() => {
          state.loading = false;
        });
    }
  };

  return {
    ...toRefs(state),
    getDocument,
  };
}
