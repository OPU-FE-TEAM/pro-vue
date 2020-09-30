import PageHeaderComponent from "./PageHeader.vue";
import PageContentComponent from "./PageContent.vue";
import PageFooterComponent from "./PageFooter.vue";

const page = {
  install: function(Vue) {
    Vue.component("PageHeader", PageHeaderComponent);
    Vue.component("PageContent", PageContentComponent);
  }
};

export const PageHeader = PageHeaderComponent;
export const PageContent = PageContentComponent;
export const PageFooter = PageFooterComponent;

export default page;
