'use client';
import React, { useEffect, useRef, useState } from 'react';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import Head from 'next/head';
import {
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { usePathname, useRouter } from 'next/navigation';
import { useConnectPlugWalletStore } from '@/store/useStore';
import { makeEntryActor, makeUserActor } from '@/dfx/service/actor-locator';
import logger from '@/lib/logger';
import { getImage } from '@/components/utils/getImage';
import NavBarDash from '@/components/DashboardNavbar/NavDash';
import SideBarDash from '@/components/SideBarDash/SideBarDash';
import { ConnectPlugWalletSlice } from '@/types/store';
import { UserPermissions } from '@/types/store';
import {
  ErrorMessage,
  Field,
  Formik,
  Form as FormikForm,
  FormikProps,
  FormikState,
  FormikValues,
  useFormikContext,
} from 'formik';
import { array, boolean, date, object, string } from 'yup';
import * as yup from 'yup';

import {
  MAX_CATEGORY_DESCRIPTION_CHARACTERS,
  MAX_CATEGORY_NAME_CHARACTERS,
  MAX_NAME_CHARACTERS,
} from '@/constant/validations';
import { canisterId as commentCanisterId } from '@/dfx/declarations/comment';
import { canisterId as userCanisterId } from '@/dfx/declarations/user';
import { Roles } from '@/types/profile';
import { Principal } from '@dfinity/principal';
import { toast } from 'react-toastify';
import { BASE_IMG_URL, isValidFileType } from '@/constant/image';
import getCroppedImg from '@/components/Cropper/cropImage';
import resizeImage from '@/components/utils/resizeImage';
import {
  ARTICLE_FEATURED_IMAGE_ASPECT,
  COMPANY_BANNER_IMAGE_ASPECT,
  COMPANY_LOGO_IMAGE_ASPECT,
  MAX_ARTICLE_FEATURED_SIZES,
  MAX_COMPANY_BANNER_SIZES,
  MAX_COMPANY_LOGO_SIZES,
} from '@/constant/sizes';
import { CropperProps } from '@/types/cropper';
import ImageCropper from '@/components/Cropper';
import Image from 'next/image';
import { fileToCanisterBinaryStoreFormat } from '@/dfx/utils/image';
import { fromNullable } from '@dfinity/utils';
import getChildren from '@/components/utils/getChildren';
import Texteditor from '@/components/cutomeEditor/editor';
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import MapSelector from '@/components/testingMap/MapTesting';
import uploadImage from '@/components/utils/uploadImage';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
import MyComponent from '@/components/testingMap/MapTesting';
import { getIdFromUrl } from '@/constant/DateFormates';
// import { Typeahead } from 'react-bootstrap-typeahead';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

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

const CustomDropdownItem = ({ category, indexed = 0 }: any) => {
  const hasChildren = category[1]?.children && category[1].children.length > 0;
  let myString = '&nbsp;';
  return (
    <>
      <option value={category[0]} key={category[0]}>
        {/* <p style={{ color: 'red' }}>HI there</p> */}

        <p dangerouslySetInnerHTML={{ __html: myString.repeat(indexed) }} />
        {category[1]?.name}
      </option>
      {hasChildren &&
        category[1].children.map((child: any, index: number) => (
          <CustomDropdownItem
            key={index}
            category={child}
            indexed={indexed + 3}
          />
        ))}
    </>
  );
};

export default function AddEvent() {
  const { t, changeLocale } = useLocalization(LANG);
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [formSubmiting, setFormSubmiting] = useState<boolean>(false);
  const [cropperImg, setCropperImg] = useState<CropperProps | undefined>();
  const [showCropper, setShowCropper] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState('');
  const [FeaturedFile, setFeautredFile] = useState<File | null>(null);
  const [eventContent, setEventContent] = useState('');
  const [featuredId, setFeaturedId] = useState<undefined | string>();
  const [event, setEvent] = useState<any>();
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  let eventId = searchParams.get('eventId');
  const [tags, setTags] = useState<string[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [LatLng, setLatLng] = useState<any>({
    lat: -34.397,
    lng: 150.644,
  });
  const { auth, userAuth, identity } = useConnectPlugWalletStore((state) => ({
    auth: (state as ConnectPlugWalletSlice).auth,
    userAuth: (state as ConnectPlugWalletSlice).userAuth,
    identity: (state as ConnectPlugWalletSlice).identity,
  }));
  const defaultEntryActor = makeEntryActor({
    agentOptions: {
      identity,
    },
  });
  const router = useRouter();

  const formikRef2 = useRef<FormikProps<FormikValues>>(null);

  const initialValues={
    title: event ? event.title : '',
    organiser: event ? event.organiser : '',
    shortDescription: event ? event.shortDescription : '',
    date: event ? new Date(event.date) : new Date(),
    endDate: event ? new Date(event.endDate) : new Date(),
    location: event ? event.location : '',
    country: event ? event.country : '',
    city: event ? event.city : '',
    website: event ? event.website : '',
    category: event ? event?.category[0] : '',
    linkdin: event ? event.linkdin : '',
    seoTitle: event ? event.seoTitle : '',
    seoDescription: event ? event.seoDescription : '',
    seoExcerpt: event ? event.seoExcerpt : '',
    seoSlug: event ? event.seoSlug : '',
    facebook: event ? event.facebook : '',
    telegram: event ? event.telegram : '',
    instagram: event ? event.instagram : '',
    twitter: event ? event.twitter : '',
    freeTicket: event ? event.freeTicket : '',
    applyTicket: event ? event.applyTicket : '',
  }
  let todate = new Date(Number(new Date()) - 86400000);
  const eventSchema = yup.object().shape({
    title: string()
      .required(t('Title is required'))
      .max(150, t('Title cannot be more than 150 characters')),
    organiser: string()
      .required(t('Organiser name is required'))
      .max(40, t('organiser name cannot be more than 40 characters')),
    shortDescription: string().required(t('Short description is required')),
    date: yup
      .date()
      .required(t('Date is required'))
      .min(todate, t('Date cannot be in the past')),
    endDate: yup
      .date()
      .required(t('End Date is required'))
      .min(yup.ref('date'), t("End Date can't be before Start Date")),
    // .max(new Date(), 'Date is not valid'),
    location: string()
      .required(t('Location is required'))
      .max(300, t('Location cannot be more than 300 characters')),
    country: string()
      .required(t('Country is required'))
      .max(100, t('Country cannot be more than 100 characters')),
    city: string()
      .required(t('City is required'))
      .max(100, t('City cannot be more than 100 characters')),
    website: string().url(t('Website Link must be a valid URL')),
    linkdin: string().url(t('Linkdin must be a valid URL')),
    facebook: string().url(t('Facebook must be a valid URL')),
    telegram: string().url(t('Telegram must be a valid URL')),
    twitter: string().url(t('Twitter must be a valid URL')),
    instagram: string().url(t('Instagram must be a valid URL')),
    freeTicket: string().url(t('Free ticket must be a valid URL')),
    applyTicket: string().url(t('Apply ticket must be a valid URL')),
    category: string().required(t('Category is required')),
    seoTitle: string()
      .required(t('Seo Title is required'))
      .max(100, t('Seo Title cannot be more than 100 characters')),
    seoDescription: string()
      .required(t('Meta Description is required'))
      .max(250, t('Meta Description cannot be more than 250 characters')),
    seoExcerpt: string()
      .required(t('Seo Excerpt is required'))
      .max(160, t('Seo Excerpt cannot be more than 160 characters')),
    seoSlug: string()
      .required(t('Slug is required'))
      .max(100, t('Slug cannot be more than 100 characters')),
  });

  async function getCategories() {
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    const resp = await entryActor.get_list_categories('', 0, 20, false);
    const categories = resp.entries;
    setCategories(categories);
  }
  const handleShowCropper = () => {
    setShowCropper(true);
  };
  const handleTagChange = (selectedOptions: any) => {
    if (typeof selectedOptions[selectedOptions.length - 1] == 'string') {
      selectedOptions.pop();
      setTags(selectedOptions);
    } else {
      setTags(selectedOptions);
    }
    logger(selectedOptions, 'selectedOptions');
    // const nonEmptyTags = selectedOptions.filter((tag:any) => tag !== '');
  };
  const handleHideCropper = () => {
    setShowCropper(false);
  };
  function handleFormReset() {
    resetImages();
    formikRef2?.current?.resetForm();
    setTags([]);
    setEventContent('');
  }
  const getEvent = async (eventId: string) => {
    const entryActor = makeEntryActor({
      agentOptions: {
        identity,
      },
    });
    if (eventId) {
      const tempEntry = await entryActor.get_event(eventId);

      if (tempEntry.length != 0) {
        let event = tempEntry[0];
        event.image = await getImage(event.image);
        // tempEntry[0].date = utcToLocal(
        //   tempEntry[0].date.toString(),
        //   'MMM D, YYYY'
        // );
        event.date = Number(event.date);

        event.endDate = Number(event.endDate);
        setLatLng({ lat: event.lat, lng: event.lng });
        setTags(
          event.tags.map((e: any, ind: any) => {
            return { customOption: true, label: e, id: `${ind}` };
          })
        );
        setEventContent(event.description);
        setFeaturedPreview(event.image);
        let imageId = getIdFromUrl(event.image);
        setFeaturedId(imageId);
        setEvent(event);

        logger(event, 'fdsgdsgsdfgdfg');
      } else {
        setEvent;
      }
    }
  };
  const featureUpload = async (
    imgUrl: string,
    imgName: string,
    pixels: any,
    rotation: number = 0
  ) => {
    const croppedImage = await getCroppedImg(imgUrl, imgName, pixels, rotation);
    if (!croppedImage) return;
    const resizedFile = await resizeImage(
      croppedImage,
      MAX_ARTICLE_FEATURED_SIZES.width,
      MAX_ARTICLE_FEATURED_SIZES.height
    );

    const newUrl = URL.createObjectURL(resizedFile);
    const _featuredId = await uploadImage(resizedFile);
    setFeaturedId(_featuredId);
    setFeaturedPreview(newUrl);
    setFeautredFile(resizedFile);
    handleHideCropper();
  };
  async function uploadEvent(values: FormikValues, resetForm: () => void) {
    try {
      let featuredImg = '';
      if (eventContent?.length <= 0) {
        return toast.error('You can not create an empty event');
      }
      if (FeaturedFile !== null || featuredId != undefined) {
        // featuredImg = await fileToCanisterBinaryStoreFormat(FeaturedFile);
        featuredImg = BASE_IMG_URL + featuredId;
      } else {
        return toast.error('Please select a Feautred Image.');
      }
      if (tags.length < 1) {
        return toast.error('Please select at least one Event Tag.');
      }
      if (tags.length > 5) {
        return toast.error("Tags can't be more five.");
      }
      setFormSubmiting(true);

      const date = new Date(values.date);
      const endDate = new Date(values.endDate);
      let unixStartDate = Math.floor(date.getTime());
      let unixEndDate = Math.floor(endDate.getTime());
      let month = date.getMonth();
      let event = {
        title: values.title,
        organiser: values.organiser,
        shortDescription: values.shortDescription,
        description: eventContent,
        image: featuredImg,
        date: unixStartDate,
        endDate: unixEndDate,
        month,
        location: values.location,
        country: values.country,
        city: values.city,
        website: values.website,
        category: [values.category],
        tags: tags.map((item: any) => item.label),
        linkdin: values.linkdin,
        seoTitle: values.seoTitle,
        seoDescription: values.seoDescription,
        seoExcerpt: values.seoExcerpt,
        seoSlug: values.seoSlug,
        facebook: values.facebook,
        instagram: values.instagram,
        telegram: values.telegram,
        twitter: values.twitter,
        freeTicket: values.freeTicket,
        applyTicket: values.applyTicket,
        lat: LatLng.lat,
        lng: LatLng.lng,
      };

      if (eventId) {
        const response = await defaultEntryActor.updateEvent(
          event,
          userCanisterId,
          commentCanisterId,
          eventId
        );
        if (response?.ok) {
          toast.success('Event edited successfully');
          window.scrollTo(0, 0);
          router.push('/super-admin/events');
          // await getCategories();
          // setCategories(response);
          logger(response, 'ADED');
          setFormSubmiting(false);
          // handleFormReset();
          // resetForm();
        } else {
          toast.error('Error while editing event');
          setFormSubmiting(false);
        }
      } else {
        const response = await defaultEntryActor.addEvent(
          event,
          userCanisterId,
          commentCanisterId
        );
        if (response?.ok) {
          toast.success('Event created successfully');
          window.scrollTo(0, 0);

          // await getCategories();
          // setCategories(response);
          router.push('/super-admin/events');
          logger(response, 'ADED');
          setFormSubmiting(false);
          handleFormReset();
          // resetForm();
        } else {
          toast.error('Error while creating event');
          setFormSubmiting(false);
        }
      }
    } catch (error) {
      logger(error);
      setFormSubmiting(false);
    }
  }
  const handleImageChageCommon = (e: any, imgName: string) => {
    const img = e.target.files[0];
    if (!img) return;

    const validType = isValidFileType(img && img.name.toLowerCase(), 'image');
    if (!validType) {
      toast.error(t('Not a valid image type'));
      return;
    }

    const imgUrl = URL.createObjectURL(img);
    switch (imgName) {
      case 'featured':
        setCropperImg({
          imgUrl,
          imgName: img.name,
          aspect: ARTICLE_FEATURED_IMAGE_ASPECT,
          callBack: featureUpload,
        });
        break;

      default:
        toast.error(t('Errorr while uploading media'));
        logger(
          t('Image name didn not match any of the provided cases please add a case if you want to use this function for more images')
        );
        break;
    }
    handleShowCropper();
    e.target.value = '';
  };

  const resetImages = () => {
    setFeautredFile(null);
    setLogoFile(null);
    setFeaturedPreview('');
    setLogoPreview('');
  };
  useEffect(() => {
    if (eventId) {
      logger(eventId, 'eventIdeventId');
      getEvent(eventId);
    }
  }, [eventId]);
  useEffect(() => {
    if (auth.state === 'initialized') {
      if (userAuth.userPerms?.articleManagement && !userAuth.isAdminBlocked) {
        getCategories();
      } else {
        router.replace('/super-admin');
      }
    } else if (auth.state === 'anonymous') {
      router.replace('/super-admin');
    }
  }, [userAuth, auth]);

  return (
    userAuth.userPerms?.articleManagement &&
    !userAuth.isAdminBlocked && (
      <>
        {cropperImg && (
          <ImageCropper
            show={showCropper}
            handleClose={handleHideCropper}
            cropperProps={cropperImg}
          />
        )}
        <main id='main' className='dark'>
          <div className='main-inner admin-main'>
            <div className='section admin-inner-pnl' id='top'>
              <Row>
                <Col xl='9' lg='12' className='text-left'>
                  <h1>
                    Event Management <i className='fa fa-arrow-right'></i>{' '}
                    <span>Add Event</span>
                  </h1>
                  <div className='spacer-20'></div>
                  {/* <h3 className='mb-4'>Add new Category</h3> */}
                  <Formik
                    initialValues={initialValues}
                    innerRef={formikRef2}
                    enableReinitialize
                    validationSchema={eventSchema}
                    onSubmit={async (values, { resetForm, setFieldValue }) => {
                      uploadEvent(values, resetForm);
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
                      isValid,
                      dirty,
                      validateForm,
                      /* and other goodies */
                    }) => (
                      <FormikForm onSubmit={handleSubmit}>
                        <ScrollToError />

                        <Row>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='title'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-3'>
                                  <Form.Label>Title</Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='title'
                                    placeholder='Enter event title'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='title'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='organiser'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-3'>
                                  <Form.Label>Organiser</Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='organiser'
                                    placeholder='Enter organiser name'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='organiser'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                          <div className='full-div my-3'>
                            <Form.Label>Event Description</Form.Label>

                            <Texteditor
                              initialValue={eventContent}
                              value={eventContent}
                              onChangefn={setEventContent}
                              
                            />
                          </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='shortDescription'>
                              {({ field, formProps }: any) => (
                                <Form.Group
                                  className='mb-3'
                                // controlId='formBasicEmail'
                                >
                                  <Form.Label>{t('Short description')}</Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='shortDescription'
                                    placeholder='Enter event Summary'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='shortDescription'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='7'>
                            <Field name='location'>
                              {({ field, formProps }: any) => (
                                <Form.Group
                                  className='mb-3'
                                // controlId='formBasicEmail'
                                >
                                  <Form.Label>Location</Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    // className='darkbr'
                                    // as={'textarea'}
                                    name='location'
                                    placeholder='Enter event Location'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='location'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='country'>
                              {({ field, formProps }: any) => (
                                <Form.Group
                                  className='mb-3'
                                // controlId='formBasicEmail'
                                >
                                  <Form.Label>Country</Form.Label>
                                  {/* <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='country'
                                    placeholder='Enter country name'
                                  /> */}
                                  <CountryDropdown
                                    value={field.value}
                                    onChange={(e) => {
                                      formikRef2?.current?.setFieldValue(
                                        'country',
                                        e
                                      );
                                    }}
                                    name='country'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='country'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='city'>
                              {({ field, formProps }: any) => (
                                <Form.Group
                                  className='mb-3'
                                // controlId='formBasicEmail'
                                >
                                  <Form.Label>City</Form.Label>
                                  {/* <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='city'
                                    placeholder='Enter city name'
                                  /> */}
                                  <RegionDropdown
                                    value={field.value}
                                    country={formikRef2?.current?.values.country}
                                    onChange={(e) => {
                                      formikRef2?.current?.setFieldValue(
                                        'city',
                                        e
                                      );
                                    }}
                                    name='city'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='city'
                                component='div'
                              />
                            </div>
                          </Col>
                          {/* <Col xl='7' lg='7' md='12'>
                            <div style={{ height: '400px', width: '430px' }}>
                              <MyComponent
                                setLatLng={setLatLng}
                                lat={LatLng.lat}
                                lng={LatLng.lng}
                              />
                            </div>
                          </Col> */}
                          <Col xl='7' lg='7' md='12'>
                            <Field name='date'>
                              {({ field, formProps }: any) => (
                                <Form.Group>
                                  <Form.Label>Event Date</Form.Label>
                                  <DateTimePicker
                                    className={'form-control picker-date'}
                                    onChange={(e) => {
                                      formikRef2?.current?.setFieldValue(
                                        'date',
                                        e
                                      );
                                    }}
                                    value={field.value}
                                    name='date'
                                    format={'y-MM-dd H:mm:ss '}
                                  />
                                  {/* <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='date'
                                    name='date'
                                    // max={new Date()}
                                    // max={new Date().toJSON().slice(0, 10)}
                                    placeholder='https://example.com'
                                  /> */}
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='date'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='endDate'>
                              {({ field, formProps }: any) => (
                                <Form.Group>
                                  <Form.Label>Event Ending Date</Form.Label>
                                  {/* <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='date'
                                    name='endDate'
                                    // max={new endDate()}
                                    // max={new endDate().toJSON().slice(0, 10)}
                                    placeholder='https://example.com'
                                  /> */}
                                  <DateTimePicker
                                    className={'form-control picker-date'}
                                    onChange={(e) => {
                                      formikRef2?.current?.setFieldValue(
                                        'endDate',
                                        e
                                      );
                                    }}
                                    value={field.value}
                                    name='endDate'
                                    format={'y-MM-dd H:mm:ss '}
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='endDate'
                                component='div'
                              />
                            </div>
                          </Col>
                          <div>
                            <div className='dropdown'></div>
                          </div>
                          <Col xl='7' lg='7' md='7'>
                            <Field name='category'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-3'>
                                  <Form.Label>Category</Form.Label>

                                  <Form.Select
                                    aria-label={t('all categories')}
                                    value={field.value}
                                    onChange={handleChange}
                                    className='category-select'
                                    name='category'
                                  >
                                    <option value=''>Select Category</option>

                                    {categories &&
                                      categories.map((category: any, index) => (
                                        <option value={category[0]} key={index}>
                                          {category[1].name}
                                        </option>
                                      ))}
                                  </Form.Select>
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='category'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='website'>
                              {({ field, formProps }: any) => (
                                <Form.Group
                                  className='mb-3'
                                // controlId='formBasicEmail'
                                >
                                  <Form.Label>Website</Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='website'
                                    placeholder='Enter Website Url'
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
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            <Field name='linkdin'>
                              {({ field, formProps }: any) => (
                                <Form.Group
                                  className='mb-3'
                                // controlId='formBasicEmail'
                                >
                                  <Form.Label>Linkdin</Form.Label>
                                  <Form.Control
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    type='text'
                                    name='linkdin'
                                    placeholder='Enter linkdin Url'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='linkdin'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            {' '}
                            <Field name='facebook'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-2'>
                                  <Form.Label>Facebook</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder={t('Enter Facebook Link here...')}
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    name='facebook'
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
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            {' '}
                            <Field name='telegram'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-2'>
                                  <Form.Label>Telegram</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder={t('Enter Telegram Link here...')}
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    name='telegram'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='telegram'
                                component='div'
                              />
                            </div>
                          </Col>
                          <Col xl='7' lg='7' md='12'>
                            {' '}
                            <Field name='twitter'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-2'>
                                  <Form.Label>Twitter</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder={t('Enter Twitter Link Here...')}
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    name='twitter'
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
                          </Col>{' '}
                          <Col xl='7' lg='7' md='12'>
                            {' '}
                            <Field name='instagram'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-2'>
                                  <Form.Label>Instagram</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder={t('Enter Instagarm Link Here...')}
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    name='instagram'
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
                          </Col>{' '}
                          <Col xl='7' lg='7' md='12'>
                            {' '}
                            <Field name='freeTicket'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-2'>
                                  <Form.Label>{t('Free Ticket')}</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder={t('Enter free ticket Link here...')}
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    name='freeTicket'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='freeTicket'
                                component='div'
                              />
                            </div>
                          </Col>{' '}
                          <Col xl='7' lg='7' md='12'>
                            {' '}
                            <Field name='applyTicket'>
                              {({ field, formProps }: any) => (
                                <Form.Group className='mb-2'>
                                  <Form.Label>Apply Ticket</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder='Enter apply ticket Link here...'
                                    value={field.value}
                                    onChange={handleChange}
                                    onInput={handleBlur}
                                    name='applyTicket'
                                  />
                                </Form.Group>
                              )}
                            </Field>
                            <div className='text-danger mt-2'>
                              <ErrorMessage
                                className='Mui-err'
                                name='applyTicket'
                                component='div'
                              />
                            </div>
                          </Col>{' '}
                          <Field name='seoTitle'>
                            {({ field, formProps }: any) => (
                              <Form.Group className='mb-2'>
                                <div className='flex-div-xs '>
                                  <Form.Label>SEO Title</Form.Label>
                                </div>
                                <Form.Control
                                  type='text'
                                  placeholder='Title'
                                  value={field.value}
                                  onChange={handleChange}
                                  onInput={handleBlur}
                                  name='seoTitle'
                                />
                              </Form.Group>
                            )}
                          </Field>
                          <div className='text-danger mb-2'>
                            <ErrorMessage
                              className='Mui-err'
                              name='seoTitle'
                              component='div'
                            />
                          </div>
                          <Field name='seoSlug'>
                            {({ field, formProps }: any) => (
                              <Form.Group className='mb-2'>
                                <div className='flex-div-xs'>
                                  <Form.Label>Slug</Form.Label>
                                </div>
                                <Form.Control
                                  type='text'
                                  placeholder='Enter slug for event'
                                  value={field.value}
                                  onChange={handleChange}
                                  onInput={handleBlur}
                                  name='seoSlug'
                                />
                              </Form.Group>
                            )}
                          </Field>
                          <div className='text-danger mb-2'>
                            <ErrorMessage
                              className='Mui-err'
                              name='seoSlug'
                              component='div'
                            />
                          </div>
                          <Field name='seoDescription'>
                            {({ field, formProps }: any) => (
                              <Form.Group className='mb-2'>
                                <Form.Label>Meta Description</Form.Label>
                                <Form.Control
                                  className='small'
                                  as='textarea'
                                  placeholder='Enter Meta Description for event'
                                  rows={3}
                                  value={field.value}
                                  onChange={handleChange}
                                  onInput={handleBlur}
                                  name='seoDescription'
                                />
                              </Form.Group>
                            )}
                          </Field>
                          <div className='text-danger mb-2'>
                            <ErrorMessage
                              className='Mui-err'
                              name='seoDescription'
                              component='div'
                            />
                          </div>
                          <Field name='seoExcerpt'>
                            {({ field, formProps }: any) => (
                              <Form.Group className='mb-2'>
                                <div className='flex-div-xs'>
                                  <Form.Label>Seo Excerpt</Form.Label>
                                </div>
                                <Form.Control
                                  type='text'
                                  placeholder='Enter Seo Excerpt for event'
                                  value={field.value}
                                  onChange={handleChange}
                                  onInput={handleBlur}
                                  name='seoExcerpt'
                                />
                              </Form.Group>
                            )}
                          </Field>
                          <div className='text-danger mb-2'>
                            <ErrorMessage
                              className='Mui-err'
                              name='seoExcerpt'
                              component='div'
                            />
                          </div>
                          <div className='mt-2 mb-3'>
                            <Form.Label>Event Tags</Form.Label>
                            <Typeahead
                              id='tagInput'
                              className='tagInput'
                              multiple
                              options={['']}
                              selected={tags}
                              onChange={handleTagChange}
                              placeholder='Enter tags...'
                              allowNew // Allow users to add new tags
                              newSelectionPrefix='Add new tag: '
                            // clearButton // Show a clear button
                            />
                          </div>
                          <Col xl='7' lg='7' md='7'>
                            <Form.Label>Featured Image</Form.Label>

                            <div className='d-flex flex-column align-items-center'>
                              {featuredPreview && (
                                <div
                                  style={{
                                    // height: '252px',
                                    maxWidth: '300px',
                                    width: '100%',
                                    position: 'relative',
                                    aspectRatio: ARTICLE_FEATURED_IMAGE_ASPECT,
                                    // overflow: 'hidden',
                                  }}
                                >
                                  <Image
                                    // fill={true}
                                    // style={{ maxHeight: '200px', maxWidth: '200px' }}

                                    fill={true}
                                    src={featuredPreview}
                                    alt='Banner'
                                  />
                                </div>
                              )}
                              <Form.Group
                                //  controlId='formFile'
                                className='mb-3'
                              >
                                {/* <Form.Label>Select Company Banner Image</Form.Label> */}
                                <div className='input-group d-flex justify-content-center'>
                                  <Form.Control
                                    id='previewweb3companyBannerImg'
                                    className='d-none'
                                    // onChange={handleCompanyBannerChange}
                                    onChange={(e) =>
                                      handleImageChageCommon(e, 'featured')
                                    }
                                    name='banner'
                                    type='file'
                                  />
                                  <Button
                                    style={{ background: '#0a58ca' }}
                                    type='button'
                                    className='input-group-text mt-2 rounded'
                                  >
                                    <i className='fa fa-upload me-1'></i>{' '}
                                    <label
                                      className='text-white'
                                      htmlFor='previewweb3companyBannerImg'
                                    >
                                      Select Event Featured Image
                                    </label>
                                  </Button>
                                </div>
                              </Form.Group>
                            </div>
                          </Col>
                          <Col xl='12' lg='12' md='12'>
                            <Form.Group
                              className='mb-3'
                            // controlId='formBasicPassword'
                            >
                              <div className='spacer-30'> </div>
                              <Button
                                className='reg-btn fill-not ble-brdr'
                                type='submit'
                                disabled={
                                  formSubmiting ||
                                  // !(isValid && dirty) ||
                                  // !FeaturedFile ||`
                                  isSubmitting
                                }
                              >
                                {formSubmiting ? (
                                  <Spinner size='sm' />
                                ) : eventId ? (
                                  'Edit Event'
                                ) : (
                                  'Add New Event'
                                )}
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className='spacer-20'> </div>
                      </FormikForm>
                    )}
                  </Formik>
                </Col>
              </Row>
              <div className='mt-4'></div>
              <div className='d-flex flex-row'>
                {/* <div className='d-flex justify-content-center flex-column border-1 '>
                  <Form.Label className='p-1'>Current Categories</Form.Label>
                  <div className='d-flex flex-wrap gap-3'>
                    {categories &&
                      categories.map((category: any, index) => (
                        <div
                          style={{
                            border: '1px #1e5fb3 solid ',
                            borderRadius: '15px',
                          }}
                          className='px-3 py-1'
                          key={category[0]}
                        >
                          <p className='m-0'>{category[1]?.name}</p>
                        </div>
                      ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  );
}
