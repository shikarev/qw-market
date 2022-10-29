import { useEffect, useState } from "react";
import { ICatalogCategory } from "../../../types/Catalog";
import CatalogSelector from "../../Selector/Selector";

const Selector = ({data, onChange, loading, selectOnLoad = true, selectedCategory, title}:{title?: string, data?: ICatalogCategory[], onChange: (id:string)=> void, selectOnLoad?: boolean, loading?: boolean, selectedCategory?: string}) => {
    const [categoryId, setCategoryId] = useState(selectedCategory || '')

    useEffect(() => {
        if(selectOnLoad) {
            if (data && data.length > 0) {
                select(data[0].id || '')
            }
        }
        //eslint-disable-next-line
    },[])

    function select(id: string) {
        setCategoryId(id)
        onChange(id)
    }

    return <CatalogSelector title={title} loading={loading} size={100} data={data} onChange={select} current={categoryId}/>
}

export default Selector
