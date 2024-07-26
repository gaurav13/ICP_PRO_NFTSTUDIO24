'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Spinner, Form, Button, Modal } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor, makeTokenCanister, makeUserActor } from '@/dfx/service/actor-locator';
import { ConnectPlugWalletSlice } from '@/types/store';
import {
  ErrorMessage,
  Field,
  Formik,
  Form as FormikForm,
  FormikProps,
  FormikValues,
} from 'formik';
import { number, object } from 'yup';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import { E8S } from '@/constant/config';
import ListOfMinters from '@/components/transections/TokensMintersList';

export default function UserManagment() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    mintTokens: '',
  });
  const [isMintingLoading, setIsMintingLoading] = useState(false);
  const { auth, userAuth, identity } = useConnectPlugWalletStore((state) => ({
    auth: (state as ConnectPlugWalletSlice).auth,
    userAuth: (state as ConnectPlugWalletSlice).userAuth,
    identity: (state as ConnectPlugWalletSlice).identity,
  }));
  const childRef2 = useRef<any>();
  const likeRewardRef = useRef<FormikProps<FormikValues>>(null);
  const pathname = usePathname();
  let tokenActor =  makeTokenCanister({
    agentOptions: {
      identity,
    },
  });
  const mintTokenSchema = object().shape({
    mintTokens: number()
      .required('Please enter tokens amount')
      .min(10, 'Tokens Amount can not be less than 10')
      .max(E8S*E8S, `Tokens Amount can not be more than ${E8S*E8S}`)
      .test(
        'is-multiple-of-10',
        'Tokens Amount must be a multiple of 10',
        (value) => value % 10 === 0
      ),
  });
/**
 * handleMintTokens use to mint tokens
 * @param values 
 * @returns null
 */
  const handleMintTokens = async (values:any) => {
    if (!identity || auth.state !== 'initialized') return;
    try {
      setIsMintingLoading(true);

      let updated = await tokenActor.mint_tokens(values.mintTokens,userCanisterId);

      if(updated){
        toast.success('Tokens minted successfully');
      
  
        likeRewardRef?.current?.resetForm();
        childRef2?.current?.handleReFetch();

      }else{
        toast.error('Something went wrong');
       
      }
      setIsMintingLoading(false);
    } catch (error) {
      setIsMintingLoading(false);
    }
  };

  useEffect(() => {
    if (auth.state === 'initialized') {
      if (userAuth.userPerms?.adminManagement && !userAuth.isAdminBlocked) {
    
      } else {
        router.replace('/super-admin');
      }
    } else if (auth.state === 'anonymous') {
      router.replace('/super-admin');
    }
  }, [userAuth, auth, pathname]);

  return userAuth.userPerms?.adminManagement && !userAuth.isAdminBlocked ? (
    <>
      <main id='main' className='dark'>
        <div className='main-inner admin-main'>
          <div className='section admin-inner-pnl' id='top'>
            <Row className='mb-2'>
              <Col xl='8' lg='6' md='6'>
                <h1>Manage Tokens</h1>
              </Col>
            </Row>
            <Row>
              <Col xl='10' lg='12'>
                <div className='mt-5'>
                  <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={mintTokenSchema}
                    innerRef={likeRewardRef}
                    onSubmit={async (values) => {
                      handleMintTokens(values);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      validateForm,
                      /* and other goodies */
                    }) => (
                      <FormikForm onSubmit={handleSubmit}>
                        <Row>                 
                          <Col xs='8' lg='6'>
                            <Field name='mintTokens'>
                              {({ field, formProps }: any) => (
                                <Form.Group controlId='formBasicEmail'>
                                  <Form.Label>
                                    Mint Tokens
                                    <Tippy
                                      content={
                                        <div>
                                          <p className='mb-0'>
                                            how many tokens do you want to mint
                                          </p>
                                        </div>
                                      }
                                    >
                                      <span className='ps-1'>
                                        <i className='fa fa-circle-info' />
                                      </span>
                                    </Tippy>
                                  </Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='number'
                                    name='mintTokens'
                                    placeholder='eg. 1000 '
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div
                              style={{ height: 35 }}
                              className='text-danger '
                            >
                              <ErrorMessage
                                className='Mui-err '
                                name='mintTokens'
                                component='div'
                              />
                            </div>
                          </Col>
                        </Row>
                        <Col xs='4' className='d-flex align-items-end'>
                          <Button
                            disabled={isMintingLoading}
                            className='publish-btn'
                            type='submit'
                          >
                            {isMintingLoading ? <Spinner size='sm' /> : 'Apply'}
                          </Button>
                        </Col>
                      </FormikForm>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </div>
        
        </div>
        <div>
        <ListOfMinters btnRef={childRef2}/>
        </div>
      </main>
    </>
  ) : (
    <></>
  );
}
