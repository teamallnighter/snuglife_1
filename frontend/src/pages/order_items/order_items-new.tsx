import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/order_items/order_itemsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  order: '',

  product: '',

  quantity: '',
};

const Order_itemsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/order_items/order_items-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Order' labelFor='order'>
                <Field
                  name='order'
                  id='order'
                  component={SelectField}
                  options={[]}
                  itemRef={'orders'}
                ></Field>
              </FormField>

              <FormField label='Product' labelFor='product'>
                <Field
                  name='product'
                  id='product'
                  component={SelectField}
                  options={[]}
                  itemRef={'products'}
                ></Field>
              </FormField>

              <FormField label='Quantity'>
                <Field type='number' name='quantity' placeholder='Quantity' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/order_items/order_items-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Order_itemsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_ORDER_ITEMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Order_itemsNew;
