<template>
    <div class="document-editor">
        <ckeditor :editor="DecoupledEditor" v-model="editorData" :config="{toolbar: toolbars, language:language}"  @ready="onReady"></ckeditor>
    </div>  
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import request from '@/utils/request';
import CKEditor from '@ckeditor/ckeditor5-vue';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
import { getLocale } from "@/utils/i18n";

const languageLabels: {[key: string]: string} = {
  'zh-CN': 'zh-cn',
  'zh-TW': 'zh',
  'en-US': 'en-us',
};

const CKEditorConfig = {
  toolbar: [
    'heading',
    '|',
    'fontfamily',
    'fontsize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'alignment',
    '|',
    'numberedList',
    'bulletedList',
    '|',
    'indent',
    'outdent',
    '|',
    'link',
    'blockquote',
    'imageUpload',
    'insertTable',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  // language: 'zh-cn'
  language: languageLabels[getLocale()],
};

interface CKEditorSetupData {
    DecoupledEditor: any;
    language: string;
    editorData: string;
    onReady:  (editor: any) => void;
}

export default defineComponent({
    name: 'CKEditor',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        toolbars: {
            type: Array as PropType<string[]>,
            default: CKEditorConfig['toolbar']
        }
    },
    components: {
        ckeditor: CKEditor.component
    },
    setup(props, { emit }): CKEditorSetupData {

        // 数据值
        const editorData = computed({
            get: () => props.modelValue,
            set: val => {
                emit('update:modelValue', val);
            }
        });

        // 加载完成
        const onReady = (editor: any) => {
                // console.log( 'Editor is ready to use!', editor );
                editor.ui
                .getEditableElement()
                .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                );

                editor.plugins.get('FileRepository').createUploadAdapter = (
                    loader: any,
                ) => {
                    //let val = editor.getData();
                    return {
                        upload: async () => {
                            return await loader.file.then((f: any) => {
                                // console.log("file:", f);

                                const param = new FormData();
                                param.append('file', f);

                                return new Promise((resolve, reject) => {
                                    request({
                                        headers: { 'Content-Type': 'multipart/form-data' },
                                        url: '/uploads',
                                        method: 'POST',
                                        data: param,
                                    })
                                    .then(res => {
                                        const { data } = res;
                                        resolve({
                                            default: data.url || '',
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        reject(err);
                                    });
                                });
                            });

                            /* return await loader.file.then((f: any) => {
                                                console.log("file:", f);
                                                const F = new FileReader();
                                                F.readAsArrayBuffer(f);                               
                                                return new Promise(resolve => {
                                                    F.onload = function () {
                                                        resolve({bufAsArray: F.result, file: f});
                                                    };
                                                });
                                            }).then((v: any) => {
                                                // 执行上传 Ajax
                                                console.log("执行上传 ajax", v);
                                                //返回标准格式
                                                return {
                                                    default: 'http://img/BG.png'
                                                }
                                            }); */
                        },
                    };
                };
        }

        return {
            DecoupledEditor,
            language: CKEditorConfig.language,
            editorData: editorData as unknown as string,
            onReady
        }
    }
})
</script>
<style lang="scss" scoped>
.document-editor {
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);

  /* Set vertical boundaries for the document editor. */
  /* max-height: 700px; */

  /* This element is a flex container for easier rendering. */
  display: flex;
  flex-flow: column nowrap;

  ::v-deep(.ck.ck-toolbar) {
    /* Make sure the toolbar container is always above the editable. */
    z-index: 1;

    /* Create the illusion of the toolbar floating over the editable. */
    box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);

    /* Use the CKEditor CSS variables to keep the UI consistent. */
    border-bottom: 1px solid var(--ck-color-toolbar-border);

    border: 0;
    border-radius: 0;
  }

  ::v-deep(.ck-content) {
    min-height: 300px;
    line-height: normal;
  }
}

</style>