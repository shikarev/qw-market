import {useGetCategoryPathByCategoryIdQuery} from "../../../api/product";
import BreadCrumbs from "../BreadCrumbs";
import {ICategoryPath} from "../../../types/Product";


const ProductBreadCrumbs = ({categoryId}:{ categoryId:string }) => {

    const { data, error, isLoading } = useGetCategoryPathByCategoryIdQuery(categoryId);

    function generateBreadcrumbsLinks(data: ICategoryPath) {
        let result:any = [];
        result.push({id: data.id, name: data.name});
        if (data.sub_category) {
            result = result.concat(generateBreadcrumbsLinks(data.sub_category));
        }
        return result;
    }

    return (

        <>
            {data &&
                <BreadCrumbs links={[
                    {name: 'Каталог', url: '/catalog'},
                    ...generateBreadcrumbsLinks(data).map((item:ICategoryPath, index: number) =>
                    ({name: item.name, url: `/${index !== generateBreadcrumbsLinks(data).length -1 ?
                            `category/${item?.id}` : `subcategory/${item?.id}`}`})),
                ]}
                disableLast
                />
            }
        </>

    )
}

export default ProductBreadCrumbs;
