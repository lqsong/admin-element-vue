<template>
    <div ref="editorDiv"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from "vue";
import request from '@/utils/request';
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

const toolbarItems: string[] = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'image',
  'link',
  'divider',
  'code',
  'codeblock',
];

interface TuiEditorSetupData {
    editorDiv: Ref;
}

export default defineComponent({
    name: 'TuiEditor',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        toolbars: {
            type: Array as PropType<string[]>,
            default: toolbarItems
        },
        height: {
            type: String,
            default: '300px'
        },
        previewStyle: {
            type: String as PropType<'tab' | 'vertical'>,
            default: ''
        },
        initialEditType: {
            type: String as PropType<'wysiwyg' | 'markdown'>,
            default: 'markdown'
        },
        useCommandShortcut: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit }): TuiEditorSetupData {

        const editorDiv = ref<HTMLElement>();

        onMounted(()=> {
            if(editorDiv.value) {
                const editor = new Editor({
                    el: editorDiv.value,
                    toolbarItems: props.toolbars,
                    initialValue: props.modelValue,
                    height: props.height,
                    previewStyle: props.previewStyle,
                    initialEditType: props.initialEditType,
                    useCommandShortcut: props.useCommandShortcut,
                    events: {
                        /* load: (editor: any) => {
                        }, */
                        change: (/* param: { source: SourceType | 'viewer'; data: MouseEvent } */) => {
                            const value = editor.getMarkdown();
                            emit('update:modelValue', value);
                        },
                    },
                    hooks: {
                        addImageBlobHook: (fileOrBlob, callback) => {
                            const param = new FormData();
                            param.append('file', fileOrBlob);

                            request({
                                headers: { 'Content-Type': 'multipart/form-data' },
                                url: '/uploads',
                                method: 'POST',
                                data: param,
                            })
                            .then(res => {
                                const { data } = res;
                                const { url, name } = data;
                                callback(url, name);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        },
                    }
                })
            }
        })

        return {
            editorDiv
        }

    }
})
</script>