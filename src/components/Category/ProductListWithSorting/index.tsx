import React, {useState} from 'react';
import DropDown from "../../common/DropDown";
import {handleUrlParam} from "../../../utils/utils";
import {useLocation} from "react-router-dom";
import {useGetProductsQuery} from "../../../api/product";
import {ISearchFilterField} from "../../../types/Filters";
import ProductGrid from "../../common/ProductGrid";

const dropConstants = [
    {
        value: 'rating|DESC',
        title: 'С наилучшим рейтингом'
    },
    {
        value: 'rating|ASC',
        title: 'С наихудшим рейтингом'
    },
    {
        value: 'cost|DESC',
        title: 'Самые дорогие'
    },
    {
        value: 'cost|ASC',
        title: 'Самые дешевые'
    },
]

interface IProductListWithSorting {
    filters?: ISearchFilterField[];
    categoryId?: string;
    manufacturerId?: string;
}

const ProductListWithSorting = (props: IProductListWithSorting) => {
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    const page = params.get("page") || '1';

    const [pagination, setPagination] = useState(page)

    const [sort, setSort] = useState(params.get('sort') || undefined)
    const [sortType, setSortType] = useState(params.get('sortType') || undefined)

    const {data: products, isLoading: productsLoading} = useGetProductsQuery({
        manufacturer: props.manufacturerId,
        catId: props.categoryId,
        page: parseInt(pagination),
        filter_option: (props.filters && props.filters.length > 0) ? props.filters : undefined,
        sort,
        sortType,
    })

    function handleSort(value: string) {
        const newSort = value.split('|')[0]
        const newSortType = value.split('|')[1]
        setSort(newSort);
        setSortType(newSortType);
        handleUrlParam('sort', newSort)
        handleUrlParam('sortType', newSortType)
    }

    function setPage (newPage: number){
        handleUrlParam('page', newPage.toString());
        setPagination(newPage.toString());
    }

    return (
        <div style={{width: '100%'}}>
            <DropDown values={dropConstants} onChange={handleSort}/>
            <ProductGrid
                loading={productsLoading}
                productsData={products?.data}
                page={parseInt(page)}
                total={products?.total}
                handlePagination={setPage}
            />
        </div>
    );
};

export default ProductListWithSorting;