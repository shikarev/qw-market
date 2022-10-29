import {
  Box,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper as MuiStepper,
  styled,
} from "@mui/material";
import { CheckLight } from "../../svgComponents/Icons/outlined/index";
import React from "react";
import styles from "./stepper.module.scss";

interface IOrderStepper {
  activeStepNum: number;
  stepsLabels: string[];
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 10px)",
    right: "calc(50% + 10px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      //color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
      backgroundColor: "currentColor",
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot
      ownerState={{ active }}
      className={className}
      sx={{
        backgroundColor: completed ? "primary.main" : "unset",
        borderRadius: "50%",
      }}
    >
      {completed ? (
        <Box sx={{ "& svg": { height: "10px", width: "22px" } }}>
          <CheckLight className={styles.completed} />
        </Box>
      ) : (
        <div className={styles.circle} />
      )}
    </QontoStepIconRoot>
  );
}

const OrderStepper = ({ stepsLabels, activeStepNum }: IOrderStepper) => {
  const Stepper = styled(MuiStepper)(() => ({
    padding: 0,
    justifyContent: "space-between",
    marginBottom: "4rem",
  }));

  return (
    <Stepper
      activeStep={activeStepNum}
      alternativeLabel
      connector={<QontoConnector />}
    >
      {stepsLabels.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStepper;
