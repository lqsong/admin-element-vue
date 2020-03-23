<template>
    <div :id="id" />
</template>
<script>
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

import Editor from '@toast-ui/editor';
import defaultOptions from './default-options';
// import '@toast-ui/editor/dist/i18n/zh-cn.js';

export default {
    name: 'TuiEditor',
    props: {
        value: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default() {
                return 'tui-editor-' + +new Date() + Math.floor(Math.random() * 1000);
            }
        },
        options: {
            type: Object,
            default() {
                return defaultOptions;
            }
        },
        mode: {
            type: String,
            default: 'markdown'
        },
        height: {
            type: String,
            default: '300px'
        },
        language: {
            type: String,
            default: 'zh-CN' // en_US
        }
    },
    watch: {
        value(newValue, preValue) {
            if (newValue !== preValue && newValue !== this.getValue()) {
                this.setValue(newValue);
            }
        },
        language() {
            this.destroyEditor();
            this.initEditor();
        },
        height(newValue) {
            this.editor.height(newValue);
        },
        mode(newValue) {
            this.editor.changeMode(newValue);
        }
    },
    data(){
        return {
            editor: null
        };
    },
    computed: {
        editorOptions() {
            const options = Object.assign({}, defaultOptions, this.options);
            options.initialEditType = this.mode;
            options.height = this.height;
            options.language = this.language;
            return options;
        }
    },
    methods: {
        initEditor() {
            this.editor = new Editor({
                el: document.getElementById(this.id),
                ...this.editorOptions
            });
            if (this.value) {
                this.setValue(this.value);
            }
            this.editor.on('change', () => {
                this.$emit('input', this.getValue());
            });
        },
        destroyEditor() {
            if (!this.editor) return;
            this.editor.off('change');
            this.editor.remove();
        },
        setLanguage(name, Obj) {
            Editor.setLanguage(name, Obj);
        },
        setLanguageZhCN(){
            this.setLanguage('zh-CN',{
                Markdown: 'Markdown',
                WYSIWYG: '所见即所得',
                Write: '编辑',
                Preview: '预览',
                Headings: '标题',
                Paragraph: '文本',
                Bold: '加粗',
                Italic: '斜体字',
                Strike: '删除线',
                Code: '内嵌代码',
                Line: '水平线',
                Blockquote: '引用块',
                'Unordered list': '无序列表',
                'Ordered list': '有序列表',
                Task: '任务',
                Indent: '缩进',
                Outdent: '减少缩进',
                'Insert link': '插入链接',
                'Insert CodeBlock': '插入代码块',
                'Insert table': '插入表格',
                'Insert image': '插入图片',
                Heading: '标题',
                'Image URL': '图片网址',
                'Select image file': '选择图片文件',
                Description: '说明',
                OK: '确认',
                More: '更多',
                Cancel: '取消',
                File: '文件',
                URL: 'URL',
                'Link text': '链接文本',
                'Add row': '添加行',
                'Add col': '添加列',
                'Remove row': '删除行',
                'Remove col': '删除列',
                'Align left': '左对齐',
                'Align center': '居中对齐',
                'Align right': '右对齐',
                'Remove table': '删除表格',
                'Would you like to paste as table?': '需要粘贴为表格吗?',
                'Text color': '文字颜色',
                'Auto scroll enabled': '自动滚动已启用',
                'Auto scroll disabled': '自动滚动已禁用',
                'Choose language': '选择语言'
            });
        },
        setValue(value) {
            this.editor.setMarkdown(value);
        },
        getValue() {
            return this.editor.getMarkdown();
        },
        setHtml(value) {
            this.editor.setHtml(value);
        },
        getHtml() {
            return this.editor.getHtml();
        }
    },
    mounted() {
        this.setLanguageZhCN();
        this.initEditor();
    },
    destroyed() {
        this.destroyEditor();
    }
};
</script>