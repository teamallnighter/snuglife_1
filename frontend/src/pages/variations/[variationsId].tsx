import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/variations/variationsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditVariations = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    product: null,

    size: '',

    color: '',

    stock: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { variations } = useAppSelector((state) => state.variations);

  const { variationsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: variationsId }));
  }, [variationsId]);

  useEffect(() => {
    if (typeof variations === 'object') {
      setInitialValues(variations);
    }
  }, [variations]);

  useEffect(() => {
    if (typeof variations === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = variations[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [variations]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: variationsId, data }));
    await router.push('/variations/variations-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit variations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit variations'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Product' labelFor='product'>
                <Field
                  name='product'
                  id='product'
                  component={SelectField}
                  options={initialValues.product}
                  itemRef={'products'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Size'>
                <Field name='size' placeholder='Size' />
              </FormField>

              <FormField label='Color'>
                <Field name='color' placeholder='Color' />
              </FormField>

              <FormField label='Stock'>
                <Field type='number' name='stock' placeholder='Stock' />
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
                  onClick={() => router.push('/variations/variations-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditVariations.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_VARIATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditVariations;
