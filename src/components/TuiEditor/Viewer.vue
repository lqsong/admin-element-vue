<template>
    <div :id="id" />
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
export default {
    name: 'TuiEditorViewer',
    props: {
        value: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default() {
                return 'tui-editor-viewer-' + +new Date() + Math.floor(Math.random() * 1000);
            }
        },
        height: {
            type: String,
            default: '300px'
        }
    },
    watch: {
        value(newValue, preValue) {
            if (newValue !== preValue) {
                this.setValue(newValue);
            }
        }
    },
    data(){
        return {
            viewer: null
        };
    },
    methods: {
        initViewer() {
            this.viewer = new Viewer({
                el: document.getElementById(this.id),
                height: this.height
            });
            if (this.value) {
                this.setValue(this.value);
            }
        },
        destroyViewer() {
            if (!this.viewer) return;
            this.viewer.off('change');
            this.viewer.remove();
        },
        setValue(value) {
            this.viewer.setMarkdown(value);
        },
        getHtml() {
            return this.viewer.getHtml();
        }
    },
    mounted() {
        this.initViewer();
    },
    destroyed() {
        this.destroyViewer();
    }

};
</script>