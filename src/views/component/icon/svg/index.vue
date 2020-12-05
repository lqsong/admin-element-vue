<template>
    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">

                <div v-for="item in svgIcons" class="list" :key="item" >
                    <el-popover trigger="hover" placement="top-start" width="300">
                        
                        &lt;icon-svg type="{{item}}" /&gt;
                        
                        <template #reference>
                            <div>
                                <icon-svg :type="item" style="font-size: 30px" />
                                <span>{{item}}</span>
                            </div>
                        </template>
                    </el-popover>
                </div>

                <div style="clear:both"></div>
                <el-divider />

                <h2>{{t('page.icon.svg.remark.title')}}</h2>
                <table class="el-table">
                    <tbody>
                        <tr>
                            <td>组件位置： @/components/IconSvg</td>
                        </tr>
                        <tr>
                            <td>创建原因：方便自定义使用svg图标</td>
                        </tr>
                    </tbody>
                </table>

                <h3>使用方法：</h3>
                <table class="el-table">
                    <tr>
                        <td>
                            1、下载或制作svg文件，存放到 <el-tag>@/assets/iconsvg</el-tag>目录下，自己可以对此目录下svg进行删减。
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2、项目会根据 <el-tag>@/assets/iconsvg/svgo.yml</el-tag>
                        配置自动压缩精简svg，也可以独立运行 <el-tag>yarn svgo</el-tag> 或
                        <el-tag>npm run svgo</el-tag>压缩精简svg
                        </td>
                    </tr>
                    <tr>
                        <td>
                           3、使用Demo：
                        </td>
                    </tr>
                    <tr>
                        <td>
                           import IconSvg from '@/components/IconSvg';
                        </td>
                    </tr>
                    <tr>
                        <td>
                           &lt;IconSvg type="svg文件名" class="" style=""/&gt;
                        </td>
                    </tr>
                </table>
          
        </el-card>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import IconSvg from "@/components/IconSvg";

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys();
const svgIcons = requireAll(
  require.context('../../../../assets/iconsvg', false, /\.svg$/),
).map(i => {
  const item = i.match(/\.\/(.*)\.svg/);
  return item && item[1];
});


export default defineComponent({
    components: {
        IconSvg
    },
    setup() {
        const { t } = useI18n();

        return {
            t,
            svgIcons
        }
    }
})
</script>
<style lang="scss" scoped>
.list {
  padding: 10px 20px;
  width: 100px;
  height: 100px;
  float: left;
  text-align: center;
  font-size: 30px;
  overflow: hidden;
  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }
}
</style>