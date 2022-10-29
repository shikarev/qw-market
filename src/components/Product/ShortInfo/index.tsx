import { Box, Typography } from "@mui/material";
import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import { IProductModOptions } from "../../../types/Product";
import ProductModOptions from "../ProductModOptions";
import styles from "./shortInfo.module.scss";
import { imageOnErrorHandler } from "../../../utils/imgError";
import placeholder from "../../../assets/placeHolders/noImagePlaceholder.svg";

const cx = classNames.bind(styles);

const ShortInfo = ({
  manufacturerName,
  manufacturerId,
  manufacturerLogo,
  shortInfo,
  modOptions,
  modStr,
}: any) => {
  let objModOptions = modOptions?.map((x: any) => x.id) || [0];

  return (
    <Box className={cx("wrapper")}>
      {modOptions &&
        modOptions.map((data: IProductModOptions) => (
          <ProductModOptions
            {...data}
            key={data.id}
            modStr={modStr || ""}
            objModOptions={objModOptions}
          />
        ))}

      <div className={cx("infoBody")}>
        {shortInfo && shortInfo.length > 0 && (
          <>
            <Typography className={cx("variant")}>Коротко о товаре</Typography>

            <Box
              component={"ul"}
              sx={{ margin: "1.6rem 0 1.6rem 1.6rem", fontSize: "1.6rem" }}
            >
              {shortInfo.map((data: any) => (
                <Box component={"li"} key={data.id}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "1.4rem",
                      lineHeight: "2.4rem",
                    }}
                  >
                    {data.name}: {data.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        <div className={cx("d-flex")}>
          <Link to={`/brands/id?id=${manufacturerId}`}>
            <Box className={cx("brandContainer")}>
              <Box className={cx("brandLogo")}>
                <img
                  className={cx("pic")}
                  src={manufacturerLogo || placeholder}
                  alt=""
                  onError={imageOnErrorHandler}
                />
              </Box>
              <Typography
                color="primary"
                sx={{
                  borderRadius: "2rem",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
              >
                Все товары бренда
              </Typography>
            </Box>
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default ShortInfo;
