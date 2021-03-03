<template>
    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">

                <el-alert
                    title="使用此组件需要配置 ‘@/config/settings.ts’ 中 ‘iconfontUrl’ 参数。"
                    type="warning"
                />

                <h2>说明：</h2>
                <table class="el-table">
                    <tbody>
                        <tr>
                            <td>组件位置： @/components/IconFont</td>
                        </tr>
                        <tr>
                            <td>创建原因：方便统一管理使用 iconfont.cn 上 js 资源图标</td>
                        </tr>
                    </tbody>
                </table>

                <h3>使用方法：</h3>
                <table class="el-table">
                    <tr>
                        <td>
                             1、iconfont.cn 上生成 js 资源。
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2、@/config/settings.ts 文件中配置 iconfont.cn 生成的js文件地址。
                        </td>
                    </tr>
                    <tr>
                        <td>
                           3、使用Demo：
                        </td>
                    </tr>
                    <tr>
                        <td>
                          import IconFont from '@/components/IconFont';
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &lt;IconFont type="svg文件名" class="" style=""/&gt;
                        </td>
                    </tr>
                </table>

          
        </el-card>
    </div>
</template>