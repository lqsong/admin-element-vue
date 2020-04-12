<template>
    <div  class="main-conent main-conent-minheight">
        <el-card shadow="never" class="border-none">
            <div slot="header">
              <span>默认</span>
            </div>
            <tui-editor ref="tuieditor" v-model="content"></tui-editor>
        </el-card>

        <el-card shadow="never" class="border-none margin-t24">
            <div slot="header">
              <span>自定义上传图片</span>
            </div>
            <tui-editor ref="tuieditor" v-model="content" :imgUpload="imgUpload"></tui-editor>
        </el-card>

        <el-card shadow="never" class="border-none"  style="margin-top:4px;">
            <el-button @click="getContent">获取HTML</el-button>
            <hr>
            <div v-html="contentHtml"></div>
        </el-card>

        <el-card shadow="never" class="border-none margin-t24">
            <tui-editor-viewer v-model="content"></tui-editor-viewer>
        </el-card>
        
    </div>
</template>
<script>

import TuiEditor from '@/components/TuiEditor';
import TuiEditorViewer from '@/components/TuiEditor/Viewer';
export default {
  components: {
    TuiEditor,
    TuiEditorViewer
  },
  data() {
    return {
      content: '# This is Test.',
      contentHtml: ''
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
      getContent() {
          this.contentHtml = this.$refs.tuieditor.getHtml();
      },
      imgUpload(fileOrBlob, callback) {
        var formdata = new FormData();
        formdata.append('image', fileOrBlob);
        console.log(formdata, fileOrBlob);
        /* 
        // ajax上传
        request({
            url: '/upload/img',
            method: 'post',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {  
            const { data } = res;
            const { url, name } = data;
            callback(url, name);
        }).catch(err => {                       
            console.log(err);
        }); */
        callback('https://gitee.com/lqsong/public/raw/master/common/Alipay.png','赞助码');
      }
  },
  mounted() {
  }
};
</script>