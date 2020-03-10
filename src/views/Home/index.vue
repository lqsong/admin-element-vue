<template>
  <div class="main-conent main-conent-minheight">

    <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <span>日销售额</span>
              <el-tooltip effect="dark" content="说明文字" placement="top">
                  <svg-icon icon-class="ask" class="float-right cursor-pointer" />
              </el-tooltip>
            </div>
            <div class="num">¥ 88,888</div>
            <el-divider></el-divider>
            <el-row class="bot">
                <el-col :span="12">
                  总销售额
                </el-col>
                <el-col :span="12" class="text-right">
                   ¥ 888,888
                </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <span>日访问量</span>
              <el-tooltip effect="dark" content="说明文字" placement="top">
                  <svg-icon icon-class="ask" class="float-right cursor-pointer" />
              </el-tooltip>
            </div>
            <div class="num">88,888</div>
            <el-divider></el-divider>
            <el-row class="bot">
                <el-col :span="12">
                  总访问量
                </el-col>
                <el-col :span="12" class="text-right">
                   888,888
                </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <span>日订单量</span>
              <el-tooltip effect="dark" content="说明文字" placement="top">
                  <svg-icon icon-class="ask" class="float-right cursor-pointer" />
              </el-tooltip>
            </div>
            <div class="num">8,888</div>
            <el-divider></el-divider>
            <el-row class="bot">
                <el-col :span="12">
                  转化率
                </el-col>
                <el-col :span="12" class="text-right">
                   88%
                </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <span>新增用户</span>
              <el-tooltip effect="dark" content="说明文字" placement="top">
                  <svg-icon icon-class="ask" class="float-right cursor-pointer" />
              </el-tooltip>
            </div>
            <div class="num">888</div>
            <el-divider></el-divider>
            <el-row class="bot">
                <el-col :span="12">
                  总用户
                </el-col>
                <el-col :span="12" class="text-right">
                   888,888
                </el-col>
            </el-row>
          </el-card>
        </el-col>
    </el-row>

    <el-card class="box-card" shadow="never">
      <div slot="header">
        <el-row>
          <el-col :span="8">
              <span>访问量</span>
          </el-col>
          <el-col :span="16" class="text-right">
            <el-radio-group v-model="radio1" size="mini">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="全年"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="datevalue1"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:220px;margin-left:5px;">
            </el-date-picker>

          </el-col>
        </el-row>
        
      </div>
      <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <h5 class="traffic-title">访问量趋势</h5>
            <div id="home-traffic-chart" style="height:240px;"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <h5 class="traffic-title">访问量排行</h5>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left hot" size="small" >1</el-avatar>
                   <span>网页小功能1</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left hot" size="small" >2</el-avatar>
                   <span>网页小功能2</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left hot" size="small" >3</el-avatar>
                   <span>网页小功能3</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left" size="small" >4</el-avatar>
                   <span>网页小功能4</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left" size="small" >5</el-avatar>
                   <span>网页小功能5</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left" size="small" >6</el-avatar>
                   <span>网页小功能6</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="traffic-li">
                   <el-avatar class="traffic-num float-left" size="small" >7</el-avatar>
                   <span>网页小功能7</span>
              </el-col>
              <el-col :span="12" class="traffic-li text-right">888,888</el-col>
            </el-row>
            
            

          </el-col>
      </el-row>
    </el-card>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utlis';
export default {
  name: 'Home',
  data() {
    return {
      chart: null,
      resizeHandler: null,
      radio1: '今日',
      datevalue1: ''
    };
  },
  computed: {
    ...mapGetters([
        'sidebarOpened'
      ])
  },
  watch: {
    sidebarOpened() {
      this.resizeHandler();
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('home-traffic-chart'),'macarons');
      this.chart.setOption({
            grid: {
              left: '50px',
              right: '20px',
              top: '10px',
              bottom: '35px'
            },
            xAxis: {
              data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5888, 3838, 15880, 12888, 18888, 16888,5888, 3838, 15880, 12888, 18888, 16888]
            }]
      });

    },
    initResizeEvent() {
      window.addEventListener('resize', this.resizeHandler);
    }
  },
  mounted() {
    const _this = this;
    _this.resizeHandler = debounce(() => {
      if (_this.chart) {
        _this.chart.resize();
      }
    }, 100);
    _this.initChart();
    _this.initResizeEvent();
  }
};
</script>
<style lang="scss">
.box-card {
  border: 0;
  margin-bottom: 24px;
  .el-card__header {
      padding-left: 12px;
      padding-right: 12px;
  }
  .el-card__body{
    padding: 12px;
  }
  .num {
    font-size: 30px;
    margin-bottom: 20px;
  }
  .el-divider--horizontal{
     margin: 8px 0;
  }
  .bot {
    font-size: 14px;
  }
  .traffic-title{
    margin: 0;
    margin-bottom: 10px;
  }
  .traffic-li{
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin-top: 10px;
  }
  .traffic-num{
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 8px;
    &.hot{
      background-color: rgba($color: #209e91, $alpha: 0.8) ;
      color: #FFFFFF;
    }
  }
}
</style>
