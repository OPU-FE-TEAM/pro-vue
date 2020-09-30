<template>
  <el-amap
    vid="amapDemo"
    :amap-manager="amapManager"
    :zoom="mapConfig.zoom"
    :events="mapConfig.events"
    class="amap-demo"
  >
  </el-amap>
</template>

<script>
import Vue from "vue";
import VueAMap from "vue-amap";
// import { AMapManager } from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "87d98045766eb14b1fe94a5c4fa714bd",
  plugin: [
    "AMap.Autocomplete",
    "AMap.Geocoder",
    "AMap.getLocation",
    "AMap.CitySearch",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor"
  ],
  // 默认高德 sdk 版本为 1.4.11
  v: "1.4.11"
});

let amapManager = new VueAMap.AMapManager();
var thismarker, geocoder, toolBar;
export default {
  name: "mapSelect",
  props: {
    data: { type: [Array, String] }
  },
  model: {
    prop: "data",
    event: "updata"
  },
  data() {
    return {
      amapManager,
      isMarker: false,
      mapConfig: {
        zoom: 12,
        center: [110.382412, 25.248137],
        events: {}
      },
      value: []
    };
  },
  created: function() {
    this.copyData();

    var _this = this;
    this.mapConfig.events.init = function(o) {
      // eslint-disable-next-line no-undef
      thismarker = new AMap.Marker({});
      if (_this.value && _this.value.length > 0) {
        //存在地区
        o.setZoomAndCenter(15, _this.value);
        _this.setManager(_this.value);
      }
      if (!geocoder) {
        // eslint-disable-next-line no-undef
        geocoder = new AMap.Geocoder({
          // city: "010", //城市设为北京，默认：“全国”
          resizeEnable: true,
          radius: 1000 //范围，默认：500
        });
      }
      // eslint-disable-next-line no-undef
      toolBar = new AMap.ToolBar({});
      o.addControl(toolBar);
    };

    this.mapConfig.events.click = function(e) {
      _this.setManager(e.lnglat);
      geocoder.getAddress(e.lnglat, function(status, result) {
        // const address = result.regeocode.formattedAddress;
        const addressComponent = result.regeocode.addressComponent;
        _this.value = [e.lnglat.R, e.lnglat.P];
        _this.updataAddress(addressComponent);
      });
    };
  },
  methods: {
    //选择地图更新地址输入框
    updataAddress(addressComponent) {
      const city = [];
      const adcode = addressComponent.adcode;
      const address =
        addressComponent.township +
        addressComponent.street +
        addressComponent.streetNumber;
      city.push(adcode.substring(0, 3) + "000");
      city.push(adcode.substring(0, 4) + "00");
      city.push(adcode);
      this.change({
        city: city,
        address: address
      });
    },
    //根据地址搜索地图
    searchAddress(city, address, isSetMarker) {
      const _this = this;
      if (city && address) {
        geocoder.setCity(city); //设置查询的城市
        geocoder.getLocation(address, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            const location = result.geocodes[0].location;
            let o = amapManager.getMap();
            const position = [location.R, location.P];
            o.setZoomAndCenter(15, position);
            //自动加上坐标位置
            if (isSetMarker) {
              _this.setManager(position);
            }
          }
        });
      }
    },
    //给地图上设置坐标点
    setManager(position) {
      if (!this.isMarker) {
        let o = amapManager.getMap();
        thismarker.setMap(o);
        this.isMarker = true;
      }
      thismarker.setPosition(position);
    },

    change(data) {
      //获取地区文字
      this.$emit("updata", this.value);
      this.$emit("change", this.value, data);
    },
    copyData() {
      this.value = JSON.parse(JSON.stringify(this.data));
    }
  },
  watch: {
    data() {
      this.copyData();
    }
  }
};
</script>
