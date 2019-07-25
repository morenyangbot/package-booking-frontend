<script>
import { message } from "ant-design-vue";
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
};
export default {
  name: "PackageAddModal",
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    onSubmitForm() {
      this.form
        .validateFields()
        .then(form => this.$store.dispatch("insertPackage", form))
        .then(() => {
          message.success("包裹入库成功");
          this.closeModal();
        })
        .catch(err => {});
    },
    closeModal() {
      this.$emit("change", !this.visible);
      this.form.resetFields();
    }
  }
};
</script>
<template>
  <a-modal title="快递入库" :visible="visible" @cancel="closeModal" @ok="onSubmitForm">
    <a-form :form="form">
      <a-form-item label="运单号" v-bind="formItemLayout">
        <a-input
          v-decorator="['no',{rules: [{ required: true, message: 'Please input your no!' }]}]"
        />
      </a-form-item>
      <a-form-item label="收件人" v-bind="formItemLayout">
        <a-input
          v-decorator="['customerName',{rules: [{ required: true, message: 'Please input your customer name!' }]}]"
        />
      </a-form-item>
      <a-form-item label="电话" v-bind="formItemLayout">
        <a-input
          v-decorator="['phone',{rules: [{ required: true, message: 'Please input your customer phone!' }]}]"
        />
      </a-form-item>
      <a-form-item label="重量" v-bind="formItemLayout">
        <a-input-number :min="0" v-decorator="['weight']" />KG
      </a-form-item>
    </a-form>
  </a-modal>
</template>
