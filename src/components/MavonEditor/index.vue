<template>
    <mavon-editor        
        ref="mavonEditor"
        class="mavon-editor"
        :value="value"
        @input="$emit('input', $event)"
        :language="language"
        :font-size="fontSize"
        :toolbars-background="toolbarsBackground"
        :preview-background="previewBackground"
        :box-shadow="boxShadow"
        :subfield="subfield"
        :default-open="defaultOpen"
        :placeholder="placeholder"
        :editable="editable"
        :code-style="codeStyle"
        :toolbars-flag="toolbarsFlag"
        :navigation="navigation"
        :short-cut="shortCut"
        :autofocus="autofocus"
        :ishljs="ishljs"
        :image-filter="imageFilter"
        :image-click="imageClick"
        :tab-size="tabSize"
        :toolbars="toolbars"
        @imgAdd="$imgAdd"
        @change="change"
        :style="style">
    </mavon-editor>
</template>
<script>
/**
 * 文档：https://github.com/hinesboy/mavonEditor
 * 注：在页面使用此组件时：
 * 如, 设置组件的 ref="editor",可以用下面方法调用 mavonEditor 的方法
 * this.$refs['editor'].$refs['mavonEditor'].方法名
 * props 、events 事件绑定，等有需要的，自己进行扩展
 */ 
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import request from '@/service/lib/request';
export default {
    name: 'MavonEditor',
    props: {
        height: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        language: {
            type: String,
            default: 'zh-CN'
        },
        fontSize: {
            type: String,
            default: '14px'
        },
        toolbarsBackground: {
            type: String,
            default: '#ffffff'
        },
        previewBackground: {
            type: String,
            default: '#fbfbfb'
        },
        boxShadow: {
            type: Boolean,
            default: true
        },
        subfield: {
            type: Boolean,
            default: true
        },
        defaultOpen: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '开始编辑...'
        },
        editable: {
            type: Boolean,
            default: true
        },
        codeStyle: {
            type: String,
            default: 'code-github'
        },
        toolbarsFlag: {
            type: Boolean,
            default: true
        },
        navigation: {
            type: Boolean,
            default: false
        },
        shortCut: {
            type: Boolean,
            default: true
        },
        autofocus: {
            type: Boolean,
            default: true
        },
        ishljs: {
            type: Boolean,
            default: true
        },
        imageFilter: {
            type: Function,
            default: null
        },
        imageClick: {
            type: Function,
            default: null
        },
        tabSize: {
            type: Number,
            default: 1
        },
        toolbars: {
            type: Object,
            default: function() {
                return {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    // save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true // 预览
                };
            }
        },
        /**
         * 自定义上传图片
         * 1、如果是 String 请填写上传的url地址
         * 2、如果是 Function 自定义上传 function(pos, $file, $vm)
         * 3、其他(不设置) base64
         */
        imgUpload: {
            type: [Function, String],
            default: null
        }
    },
    components: {
        mavonEditor
    },
    computed: {
        style() {
            let sty = {};
            if (this.height !== ''){
                sty['height'] = this.height;
            }
            return sty;
        }
    },
    methods: {
        change(value, render) {
            this.$emit('change', value, render);
        },
        $imgAdd(pos, $file){
            const _this = this;           
            // console.log(pos, $file);
            // function string
            const typeofImgUpload = typeof _this.imgUpload;
            switch (typeofImgUpload) {
               case 'string': // 表示是上传地址
                    var formdata = new FormData();
                    formdata.append('image', $file);
                    request({
                        url: _this.imgUpload,
                        method: 'post',
                        data: formdata,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(res => {  
                        const { data } = res;
                        // data 就是img 的 url 地址   
                        _this.$refs.mavonEditor.$img2Url(pos, data);
                    }).catch(err => {                       
                        console.log(err);
                    });
                   break;
               case 'function': // 表示自定义上传
                   _this.imgUpload(pos, $file , _this.$refs.mavonEditor);
                   break;           
               default: // 返回 base64
                   _this.$refs.mavonEditor.$img2Url(pos, $file.miniurl);
                   break;
            }
            /**
             * 自定义 删除刚上传的img记录 
             * 不让在菜单栏-图片菜单下显示，不要有删除按钮
             * 因为目前删除 base64 正则报错
             */
            _this.$refs.mavonEditor.$refs.toolbar_left.img_file = [[0, null]];           
        }
    }
};
</script>
<style lang="scss" scoped>
.mavon-editor {
    z-index: 9
}
</style>
