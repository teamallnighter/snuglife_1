import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  customersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.first_name);
  },
  customersOneListFormatter(val) {
    if (!val) return '';
    return val.first_name;
  },
  customersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.first_name };
    });
  },
  customersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.first_name, id: val.id };
  },

  order_itemsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.quantity);
  },
  order_itemsOneListFormatter(val) {
    if (!val) return '';
    return val.quantity;
  },
  order_itemsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.quantity };
    });
  },
  order_itemsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.quantity, id: val.id };
  },

  ordersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.order_date);
  },
  ordersOneListFormatter(val) {
    if (!val) return '';
    return val.order_date;
  },
  ordersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.order_date };
    });
  },
  ordersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.order_date, id: val.id };
  },

  productsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  productsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  productsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  productsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  reviewsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.comment);
  },
  reviewsOneListFormatter(val) {
    if (!val) return '';
    return val.comment;
  },
  reviewsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.comment };
    });
  },
  reviewsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.comment, id: val.id };
  },

  variationsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.size);
  },
  variationsOneListFormatter(val) {
    if (!val) return '';
    return val.size;
  },
  variationsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.size };
    });
  },
  variationsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.size, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
