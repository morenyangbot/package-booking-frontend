<script>
import { message } from "ant-design-vue";
import { reverseReceipt } from "../services/packageService";
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
};

export default {
  name: "reverse",
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form
        .validateFields()
        .then(pkg => reverseReceipt(pkg))
        .then(res => {
          this.resetForm();
          message.success("预约成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm() {
      this.form.resetFields();
    }
  }
};
</script>
<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="运单号" v-bind="formItemLayout">
        <a-input
          v-decorator="['no',{rules: [{ required: true, message: 'Please input your no!' }]}]"
        />
      </a-form-item>
      <a-form-item label="取件时间" :label-col="{span: 5}" :wrapper-col="{ span: 12 }">
        <a-date-picker
          v-decorator="['reserveTime', {rules: [{ required: true, message: 'Please input your time!' }]}]"
        />
      </a-form-item>
      <a-button type="primary" html-type="submit">预约</a-button>
      <a-button @click="resetForm">取消</a-button>
    </a-form>
  </div>
</template>

