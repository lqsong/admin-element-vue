<template>
    <div class="document-editor">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"  @ready="onReady"></ckeditor>
    </div>    
</template>
<script>
/**
 *  ckeditor5-build-decoupled-document 编辑器 
 *  使用此组件需要安装 npm install @ckeditor/ckeditor5-build-decoupled-document
 */
import CKEditor from '@ckeditor/ckeditor5-vue';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import defaultOptions from './default-options';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
import request from '@/service/lib/request';
export default {
    name: 'CKEditor',
    components: {
       ckeditor: CKEditor.component
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Object,
            default() {
                return defaultOptions;
            }
        },
        language: {
            type: [String, Object],
            default: 'zh-cn'
        }
    },
    computed: {
        editorData: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        editorConfig: function() {
            const options = Object.assign({}, defaultOptions, this.options);
            options.language = this.language;
            return options;
        }
    },
    data() {
        return {
            editor: DecoupledEditor
        };
    },
    methods: {
        onReady( editor )  {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );

                editor.plugins.get('FileRepository').createUploadAdapter = loader => {
                    //let val = editor.getData();
                    return {
                        upload: async () => {
                            return await loader.file.then(f => {
                                // console.log("file:", f);

                                let param = new FormData();
                                param.append("file",f);

                                return new Promise((resolve, reject) => {
                                    request({
                                        headers: { 'Content-Type': 'multipart/form-data'},
                                        url: '/uploads',
                                        method: 'POST',
                                        data: param
                                    }).then(res => {  
                                            const { code, data } = res;     
                                            if(code === 200 ) {
                                                resolve({
                                                    default: data.url || ''
                                                });
                                            } else {
                                                reject('上传失败');
                                            }
                                    }).catch(err => {                       
                                        console.log(err);
                                        reject(err);
                                    });
                                });
                                
                            });

                            /* 
                            return await loader.file.then(f => {
                                console.log("file:", f);
                                const F = new FileReader();
                                F.readAsArrayBuffer(f);                               
                                return new Promise(resolve => {
                                    F.onload = function () {
                                        resolve({bufAsArray: F.result, file: f});
                                    };
                                });
                            }).then(v => {
                                // 执行上传 Ajax
                                console.log("执行上传 ajax", v);
                                //返回标准格式
                                return {
                                    default: 'http://img/BG.png'
                                }
                            });
                            */
                        }
                    };
                };
        }
    }
};
</script>
<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);

    /* Set vertical boundaries for the document editor. */
    /* max-height: 700px; */

    /* This element is a flex container for easier rendering. */
    display: flex;
    flex-flow: column nowrap;
}
/* Adjust the look of the toolbar inside the container. */
.document-editor .ck-toolbar {
    /* Make sure the toolbar container is always above the editable. */
    z-index: 1;

    /* Create the illusion of the toolbar floating over the editable. */
    box-shadow: 0 0 5px hsla( 0,0%,0%,.2 );

    /* Use the CKEditor CSS variables to keep the UI consistent. */
    border-bottom: 1px solid var(--ck-color-toolbar-border);

    border: 0;
    border-radius: 0;
}
.document-editor .ck-content {
    min-height: 300px;
    line-height: normal;
}
</style>