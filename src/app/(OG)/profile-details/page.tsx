'use client';
import React, { useEffect, useRef, useState } from 'react';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import Head from 'next/head';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ErrorMessage,
  Field,
  Formik,
  Form as FormikForm,
  FormikProps,
  FormikValues,
  useFormikContext,
} from 'formik';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { User } from '@/types/profile';
import { date, object, string } from 'yup';
import { getImage, getImageById } from '@/components/utils/getImage';
import defaultBanner from '@/assets/Img/default-banner.jpg';
import girl from '@/assets/Img/user-img.png';
import authMethods from '@/lib/auth';
import {
  MAX_AUTHOR_INFO_CHARACTERS,
  MAX_AUTHOR_META_DESC_CHARACTERS,
  MAX_AUTHOR_TITLE_CHARACTERS,
  MAX_DESIGNATION_CHARACTERS,
  MAX_IMAGE_SIZE,
  MAX_NAME_CHARACTERS,
  MIN_NAME_CHARACTERS,
} from '@/constant/validations';
import { toast } from 'react-toastify';
import { fileToCanisterBinaryStoreFormat } from '@/dfx/utils/image';
import logger from '@/lib/logger';
import Resizer from 'react-image-file-resizer';
import resizeImage from '@/components/utils/resizeImage';
import ImageCropper from '@/components/Cropper';
import { CropperProps } from '@/types/cropper';
import getCroppedImg from '@/components/Cropper/cropImage';
import { BASE_IMG_URL, isValidFileType } from '@/constant/image';
import {
  MAX_BANNER_SIZES,
  MAX_PROFILE_SIZES,
  bannerAspect,
  profileAspect,
} from '@/constant/sizes';
import instance from '@/components/axios';
import uploadImage from '@/components/utils/uploadImage';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import { ConnectPlugWalletSlice } from '@/types/store';
import { Principal } from '@dfinity/principal';
import { getIdFromLink, getIdFromUrl } from '@/constant/DateFormates';
import { canisterId as entryCanisterId } from '@/dfx/declarations/entry';

