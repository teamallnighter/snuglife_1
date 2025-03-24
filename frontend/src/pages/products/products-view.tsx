import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/products/productsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const ProductsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View products')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View products')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/products/products-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ProductName</p>
            <p>{products?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={products?.description}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Price</p>
            <p>{products?.price || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Category</p>
            <p>{products?.category ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Reviews</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Rating</th>

                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.reviews &&
                      Array.isArray(products.reviews) &&
                      products.reviews.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reviews/reviews-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='rating'>{item.rating}</td>

                          <td data-label='comment'>{item.comment}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!products?.reviews?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Variations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Size</th>

                      <th>Color</th>

                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.variations &&
                      Array.isArray(products.variations) &&
                      products.variations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/variations/variations-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='size'>{item.size}</td>

                          <td data-label='color'>{item.color}</td>

                          <td data-label='stock'>{item.stock}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!products?.variations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Order_items Product</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.order_items_product &&
                      Array.isArray(products.order_items_product) &&
                      products.order_items_product.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/order_items/order_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='quantity'>{item.quantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!products?.order_items_product?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Reviews Product</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Rating</th>

                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.reviews_product &&
                      Array.isArray(products.reviews_product) &&
                      products.reviews_product.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reviews/reviews-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='rating'>{item.rating}</td>

                          <td data-label='comment'>{item.comment}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!products?.reviews_product?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Variations Product</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Size</th>

                      <th>Color</th>

                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.variations_product &&
                      Array.isArray(products.variations_product) &&
                      products.variations_product.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/variations/variations-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='size'>{item.size}</td>

                          <td data-label='color'>{item.color}</td>

                          <td data-label='stock'>{item.stock}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!products?.variations_product?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/products/products-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProductsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PRODUCTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ProductsView;
