import Vue from "vue";
import Component from "./SettingDrawer.vue";

const Constructor = Vue.extend(Component);

// const instances = [];
let seed = 1;

const SettingDrawer = options => {
  if (Vue.prototype.$isServer) return;

  const {
    //autoClose,
    ...rest
  } = options;
  const instance = new Constructor({
    propsData: {
      ...rest
    },
    data: {
      //autoClose: autoClose === undefined ? 3000 : autoClose
    }
  });

  const id = `SettingDrawer_${seed++}`;
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  //绑定 change 方法
  instance.vm.$on("change", selecteds => {
    if (instance.change) {
      instance.change(selecteds);
    }
  });
  instance.vm.$on("destroy", () => {
    document.body.removeChild(instance.vm.$el);
  });
  return instance.vm;
};

export default SettingDrawer;
