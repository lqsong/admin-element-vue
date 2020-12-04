<template>
    <div ref="viewerDiv"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, toRefs, watch } from "vue";
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface TuiEditorViewerSetupData {
    viewerDiv: Ref;
}

export default defineComponent({
    name: 'TuiEditorViewer',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    setup(props): TuiEditorViewerSetupData {

        const { value } = toRefs(props);

        const viewerDiv = ref<HTMLElement>();
        const viewerRef = ref<Viewer>();


        watch(value,()=> {
            if(viewerRef.value) {
                viewerRef.value.setMarkdown(value.value);
            }
        })

        onMounted(()=> {
            if(viewerDiv.value) {
                const view = new Viewer({
                    el: viewerDiv.value,
                    initialValue: props.value,
                   /*  events: {
                        load: (param: Viewer) => {
                        },
                    } */
                });
                viewerRef.value = view;
            }
        })

        return {
            viewerDiv
        }

    }
})
</script>