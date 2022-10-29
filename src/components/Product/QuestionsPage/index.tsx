import classNames from "classnames/bind";
import React from "react";
import { useParams } from "react-router-dom";
import { IQuestionsData } from "../../../types/Product";
import ProductQuestions from "../ProductQuestions";
import styles from "./QuestionsPage.module.scss";

const cx = classNames.bind(styles);

const QuestionsPage = ({
  questionsData,
  vendorId,
  pagination,
  pageCount,
  page,
}: IQuestionsData) => {
  const { id } = useParams();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("questions")}>
        {questionsData && (
          <ProductQuestions
            productQuestions={questionsData}
            pageCount={pageCount}
            pagination={pagination}
            page={page}
            productId={id}
            vendorId={vendorId}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
