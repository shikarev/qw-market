import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import classNames from "classnames/bind";
import styles from "./Courier.module.scss";
import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearCourierForm,
  getSelectedAddressId,
  orderCourierForm,
  setAllowNextStep,
  setCourierForm,
  setCreationStep,
  setDisableNextButton,
  setSelectedAddressId,
  setSubmitting,
} from "../../../../store/order";
import * as Yup from "yup";
import { QCircularProgress } from "../../../common/Progress";
import {
  useAddLocationMutation,
  useAddUserAddressMutation,
  useDeleteUserAddressMutation,
  useGetUserAddressesQuery,
} from "../../../../api/address";
import { OrderCard } from "../PaymentMethod";
import { Home } from "../../../svgComponents/Icons/outlined";

const cx = classNames.bind(styles);

const TextFields = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    borderRadius: "1.6rem",
    backgroundColor: "#F6F7FB",
  },
  "& .MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
    color: "#f44336",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#f44336",
  },
  "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
    border: "none",
  },
  "& .MuiFilledInput-underline:before": {
    border: "none",
  },
  "& .MuiFilledInput-underline:after": {
    border: "none",
  },
}));

const CourierForm = ({
  hideSubmit,
  setShow,
  isCardsEmpty,
  formTitle,
  handleClose,
}: any) => {
  const dispatch = useAppDispatch();
  const localFormData = useAppSelector(orderCourierForm);
  const [addLocation] = useAddLocationMutation();
  const [adduserAddress] = useAddUserAddressMutation();

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Обязательное поле"),
    apart: Yup.string().required("Обязательное поле"),
    floor: Yup.string().required("Обязательное поле"),
    entrance: Yup.string().required("Обязательное поле"),
  });

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: localFormData || {
      address: "",
      apart: "",
      floor: "",
      entrance: "",
      comment: "",
      code: "",
    },
    onSubmit: async (values) => {
      dispatch(setSubmitting(true));
      try {
        dispatch(setCourierForm(values));
        addLocation({
          name: values.address,
          description: values.comment,
          room: values.apart,
          floor: values.floor,
          entrance: values.entrance,
          note: values.code,
        }).then((r) => {
          //@ts-ignore
          if (r?.data?.id) {
            //@ts-ignore
            adduserAddress(r.data.id).then((r) => {
              //@ts-ignore
              if (r.data) {
                if (isCardsEmpty) {
                  dispatch(setCreationStep(1));
                }
                dispatch(setAllowNextStep(true));
                //@ts-ignore
                dispatch(setSelectedAddressId(r.data.id));
                //@ts-ignore
                handleClose(r.data.id);
              }
            });
          }
        });
      } catch {
        dispatch(setAllowNextStep(false));
        dispatch(setSubmitting(false));
      } finally {
        // close if modal or go next if steps
        if (setShow) {
          setShow(false);
        }
        dispatch(setSubmitting(false));
        //actions.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.isValid) {
      dispatch(setDisableNextButton(false));
    } else {
      dispatch(setDisableNextButton(true));
    }
  }, [formik.isValid]);

  return (
    <form
      id="order-creation"
      className={cx("root")}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h2" sx={{ mb: "2rem" }}>
        {formTitle}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFields
            name="address"
            id="filled-basic"
            variant="filled"
            label="Адрес"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.address && formik.touched.address}
            helperText={!!formik.errors.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            name="apart"
            id="filled-basic"
            variant="filled"
            label="Квартира"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apart}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.apart && formik.touched.apart}
            helperText={!!formik.errors.apart && formik.errors.apart}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            name="floor"
            id="filled-basic"
            variant="filled"
            label="Этаж"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.floor}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.floor && formik.touched.floor}
            helperText={!!formik.errors.floor && formik.errors.floor}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            name="entrance"
            id="filled-basic"
            variant="filled"
            label="Подъезд"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.entrance}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.entrance && formik.touched.entrance}
            helperText={!!formik.errors.entrance && formik.errors.entrance}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            name="code"
            id="filled-basic"
            variant="filled"
            label="Домофон"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.code && formik.touched.code}
            helperText={!!formik.errors.code && formik.errors.code}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFields
            name="comment"
            id="filled-basic"
            variant="filled"
            label="Комментарий к заказу"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            fullWidth
            multiline
            rows={4}
            autoComplete="off"
            error={!!formik.errors.comment && formik.touched.comment}
            helperText={!!formik.errors.comment && formik.errors.comment}
          />
        </Grid>
      </Grid>
      {!hideSubmit && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="medium"
          className={cx("submit_button")}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {" "}
          {formik.isSubmitting && <QCircularProgress size={24} />} Сохранить
        </Button>
      )}
    </form>
  );
};

