import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./DeliveryForms.module.scss";
import { QToggleButtonGroup } from "../../../common/Buttons/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deliveryType } from "../../../../types/Order";
import {
  orderDeliveryType,
  setAllowNextStep,
  setDeliveryType,
} from "../../../../store/order";
import { QFormToggleButton } from "../../../common/Buttons/ToggleButtons";
import { Home, Location } from "../../../svgComponents/Icons/outlined";
import CourierStep from "../Courier";
import SelfDeliveryForm from "../SelfDelivery";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

function DeliveryStep({ setShow, hideSubmit }: any) {
  const selectedDeliveryType = useAppSelector(orderDeliveryType);
  const dispatch = useAppDispatch();

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    newType: deliveryType
  ) => {
    if (newType !== null) {
      dispatch(setDeliveryType(newType));
    }
  };

  useEffect(() => {
    if (!selectedDeliveryType) {
      dispatch(setDeliveryType(deliveryType.self));
    } else {
      dispatch(setAllowNextStep(true));
    }
  }, [selectedDeliveryType]);

  return (
    <div className={cx("root")}>
      <QToggleButtonGroup
        className={cx("method")}
        key="toggle_1"
        value={selectedDeliveryType}
        exclusive
        onChange={handleSelect}
        aria-label="text alignment"
      >
        <QFormToggleButton value={deliveryType.self}>
          <Location />
          <Typography>Самовывоз</Typography>
        </QFormToggleButton>
        <QFormToggleButton value={deliveryType.courier}>
          <Home />
          <Typography>Курьер</Typography>
        </QFormToggleButton>
      </QToggleButtonGroup>
      {selectedDeliveryType === deliveryType.self && (
        <SelfDeliveryForm hideSubmit={hideSubmit} setShow={setShow} />
      )}
      {selectedDeliveryType === deliveryType.courier && (
        <CourierStep hideSubmit={hideSubmit} setShow={setShow} />
      )}
    </div>
  );
}

export default DeliveryStep;
