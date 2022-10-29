import { Button, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import classNames from "classnames/bind";
import React, { useEffect } from "react";
// import {ArrowBack} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getAllowNextStep,
  getCreationStep,
  getDisableNextButton,
  getIsSubmitting,
  setCreationStep,
  setOrderStatus,
} from "../../../store/order";

import { QCircularProgress } from "../../common/Progress";
import CartPreview from "../CartPreview";
import DeliveryStep from "../Forms/Delivery";
import PaymentSteps from "../Forms/PaymentMethod";
import RecipientStep from "../Forms/Recipient";
import OrderStepper from "../Stepper";
import styles from "./OrderCreate.module.scss";
import { BackArrow } from "../../svgComponents/Icons/outlined";

const cx = classNames.bind(styles);

const creationStepsNames = ["Куда доставить", "Получатель", "Способ оплаты"];

enum CreationSteps {
  "delivery",
  "recipient",
  "payment",
}

function OrderCreate() {
  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const allowNextStep = useAppSelector(getAllowNextStep);
  const isSubmitting = useAppSelector(getIsSubmitting);
  const currentStep = useAppSelector(getCreationStep);
  const isDisableNextButton = useAppSelector(getDisableNextButton);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderForms: { [step: number]: JSX.Element } = {
    [CreationSteps.delivery]: <DeliveryStep hideSubmit />,
    [CreationSteps.recipient]: <RecipientStep hideSubmit />,
    [CreationSteps.payment]: <PaymentSteps hideSubmit />,
  };

  useEffect(() => {
    if (currentStep && currentStep > 2) {
      dispatch(setOrderStatus(1));
      dispatch(setCreationStep(0));
    }
  }, [currentStep]);

  function handleNext() {
    if (allowNextStep) {
      dispatch(setCreationStep(currentStep + 1));
    }
  }

  function handleBack() {
    if (currentStep > CreationSteps.delivery) {
      dispatch(setCreationStep(currentStep - 1));
    } else {
      navigate(-1);
    }
  }

  return (
    <div className={cx("root")}>
      <Typography variant="h1">Оформление заказа</Typography>
      <Grid container spacing={4}>
        <Grid className={cx("forms")} item xs={12} sm={12} md={8}>
          <OrderStepper
            stepsLabels={creationStepsNames}
            activeStepNum={currentStep}
          />
          {orderForms[currentStep]}
          <div className={styles.controls}>
            <Button
              variant="text"
              color="primary"
              size="medium"
              sx={{ "& .MuiButton-startIcon": { mr: "20px" } }}
              onClick={() => handleBack()}
              startIcon={<BackArrow />}
            >
              Назад
            </Button>
            {currentStep < CreationSteps.payment ? (
              <Button
                form="order-creation"
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                disabled={isSubmitting || isDisableNextButton}
                onClick={() => handleNext()}
              >
                {isSubmitting && <QCircularProgress />}
                Продолжить
              </Button>
            ) : (
              <Button
                form="order-creation"
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                disabled={isSubmitting || isDisableNextButton}
                onClick={() => handleNext()}
              >
                Продолжить
              </Button>
            )}
          </div>
        </Grid>
        {!isMobileScreen && (
          <Grid item xs={12} sm={12} md={4}>
            {currentStep !== CreationSteps.delivery ? (
              <CartPreview hideButton handleOrder={() => {}} />
            ) : (
              <YMaps>
                <Map
                  className={styles.map}
                  defaultState={{ center: [55.75, 37.57], zoom: 11 }}
                >
                  <Placemark
                    geometry={[55.754758, 37.578521]}
                    options={{
                      preset: "islands#redCircleDotIcon",
                    }}
                  />
                </Map>
              </YMaps>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default OrderCreate;
