<script>
import { message } from "ant-design-vue";
import { reverseReceipt } from "../services/packageService";
import moment from "moment";
const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 12
  }
};

export default {
  name: "Reverse",
  data() {
    const timeValidator = (rule, value, cb) => {
      if (!value) {
        cb(new Error("请选择日期"));
      }
      const hour = moment(value).hour();
      if (hour >= 20 || hour < 8) {
        cb(new Error("超出时间范围"));
      }
      cb();
    };
    return {
      formItemLayout,
      timeValidator,
      form: this.$form.createForm(this)
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
      <a-form-item label="取件时间" v-bind="formItemLayout">
        <a-date-picker
          :showTime="true"
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['reserveTime', {rules:[{required: true, message: '请选择时间'}, {validator: timeValidator}]}]"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 5 },
      }"
      >
        <a-button type="primary" html-type="submit">预约</a-button>
        <a-button @click="resetForm">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

