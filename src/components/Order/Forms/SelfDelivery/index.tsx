import React, { useEffect } from "react";
import { useFormik } from "formik";
import classNames from "classnames/bind";
import styles from "./SelfDelivery.module.scss";
import { Button, Grid, styled, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  orderSelfForm,
  setCreationStep,
  setDisableNextButton,
  setSelfForm,
} from "../../../../store/order";
import * as Yup from "yup";
import { QCircularProgress } from "../../../common/Progress";

const cx = classNames.bind(styles);

const TextFields = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    borderRadius: "1.6rem",
    backgroundColor: "#F6F7FB",
    //color: "#f44336",
  },
  "& .MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
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

const SelfDeliveryForm = ({ hideSubmit, setShow }: any) => {
  const dispatch = useAppDispatch();
  const localFormData = useAppSelector(orderSelfForm);

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .min(10, "Адрес не может быть короче 10 символов (тест)")
      .required("Обязательное поле"),
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: localFormData || { address: "" },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      dispatch(setDisableNextButton(true));
      await sleep(500);

      try {
        dispatch(setSelfForm(values));
        //dispatch(setAllowNextStep(true));
        dispatch(setCreationStep(1));
        //dispatch(setDisableNextButton(false))
      } catch {
      } finally {
        //actions.setSubmitting(false);
        // close if modal or go next if steps
        if (setShow) {
          setShow(false);
        }
      }
    },
  });

  useEffect(() => {
    if (formik.isValid) {
      dispatch(setDisableNextButton(false));
      //dispatch(setAllowNextStep(true));
    } else {
      dispatch(setDisableNextButton(true));
      //dispatch(setAllowNextStep(false));
    }
  }, [formik.isValid]);

  return (
    <form
      id="order-creation"
      className={cx("root")}
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFields
            name="address"
            id="filled-basic"
            variant="filled"
            label="Выберите адрес:"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            fullWidth
            autoComplete="off"
            error={!!formik.errors.address && formik.touched.address}
            helperText={!!formik.errors.address && formik.errors.address}
          />
        </Grid>
      </Grid>
      {!hideSubmit && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="medium"
          className={cx("method")}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {" "}
          {formik.isSubmitting && <QCircularProgress size={24} />} Сохранить
        </Button>
      )}
    </form>
  );
};

export default SelfDeliveryForm;