const AddressesCards = ({ setIsNewAddress, disableEdit }: any) => {
  const { data: addressesData, error: addressesError } =
    useGetUserAddressesQuery({});
  const [deleteAddress] = useDeleteUserAddressMutation();
  const dispatch = useAppDispatch();
  const selectedAddressId = useAppSelector(getSelectedAddressId);

  useEffect(() => {
    if (addressesData && addressesData.data.length > 0) {
      setIsNewAddress(false);
      if (selectedAddressId) {
        const find = addressesData.data.find(
          (address: any) => address.id === selectedAddressId
        );
        if (!find) {
          dispatch(setSelectedAddressId(undefined));
        }
      }
    } else {
      setIsNewAddress(true);
    }
  }, [addressesData]);

  useEffect(() => {
    if (selectedAddressId) {
      dispatch(setAllowNextStep(true));
      dispatch(setDisableNextButton(false));
    } else {
      dispatch(setAllowNextStep(false));
      dispatch(setDisableNextButton(true));
    }
  }, [selectedAddressId]);

  function selectAddress(id: string) {
    dispatch(setSelectedAddressId(id));
  }

  function handleDelete(id: string) {
    deleteAddress(id);
    dispatch(setSelectedAddressId(undefined));
  }

  function handleNewAddress() {
    dispatch(clearCourierForm());
    dispatch(setSelectedAddressId(undefined));
    dispatch(setAllowNextStep(false));
    setIsNewAddress(true);
  }

  return (
    <>
      <div className={cx("form-header")}>
        <Typography variant="h2">Выберите адрес</Typography>
        <Button
          variant="text"
          sx={{
            color: "#D34650",
            fontSize: "16px",
            fontWeight: 600,
            p: "1rem",
          }}
          onClick={() => handleNewAddress()}
        >
          Добавить новый
        </Button>
      </div>
      <div className={cx("cards_content")}>
        <Grid container spacing={2} alignContent="center" alignItems="center">
          {addressesData &&
            addressesData.data.map((item: any) => (
              <Grid
                key={item.id}
                item
                xs={12}
                md={6}
                onClick={() => selectAddress(item.id)}
              >
                <OrderCard
                  selected={selectedAddressId === item.id}
                  icon={<Home style={{ stroke: "black" }} />}
                  title={`${item.address.name} кв. ${item.address.room}`}
                  deleteCard={(e: Event) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  disableEdit={disableEdit}
                >
                  <Typography variant="h6">{`Подъезд ${item.address.entrance}, Этаж ${item.address.floor}`}</Typography>
                </OrderCard>
              </Grid>
            ))}
          {addressesError && (
            <Grid item xs={12}>
              <Typography>Возникла непредвиденная ошибка!</Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

const CourierStep = ({ setShow, hideSubmit }: any) => {
  const { data: addressesData } = useGetUserAddressesQuery({});
  const [isEdit, setIsEdit] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const selectedAddressId = useAppSelector(getSelectedAddressId);
  const [prevAddressId] = useState<string>();

  const dispatch = useAppDispatch();

  function handleClose(newId?: string) {
    if (setShow) {
      setShow(false);
    }
    if (isNewAddress) {
      setIsNewAddress(false);
    }
    if (isEdit) {
      setIsEdit(false);
    }
    if (!selectedAddressId && prevAddressId) {
      dispatch(setSelectedAddressId(newId || prevAddressId));
    }
  }

  useEffect(() => {
    if (addressesData && addressesData.data.length > 0) {
      setIsNewAddress(false);
      if (!selectedAddressId) {
        dispatch(setSelectedAddressId(addressesData.data[0].id));
      }
    } else {
      setIsNewAddress(true);
    }
  }, [addressesData]);

  return (
    <>
      {!addressesData ? (
        <div>
          <QCircularProgress />
        </div>
      ) : (
        <>
          {!isEdit && !isNewAddress && (
            <AddressesCards
              setIsNewAddress={setIsNewAddress}
              setIsEdit={setIsEdit}
            />
          )}
          {isNewAddress && (
            <CourierForm
              hideSubmit={hideSubmit}
              setShow={setShow}
              formTitle="Добавить новый адрес"
              handleClose={handleClose}
              isCardsEmpty={addressesData.data.length === 0}
            />
          )}
          {isEdit && (
            <CourierForm
              hideSubmit={hideSubmit}
              setShow={setShow}
              formTitle="Редактировать адрес"
              handleClose={handleClose}
              isCardsEmpty={addressesData.data.length === 0}
            />
          )}
          {!hideSubmit && !isNewAddress && !isEdit && (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="medium"
                  className={cx("button")}
                  onClick={() => setShow()}
                >
                  Сохранить
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  className={cx("button")}
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={() => setShow()}
                >
                  Отменить
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default CourierStep;
