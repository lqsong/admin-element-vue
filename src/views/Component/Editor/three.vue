<template>
    <div  class="main-conent main-conent-minheight">        
        <el-card shadow="never" class="border-none">
            <div slot="header">
              <span>默认</span>
            </div>
            <mavon-editor ref="mavoneditor" v-model="content"></mavon-editor>
        </el-card>

        <el-card shadow="never" class="border-none margin-t24">
            <div slot="header">
              <span>自定义上传图片</span>
            </div>
            <mavon-editor ref="mavoneditor2" v-model="content" :imgUpload="imgUpload"></mavon-editor>
        </el-card>

        <el-card shadow="never" class="border-none margin-t24">
            <div slot="header">
              <span>详情</span>
            </div>
            <mavon-editor
              v-model="content"
              :subfield="false"
              :toolbars-flag="false"
              :box-shadow="false"
              default-open="preview"
              previewBackground="#FFFFFF"></mavon-editor>
        </el-card>


    </div>
</template>
<script>
import MavonEditor from '@/components/MavonEditor';
export default {
    components: {
        MavonEditor
    },
    data(){
        return {
            content: '# 1235'
        };
    },
    methods: {
        imgUpload(pos, $file , $vm) {
           
            var formdata = new FormData();
            formdata.append('image', $file);
            console.log(pos, $file, formdata);
            /* 
            // ajax 上传
            const _this = this;
            request({
                url: _this.imgUpload,
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {  
                const { data } = res;
                // data 就是img 的 url 地址   
                $vm.$img2Url(pos, data);
            }).catch(err => {                       
                console.log(err);
            }); */

            $vm.$img2Url(pos, 'https://gitee.com/lqsong/public/raw/master/common/Alipay.png');
        }
    }
};
</script>