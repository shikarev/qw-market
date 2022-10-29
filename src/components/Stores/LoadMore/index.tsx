import { useState } from "react";

const LoadMore = (numItem: any) => {
    const [numberItemsPagination, setNumberItemsPagination] = useState(numItem);

    const loadMoreItems = (arrayLength: number) => {
        const numberItems =
            numberItemsPagination + numItem < arrayLength
                ? numberItemsPagination + numItem
                : arrayLength;
        setNumberItemsPagination(numberItems);
    };

    const loadMoreReset = (initialNumberItemsPagination: any) => {
        setNumberItemsPagination(initialNumberItemsPagination);
    };

    return {
        numberItemsPagination,
        loadMoreItems,
        loadMoreReset
    };
};

export default LoadMore;
