import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import classNames from "classnames/bind";
import styles from "./Recipient.module.scss";
import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import {
  clearRecipientForm,
  getRecipientToEditId,
  orderRecipientForm,
  selectedRecipientId,
  setAllowNextStep,
  setCreationStep,
  setDisableNextButton,
  setRecipientForm,
  setRecipientToEditId,
  setSelectedRecipientId,
  setSubmitSuccess,
  setSubmitting,
} from "../../../../store/order";
import * as Yup from "yup";
import {
  useAddRecipientMutation,
  useDeleteRecipientMutation,
  useGetRecipientsQuery,
  useUpdateRecipientMutation,
} from "../../../../api/orders";

import { QCircularProgress } from "../../../common/Progress";
import { OrderCard } from "../PaymentMethod";
import { ProfileIcon } from "../../../svgComponents/Icons";

const cx = classNames.bind(styles);

const TextFields = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    borderRadius: "1.6rem",
    backgroundColor: "#F6F7FB",
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

function RecipientForm({
  hideSubmit,
  totalRecipientsCount,
  handleClose,
  formTitle,
  isNewRecipient,
}: any) {
  const recipientFormData = useAppSelector(orderRecipientForm);
  const recipientToEditId = useAppSelector(getRecipientToEditId);
  const dispatch = useAppDispatch();
  const [addRecipient, { isLoading: isUpdating, error }] =
    useAddRecipientMutation();
  const [updateRecipient] = useUpdateRecipientMutation();

  function newRecipient(values: any) {
    dispatch(setRecipientForm(values));
    addRecipient(values)
      .unwrap()
      .then((r) => {
        if (totalRecipientsCount) {
          dispatch(setCreationStep(2));
        } else {
          dispatch(setAllowNextStep(true));
          dispatch(setDisableNextButton(false));
        }
        if (r.id) {
          dispatch(setSelectedRecipientId(r.id));
          handleClose(r.id);
        }
      })
      .catch((e) => {
        alert(JSON.stringify(e, null, 4));
        dispatch(setSubmitSuccess(false));
      })
      .finally(() => {
        dispatch(setSubmitting(false));
      });
  }

  function editRecipient(values: any) {
    if (recipientToEditId) {
      updateRecipient({ id: recipientToEditId, body: values })
        .unwrap()
        .then((r) => {
          dispatch(setAllowNextStep(true));
          dispatch(setDisableNextButton(false));
          dispatch(setSubmitting(false));
          handleClose();
        });
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    email: Yup.string().email("Неверный формат").required("Обязательное поле"),
    phone: Yup.string().required("Обязательное поле"),
  });

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: recipientFormData || {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, actions) => {
      dispatch(setSubmitting(true));
      if (isNewRecipient) {
        newRecipient(values);
      } else {
        editRecipient(values);
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
      <Typography variant="h2">{formTitle}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFields
            name="name"
            id="filled-basic"
            variant="filled"
            label="Имя и Фамилия"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.name && formik.touched.name}
            helperText={!!formik.errors.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            name="email"
            id="filled-basic"
            variant="filled"
            label="E-mail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.email && formik.touched.email}
            helperText={!!formik.errors.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            name="phone"
            id="filled-basic"
            variant="filled"
            label="Номер"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.phone && formik.touched.phone}
            helperText={!!formik.errors.phone && formik.errors.phone}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="primary">
              Возникла непредвиденная ошибка
            </Typography>
          </Grid>
        )}
        {!hideSubmit && (
          <>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="medium"
                className={cx("button")}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting && <QCircularProgress size={24} />}
                Сохранить
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={cx("button")}
                variant="outlined"
                color="secondary"
                size="medium"
                onClick={() => handleClose()}
              >
                Отменить
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
}

function RecipientsCards({
  disableEdit,
  setIsEdit,
  setIsNewRecipient,
  setPrevRecipientId,
}: any) {
  const {
    data: recipientsData,
    isLoading: recipientsFetching,
    error: recipientsError,
  } = useGetRecipientsQuery();
  const [deleteRecipient, { isLoading: isDeleting }] =
    useDeleteRecipientMutation();
  const getSelectedRecipientId = useAppSelector(selectedRecipientId);

  const dispatch = useAppDispatch();

  function selectRecipient(recipientId: string) {
    dispatch(setSelectedRecipientId(recipientId));
    setIsNewRecipient(false);
  }

  function handleNewRecipient() {
    setIsNewRecipient(true);
    dispatch(clearRecipientForm());
    dispatch(setSelectedRecipientId(undefined));
    dispatch(setAllowNextStep(false));
  }

  function handleEdit(recipientId: string) {
    const recipientToEdit = recipientsData.data.find(
      (recipient: any) => recipient.id === recipientId
    );
    dispatch(setRecipientForm({ ...recipientToEdit }));
    dispatch(setRecipientToEditId(recipientId));
    dispatch(setAllowNextStep(false));
    setIsEdit(true);
  }

  function handleDelete(id: string) {
    if (recipientsData.data.length === 1) {
      setIsNewRecipient(true);
    }

    deleteRecipient(id).then((r: any) => {
      if (r.error) {
        dispatch(setSelectedRecipientId(undefined));
      }

      if (id === getSelectedRecipientId) {
        dispatch(setSelectedRecipientId(undefined));
        dispatch(setAllowNextStep(false));
      }
      dispatch(clearRecipientForm());
    });
  }

  useEffect(() => {
    if (recipientsData && recipientsData.data.length > 0) {
      setIsNewRecipient(false);
      if (!getSelectedRecipientId) {
        dispatch(setSelectedRecipientId(recipientsData.data[0].id));
      }
    } else {
      setIsNewRecipient(true);
    }
  }, [recipientsData]);

  useEffect(() => {
    if (getSelectedRecipientId) {
      dispatch(setAllowNextStep(true));
      dispatch(setDisableNextButton(false));
    } else {
      dispatch(setAllowNextStep(false));
      dispatch(setDisableNextButton(true));
    }
  }, [getSelectedRecipientId]);

  useEffect(() => {
    if (getSelectedRecipientId) {
      setPrevRecipientId(getSelectedRecipientId);
    }
  }, [getSelectedRecipientId]);

  return (
    <>
      {recipientsData && recipientsData.data.length > 0 && (
        <>
          <div className={cx("form-header")}>
            <Typography variant="h2">Выберите получателя</Typography>
            <Typography
              sx={{
                color: "#D34650",
                fontWeight: 600,
                marginBottom: "4rem",
                cursor: "pointer",
              }}
              onClick={() => handleNewRecipient()}
            >
              Добавить нового
            </Typography>
          </div>
          <div className={cx("cards_content")}>
            <Grid
              container
              spacing={2}
              alignContent="center"
              alignItems="center"
            >
              {recipientsData &&
                recipientsData.data.map((item: any) => (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    md={6}
                    onClick={() => selectRecipient(item.id)}
                  >
                    <OrderCard
                      selected={getSelectedRecipientId === item.id}
                      icon={<ProfileIcon style={{ stroke: "black" }} />}
                      title={item.name}
                      deleteCard={(e: Event) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      editCard={(e: Event) => {
                        e.stopPropagation();
                        handleEdit(item.id);
                      }}
                      disableEdit={disableEdit}
                    >
                      <Typography variant="h6">{item.email}</Typography>
                      <Typography variant="h6">{item.phone}</Typography>
                    </OrderCard>
                  </Grid>
                ))}
              {recipientsError && (
                <Grid item xs={12}>
                  <Typography>Возникла непредвиденная ошибка!</Typography>
                </Grid>
              )}
            </Grid>
          </div>
        </>
      )}
    </>
  );
}

function RecipientStep({ setShow, hideSubmit }: any) {
  const { data: recipientsData } = useGetRecipientsQuery();
  const [isNewRecipient, setIsNewRecipient] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [prevRecipientId, setPrevRecipientId] = useState<string>();
  const getSelectedRecipientId = useAppSelector(selectedRecipientId);

  const dispatch = useAppDispatch();

  function handleClose(newId?: string) {
    if (setShow) {
      setShow(false);
    }
    if (isNewRecipient) {
      setIsNewRecipient(false);
    }
    if (isEdit) {
      setIsEdit(false);
    }
    if (!getSelectedRecipientId && prevRecipientId) {
      dispatch(setSelectedRecipientId(newId || prevRecipientId));
    }
  }

  return (
    <div className={cx("cards_root")}>
      {!recipientsData ? (
        <div className={cx("loading")}>
          <QCircularProgress />
        </div>
      ) : (
        <>
          {!isEdit && !isNewRecipient && (
            <RecipientsCards
              setIsEdit={setIsEdit}
              setIsNewRecipient={setIsNewRecipient}
              setPrevRecipientId={setPrevRecipientId}
              disableEdit={isNewRecipient}
            />
          )}
          {isNewRecipient && (
            <RecipientForm
              formTitle="Добавить получателя"
              handleClose={handleClose}
              hideSubmit={hideSubmit}
              isNewRecipient={isNewRecipient}
              totalRecipientsCount={recipientsData.data.length === 0}
            />
          )}
          {isEdit && (
            <RecipientForm
              formTitle="Редактировать получателя"
              handleClose={handleClose}
              hideSubmit={hideSubmit}
              isNewRecipient={isNewRecipient}
              totalRecipientsCount={recipientsData.data.length === 0}
            />
          )}
          {!hideSubmit && !isNewRecipient && !isEdit && (
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
    </div>
  );
}

export default RecipientStep;