function ScrollToError() {
  const formik = useFormikContext();
  const submitting = formik?.isSubmitting;

  useEffect(() => {
    const el = document.querySelector('.Mui-err');
    (el?.parentElement ?? el)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [submitting]);
  return null;
}

export default function ProfileDetails() {
  const { t, changeLocale } = useLocalization(LANG);
  const [user, setUser] = useState<User | null>();
  // Both these are for profile Image
  const [tempImg, setTempImg] = useState({ imgUrl: '' });
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  const userId = searchParams.get('userId');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  // These are for Banner Image
  const [tempBannerImg, setTempBannerImg] = useState({ imgUrl: '' });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerImg, setBannerImg] = useState<string | null>();
  const [profileImg, setProfileImg] = useState<string | null>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGender, setCurrentGender] = useState('Male');
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [cropperImg, setCropperImg] = useState<CropperProps | undefined>();
  const [showCropper, setShowCropper] = useState(false);
  const [bannerImgId, setBannerImgId] = useState<string | undefined>();
  const [profileImgId, setProfileImgId] = useState<string | undefined>();
  const router = useRouter();
  const formRef = useRef<FormikProps<FormikValues>>(null);
  // const bannerRef = useRef();
  const handleClose = () => { };

  const { auth, setAuth, setIdentity, userAuth } = useConnectPlugWalletStore(
    (state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      setIdentity: state.setIdentity,
      userAuth: state.userAuth,
    })
  );

  const methods = authMethods({
    useConnectPlugWalletStore,
    handleClose,
    setIsLoading,
  });

  const initialUser = {
    name: user?.name[0] ?? '',
    designation: user?.designation[0] ?? '',
    email: user?.email[0] ?? '',
    website: user?.website[0] ?? '',
    dob: user?.dob[0] ?? '',
    // gender: user?.gender[0] ? user?.gender[0] : '',
    facebook: user?.facebook[0] ?? '',
    twitter: user?.twitter[0] ?? '',
    instagram: user?.instagram[0] ?? '',
    linkedin: user?.linkedin[0] ?? '',
    authorInfo: user?.authorInfo[0] ?? '',
    authorTitle: user?.authorTitle[0] ?? '',
    authorDescription: user?.authorDescription[0] ?? '',

    // bio: user?.bio[0] ? user?.bio[0] : '',
    // externalLink: user?.externalLink[0] ? user?.externalLink[0] : '',
  };
  const userSchema = object().shape({
    // name: string()
    //   .required('Name is required')
    //   .max(MAX_NAME_CHARACTERS, 'Name can not be more than 40 characters'),
    name:
      LANG == 'en'
        ? string()
          .required(t('Name is required'))
          .matches(/^[a-zA-Z\s]+$/, t('Only alphabets are allowed'))
          .max(
            MAX_NAME_CHARACTERS,
            t('Name can not be more than 40 characters')
          )
          .min(
            MIN_NAME_CHARACTERS,
            t('Name can not be less than 3 characters')
          )
        : string()
          .required(t('Name is required'))
          .max(
            MAX_NAME_CHARACTERS,
            t('Name can not be more than 40 characters')
          )
          .min(
            MIN_NAME_CHARACTERS,
            t('Name can not be less than 3 characters')
          ),
    designation:
      LANG == 'en'
        ? string()
          .matches(
            /^[a-zA-Z0-9\s]+$/,
            t('Only AlphaNumeric characters are allowed')
          )
          .max(
            MAX_DESIGNATION_CHARACTERS,
            t('Designation can not be more than 100 characters')
          )
          .min(
            MIN_NAME_CHARACTERS,
            t('Designation can not be less than 3 characters')
          )
        : string()
          .max(
            MAX_DESIGNATION_CHARACTERS,
            t('Designation can not be more than 100 characters')
          )
          .min(
            MIN_NAME_CHARACTERS,
            t('Designation can not be less than 3 characters')
          ),
    // email: string().email('Invalid Email').required('Email is required'),
    email: string()
      .required(t('Email is required'))
      .trim()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[A-Za-z]+$/,
        t('Invalid Email')
      ),
    website: string().url(t('Website Link must be a valid URL')),
    dob: date().max(new Date(), t('Date is not valid')),
    // gender: string().required('Gender is required'),
    facebook: string().url(t('Facebook Link must be a valid URL')),
    twitter: string().url(t('Twitter Link must be a valid URL')),
    instagram: string().url(t('Instagram Link must be a valid URL')),
    linkedin: string().url(t('Linkedin Link must be a valid URL')),
    authorInfo: string().max(
      MAX_AUTHOR_INFO_CHARACTERS,
      `${t(
        'Author Info can not be more than'
      )} ${MAX_AUTHOR_INFO_CHARACTERS} ${t('characters')}`
    ),
    authorTitle: string().max(
      MAX_AUTHOR_TITLE_CHARACTERS,
      `${t(
        'Author Title can not be more than '
      )} ${MAX_AUTHOR_TITLE_CHARACTERS} ${t('characters')}`
    ),
    authorDescription: string().max(
      MAX_AUTHOR_META_DESC_CHARACTERS,
      `${t(
        'Author Description can not be more than'
      )}  ${MAX_AUTHOR_META_DESC_CHARACTERS} ${t('characters')}`
    ),
    // bio: string()
    //   // .min(20, 'Bio Should be at least 20 characters long')
    //   .max(MAX_BIO_CHARACTERS, 'Bio can not be more than 300 characters'),
    // externalLink: string().url('Link must be a valid URL'),
    // bannerImg: mixed(),
    // profileImg: mixed(),
  });
  const handleShowCropper = () => {
    setShowCropper(true);
  };
  const handleHideCropper = () => {
    setShowCropper(false);
  };
  const profileUpload = async (
    imgUrl: string,
    imgName: string,
    pixels: any,
    rotation: number = 0
  ) => {
    const croppedImage = await getCroppedImg(imgUrl, imgName, pixels, rotation);
    if (!croppedImage) return;
    const resizedProfile = await resizeImage(
      croppedImage,
      MAX_PROFILE_SIZES.width,
      MAX_PROFILE_SIZES.height
    );

    const newUrl = URL.createObjectURL(resizedProfile);
    setTempImg({
      imgUrl: newUrl,
    });
    const imgId = await uploadImage(resizedProfile);

    setProfileImgId(imgId);
    setProfileFile(resizedProfile);
    handleHideCropper();
  };
  const bannerUpload = async (
    imgUrl: string,
    imgName: string,
    pixels: any,
    rotation: number = 0
  ) => {
    const croppedImage = await getCroppedImg(imgUrl, imgName, pixels, rotation);
    if (!croppedImage) return;
    const resizedBanner = await resizeImage(
      croppedImage,
      MAX_BANNER_SIZES.width,
      MAX_BANNER_SIZES.height
    );
    const newUrl = URL.createObjectURL(resizedBanner);

    // return response.data;
    setTempBannerImg({
      imgUrl: newUrl,
    });
    const imgId = await uploadImage(resizedBanner);
    setBannerImgId(imgId);
    setBannerFile(resizedBanner);
    handleHideCropper();
  };
  const handleImageChange = async (e: any) => {
    const img = e.target.files[0];

    const imgUrl = URL.createObjectURL(img);
    const validType = isValidFileType(img && img.name.toLowerCase(), 'image');
    if (!validType) {
      toast.error(t('Not a valid image type'));
      return;
    }
    if (e.target.name === 'profileImg') {
      setCropperImg({
        imgUrl,
        imgName: img.name,
        aspect: profileAspect,
        callBack: profileUpload,
        maxWidth:MAX_PROFILE_SIZES.width,
        maxHeight:MAX_PROFILE_SIZES.height
      });
      handleShowCropper();
    } else if (e.target.name === 'bannerImg') {
      // const imgUrl = URL.createObjectURL(resizedBanner);
      setCropperImg({
        imgUrl,
        imgName: img.name,
        aspect: bannerAspect,
        callBack: bannerUpload,
        maxWidth:MAX_BANNER_SIZES.width,
        maxHeight:MAX_BANNER_SIZES.height
      
      });
      handleShowCropper();
    }
    e.target.value = '';
  };
  const updateImg = async (img: any, name: string) => {
    if (img) {
      const tempImg = img;
      if (name === 'profile') {
        setProfileImg(tempImg);
      } else {
        setBannerImg(tempImg);
      }
    } else {
      if (name === 'profile') {
        setProfileFile(null);
        setProfileImg(null);
      } else {
        setBannerFile(null);
        setBannerImg(null);
      }
    }
  };

  const getUser = async (res?: any) => {
    let tempUser = null;
    let tempurl = window.location.search;
    const searchParams = await new URLSearchParams(tempurl);
    const tempuserId = searchParams.get('userId');

    let inputId = tempuserId ? [tempuserId] : [];

    if (res) {
      tempUser = await res.get_user_details(inputId);
    } else {
      tempUser = await auth.actor.get_user_details(inputId);
    }

    if (tempUser.ok) {
      if (!tempuserId) {
        setUser(tempUser.ok[1]);
        setCurrentGender(tempUser.ok[1].gender[0] ?? 'Male');
        updateImg(tempUser.ok[1].profileImg[0], 'profile');
        updateImg(tempUser.ok[1].bannerImg[0], 'banner');
        setIsOwner(tempUser.ok[2]);
        let profile_ImgId = getIdFromUrl(tempUser.ok[1].profileImg[0]);
        setProfileImgId(profile_ImgId);
      } else {
        if (userAuth.userPerms?.adminManagement) {
          setUser(tempUser.ok[1]);
          setCurrentGender(tempUser.ok[1].gender[0] ?? 'Male');
          updateImg(tempUser.ok[1].profileImg[0], 'profile');
          updateImg(tempUser.ok[1].bannerImg[0], 'banner');
          setIsOwner(tempUser.ok[2]);
          let profile_ImgId = getIdFromUrl(tempUser.ok[1].profileImg[0]);
          setProfileImgId(profile_ImgId);
        } else {
          logger(
            { tempuserId, user: userAuth.userPerms?.adminManagement },
            'profileDetailuser'
          );
          if (userAuth.userPerms?.adminManagement == false) {
            router.replace('/');
          }
        }
      }
    }
  };

  useEffect(() => {
    if (auth.state === 'initialized') {
      getUser();
    } else {
      methods.initAuth().then(async (res) => {
        getUser(res.actor);
        if (!res.success) {
          // toast.error('Your session has expired please log in again', {
          //   autoClose: 1900,
          // });
          // setTimeout(() => {
          //   router.push('/');
          // }, 3000);
        } else {
        }
      });
      logger('User not authenticated');
    }
  }, []);
  useEffect(() => {
    if (auth.state === 'anonymous') {
      setIsOwner(false);
    } else if (auth.state !== 'initialized') {
    } else {
      getUser();
    }
  }, [auth]);
  useEffect(() => {
    const getIdentity = async () => {
      if (auth.client) {
        const con = await auth.client.isAuthenticated();
        if (con) {
          const identity = await auth.client.getIdentity();
          setIsAuthenticated(true);
          setIdentity(identity);
        } else {
          router.replace('/');
          setIsAuthenticated(false);
        }
      }
    };
    getIdentity();
  }, [auth.client]);

  return (
    <main id='main'>
      {isAuthenticated && (
        <>
          {cropperImg && (
            <ImageCropper
              show={showCropper}
              handleClose={handleHideCropper}
              cropperProps={cropperImg}
            />
          )}
          <>
            <div className='main-inner home'>
              <div className='section' id='top'>
                <Row>
                  {/* <Col xl='12' lg='12' md='12'>
                    <div className='flex-div'>
                      <h2>Edit profile</h2>
                      <Button
                        className='reg-btn blue empty'
                        onClick={() => formRef.current?.handleSubmit()}
                        disabled={isFormSubmitting}
                      >
                        {isFormSubmitting ? (
                          <Spinner
                            animation='border'
                            // variant='secondary'
                            // size='sm'
                            style={{
                              width: '1.2rem',
                              height: '1.2rem',
                              borderWidth: '0.2rem',
                            }}
                          />
                        ) : (
                          'Save'
                        )}
                      </Button>
                    </div>
                    <div className='spacer-20'></div>
                  </Col> */}
                  <Col xl='12' lg='12' md='12'>
                    <div className='pbg-pnl text-left'>
                      <Form>
                        <Form.Group>
                          <Row>
                            <Col className='mb-4' xl='12'>
                              <Form.Label>{t('Change Cover Photo')}</Form.Label>
                              <input
                                id='bannerImgId'
                                className='d-none'
                                onChange={handleImageChange}
                                name='bannerImg'
                                type='file'
                              />
                              <div className='full-div'>
                                <div className='edit-banner-cntnr'>
                                  {/* <Image src={pic} alt='Pic' /> */}
                                  <div
                                    className='img-catch'
                                  // style={{
                                  //   aspectRatio: bannerAspect,
                                  // }}
                                  >
                                    {bannerFile ? (
                                      <Image
                                        fill={true}
                                        src={tempBannerImg.imgUrl}
                                        alt='Banner'
                                      />
                                    ) : (
                                      <Image
                                        src={
                                          bannerImg ? bannerImg : defaultBanner
                                        }
                                        alt='Banner'
                                        fill={true}
                                      />
                                    )}
                                  </div>
                                  <Form.Label htmlFor='bannerImgId'>
                                    <i className='fa fa-edit'></i>{' '}
                                    {t('edit picture')}
                                  </Form.Label>
                                </div>
                              </div>
                            </Col>
                            <Col className='mb-4' xl='12'>
                              <Form.Label>
                                {t('Change Profile Picture')}
                              </Form.Label>
                              <input
                                id='profileImg'
                                className='d-none'
                                // value={profileFile}
                                // onChange={(e) => handleImageChange(e)}
                                //  value={}
                                onChange={handleImageChange}
                                name='profileImg'
                                type='file'
                              />

                              <div className='full-div'>
                                <div className='edit-picture-cntnr'>
                                  {/* <Image src={pic} alt='Pic' /> */}
                                  <div
                                    style={{
                                      width: 200,
                                      aspectRatio: profileAspect,
                                      position: 'relative',
                                    }}
                                  >
                                    {profileFile ? (
                                      <Image
                                        fill={true}
                                        src={tempImg.imgUrl}
                                        alt='Profile'
                                      />
                                    ) : (
                                      <Image
                                        src={profileImg ? profileImg : girl}
                                        fill={true}
                                        alt='Profile'
                                      />
                                    )}
                                  </div>

                                  <Form.Label htmlFor='profileImg'>
                                    <i className='fa fa-edit'></i>{' '}
                                    {t('edit picture')}
                                  </Form.Label>
                                </div>
                                <div></div>
                              </div>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </div>
                    <Formik
                      initialValues={initialUser}
                      enableReinitialize={true}
                      validationSchema={userSchema}
                      innerRef={formRef}
                      onSubmit={async (values, { resetForm }) => {
                        setIsFormSubmitting(true);
                        // setUser(undefined);
                        logger('SUBMITNIG');
                        if (auth.state !== 'initialized') return;
                        let fileArray = null;
                        let bannerArray = null;
                        if (profileFile !== null) {
                          // fileArray = await fileToCanisterBinaryStoreFormat(
                          //   profileFile
                          // );
                          fileArray = BASE_IMG_URL + profileImgId;
                          logger({ profileImgId, fileArray }, 'tempuser21321');
                        }
                        if (bannerFile !== null) {
                          // bannerArray = await fileToCanisterBinaryStoreFormat(
                          //   bannerFile
                          // );
                          bannerArray = BASE_IMG_URL + bannerImgId;
                        }
                        logger(
                          { bannerArray, fileArray, profileImgId },
                          'sent emd'
                        );
                        let tempuser = {
                          name: values.name,
                          designation: values.designation,
                          email: values.email,
                          website: values.website,
                          dob: values.dob,
                          gender: currentGender,
                          facebook: values.facebook,
                          twitter: values.twitter,
                          instagram: values.instagram,
                          // linkdin: values.linkedin,
                          linkedin: values.linkedin,
                          authorInfo: values.authorInfo,
                          authorTitle: values.authorTitle,
                          authorDescription: values.authorDescription,
                          bannerImg: bannerArray ? [bannerArray] : [],
                          profileImg: fileArray ? [fileArray] : [],
                        };

                        let newUser = null;
                        if (userAuth.userPerms?.adminManagement && userId) {
                          logger('adminupdate', 'update');
                          let userPrincipal = Principal.fromText(userId);
                          newUser = await auth.actor.admin_update_user(
                            userPrincipal,
                            tempuser,
                            entryCanisterId
                          );
                        } else {
                          newUser = await auth.actor.update_user(
                            tempuser,
                            entryCanisterId
                          );
                          logger('userupdate', 'update');
                        }
                        logger(newUser);
                        if (newUser?.ok) {
                          setUser(newUser.ok[1]);
                          updateImg(newUser.ok[1].profileImg[0], 'profile');
                          updateImg(newUser.ok[1].bannerImg[0], 'banner');
                          // handleClose();
                          resetForm();
                          toast.success(t('Profile Updated Successfully'));
                          // setSubmitting(false);
                          setIsFormSubmitting(false);

                          window.scrollTo(0, 0);
                          if (userAuth.userPerms?.adminManagement && userId) {
                          } else {
                            router.push('/profile');
                          }
                        } else {
                          window.scrollTo(0, 0);
                          setIsFormSubmitting(false);
                          toast.error(newUser.err);
                        }
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
                          <ScrollToError />
                          {/* <Field name='name'>
                          {({ field, formProps }: any) => (
                            <Form.Group className='mb-2' controlId='name'>
                              <h2>
                                Name <sup className='required'>Required</sup>
                              </h2>
                              <p>
                                What do you want to be known as? This can be
                                either you personally, or the name of a project
                                you’re looking to create
                              </p>
                              <Form.Control
                                type='text'
                                value={field.value}
                                onChange={handleChange}
                                placeholder='name'
                                maxLength={MAX_NAME_CHARACTERS}
                              />
                            </Form.Group>
                          )}
                        </Field> */}
                          {/* <div className='text-danger my-1'>
                          <ErrorMessage className="Mui-err"name='name' component='div' />
                        </div>
                        <Field name='bio'>
                          {({ field, formProps }: any) => (
                            <Form.Group className='mb-2' controlId='bio'>
                              <h2>
                                Bio <sup>Optional</sup>
                              </h2>
                              <p>
                                A brief summary of who you are. Accepts basic
                                markdown.
                              </p>
                              <Form.Control
                                as='textarea'
                                value={field.value}
                                onChange={handleChange}
                                placeholder='Message'
                                rows={3}
                                maxLength={MAX_BIO_CHARACTERS}
                              />
                            </Form.Group>
                          )}
                        </Field>
                        <div className='text-danger my-1'>
                          <ErrorMessage className="Mui-err"name='bio' component='div' />
                        </div>
                        <Field name='externalLink'>
                          {({ field, formProps }: any) => (
                            <Form.Group
                              className='mb-2'
                              controlId='externalLink'
                            >
                              <h2>
                                External Link <sup>Optional</sup>
                              </h2>
                              <p>Add an external link to your profile.</p>
                              <Form.Control
                                type='text'
                                value={field.value}
                                onChange={handleChange}
                                placeholder='url'
                              />
                            </Form.Group>
                          )}
                        </Field>

                        <div className='text-danger my-1'>
                          <ErrorMessage className="Mui-err"name='externalLink' component='div' />
                        </div> */}
                          {/* <Button
                          className='submit-btn d-flex align-items-center justify-content-center'
                          type='submit'
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <Spinner
                              animation='border'
                              // variant='secondary'
                              // size='sm'
                              style={{
                                width: '1.5rem',
                                height: '1.5rem',
                                borderWidth: '0.3rem',
                              }}
                            />
                          ) : (
                            ' Save Settings'
                          )}
                        </Button> */}
                          <div className='pbg-pnl text-left'>
                            <div className='mb-4'>
                              <Field name='name'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    {/* {('Hi', field)} */}
                                    <Form.Label>{t('name')}</Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='text'
                                      name='name'
                                      placeholder={t('name')}
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='name'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='designation'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    {/* {('Hi', field)} */}
                                    <Form.Label>{t('designation')}</Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='text'
                                      name='designation'
                                      placeholder={t('enter designation')}
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='designation'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='email'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('email (required)')}
                                    </Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='text'
                                      name='email'
                                      placeholder='Johndoe@example.com'
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='email'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='website'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>{t('website')}</Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='text'
                                      name='website'
                                      placeholder='https://example.com'
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='website'
                                  component='div'
                                />
                              </div>
                            </div>
                          </div>
                          <div className='pbg-pnl text-left'>
                            <div className='mb-4'>
                              <Field name='dob'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>{t('birth date')}</Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='date'
                                      name='dob'
                                    // max={new Date()}
                                    // max={new Date().toJSON().slice(0, 10)}
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='dob'
                                  component='div'
                                />
                              </div>
                            </div>
                            <Form.Label>{t('Gender')}</Form.Label>
                            <Row>
                              <Col xxl='12' xl='12' lg='12' md='12' sm='12'>
                                <ul className='btn-list gender'>
                                  <li>
                                    <Button
                                      className={`gender-btn ${currentGender === 'Male' ? 'active' : ''
                                        }`}
                                      onClick={() => setCurrentGender('Male')}
                                    >
                                      {t('male')}
                                    </Button>
                                  </li>
                                  <li>
                                    <Button
                                      className={`gender-btn ${currentGender === 'Female'
                                          ? 'active'
                                          : ''
                                        }`}
                                      onClick={() => setCurrentGender('Female')}
                                    >
                                      {t('female')}
                                    </Button>
                                  </li>
                                  <li>
                                    <Button
                                      className={`gender-btn ${currentGender === 'Non-binary'
                                          ? 'active'
                                          : ''
                                        }`}
                                      onClick={() =>
                                        setCurrentGender('Non-binary')
                                      }
                                    >
                                      {t('Non-binary')}
                                    </Button>
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                          </div>
                          <div className='pbg-pnl text-left'>
                            <div className='mb-4'>
                              <Field name='facebook'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('Facebook Profile URL')}{' '}
                                    </Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='text'
                                      name='facebook'
                                      placeholder='https://'
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='facebook'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='twitter'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('Twitter Profile URL')}{' '}
                                    </Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      type='text'
                                      name='twitter'
                                      placeholder='https://'
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='twitter'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='instagram'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('Instagram Profile URL')}
                                    </Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      name='instagram'
                                      type='text'
                                      placeholder='https://'
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='instagram'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='linkedin'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('LinkedIn Profile URL')}
                                    </Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      name='linkedin'
                                      type='text'
                                      placeholder='https://'
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='linkedin'
                                  component='div'
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className='pbg-pnl text-left'>
                            <Field name='authorInfo'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-4'>
                                  <Form.Label>{t('Author’s Info')} </Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    name='linkedin'
                                    as='textarea'
                                    rows={3}
                                    placeholder='Neha Ali'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger my-1'>
                              <ErrorMessage
                                className='Mui-err'
                                name='linkedin'
                                component='div'
                              />
                            </div>
                          </div> */}
                          <div className='pbg-pnl text-left'>
                            <div className='mb-4'>
                              <Field name='authorInfo'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('Author’s Info')}
                                    </Form.Label>
                                    <Form.Control
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      name='authorInfo'
                                      as='textarea'
                                      rows={3}
                                      placeholder={t('Author,s Info')}
                                    />
                                  </Form.Group>
                                )}
                              </Field>{' '}
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  className='Mui-err'
                                  name='authorInfo'
                                  component='div'
                                />
                              </div>
                            </div>
                          </div>
                          <div className='pbg-pnl text-left'>
                            <div className='mb-4'>
                              <Field name='authorTitle'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t('Title to use for Author page')}
                                    </Form.Label>
                                    <Form.Control
                                      autoComplete='off'
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                      name='authorTitle'
                                      type='text'
                                      placeholder={t('Title')}
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  name='authorTitle'
                                  component='div'
                                />
                              </div>
                            </div>
                            <div className='mb-4'>
                              <Field name='authorDescription'>
                                {({ field, formProps }: any) => (
                                  <Form.Group>
                                    <Form.Label>
                                      {t(
                                        'Meta description to use for Author pages'
                                      )}
                                    </Form.Label>
                                    <Form.Control
                                      as='textarea'
                                      name='authorDescription'
                                      rows={3}
                                      value={field.value}
                                      onChange={handleChange}
                                      onInput={handleBlur}
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                              <div className='text-danger mt-2'>
                                <ErrorMessage
                                  name='authorDescription'
                                  component='div'
                                />
                              </div>
                            </div>
                            <Button
                              className='submit-btn d-flex align-items-center justify-content-center'
                              type='submit'
                              disabled={isFormSubmitting}
                              style={{ maxWidth: '250px' }}
                            >
                              {isFormSubmitting ? (
                                <Spinner
                                  animation='border'
                                  // variant='secondary'
                                  // size='sm'
                                  style={{
                                    width: '1.5rem',
                                    height: '1.5rem',
                                    borderWidth: '0.3rem',
                                  }}
                                />
                              ) : (
                                t('Save Settings')
                              )}
                            </Button>
                          </div>
                        </FormikForm>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        </>
      )}
    </main>
  );
}
