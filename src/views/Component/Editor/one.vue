<template>
    <div  class="main-conent main-conent-minheight">
        <el-card shadow="never" class="border-none">
            <tui-editor ref="tuieditor" v-model="content" ></tui-editor>
        </el-card>

        <el-card shadow="never" class="border-none"  style="margin-top:4px;">
            <el-button @click="getContent">获取HTML</el-button>
            <hr>
            <div v-html="contentHtml"></div>
        </el-card>

        <el-card shadow="never" class="border-none"  style="margin-top:24px;">
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
      }
  },
  mounted() {
  }
};
</script>