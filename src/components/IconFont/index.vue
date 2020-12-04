<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="`#${type}`" />
    </svg>
</template>
<script lang="ts">
/**
 * IconFont 自定义封装，此组件包含IconSvg组件
 * @author LiQingSong
 * 使用说明：
 *   1、iconfont.cn 上生成 js 资源
 *   2、@/config/settings.ts 文件中配置 iconfont.cn 生成的js文件地址。
 *   3、使用Demo：
 *      import IconFont from '@/components/IconFont';
 *      import { defineComponent } from "vue";
 *      export default defineComponent({
 *          components: {
 *              IconFont
 *          }
 *      })
 *      <IconFont type="iconfont图标名称" class="" style=""/>
 */
function createScriptUrlElements(scriptUrls: string[], index= 0) {
    const currentScriptUrl = scriptUrls[index];
    if(typeof currentScriptUrl === 'string' && currentScriptUrl.length  && !document.getElementById(currentScriptUrl)) {
        const script = document.createElement('script');
        script.setAttribute('id', currentScriptUrl);
        script.setAttribute('src', currentScriptUrl);
        script.setAttribute('data-namespace', currentScriptUrl);

        if (scriptUrls.length > index + 1) {
            script.onload = function () {
                createScriptUrlElements(scriptUrls, index + 1);
            };

            script.onerror = function () {
                createScriptUrlElements(scriptUrls, index + 1);
            };
        }        
        document.body.appendChild(script);
    } else {
        if (scriptUrls.length > index + 1) {
            createScriptUrlElements(scriptUrls, index + 1);
        }
    }
}
import settings from "@/config/settings";
createScriptUrlElements(settings.iconfontUrl.reverse());

import { defineComponent } from "vue";
export default defineComponent({
    name: 'IconFont',
    props: {
        type: {
            type: String,
            required: true
        }
    }
});
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>