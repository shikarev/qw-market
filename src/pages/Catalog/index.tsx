import { useNavigate } from 'react-router-dom';
import styles from './catalog.module.scss';
import classNames from 'classnames/bind';
import { Skeleton, Typography } from '@mui/material';
import Selector from '../../components/Catalog/Selector';
import OffersBlock from '../../components/Catalog/OffersBlock';
import Sections from '../../components/Catalog/Sections';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../api/categories';
import { ICatalogCategory } from '../../types/Catalog';
import BreadCrumbs from '../../components/common/BreadCrumbs';

const cx = classNames.bind(styles)

const CatalogPage = () => {
    const {data, isLoading, error} = useGetCategoriesQuery();
    const [currentSection, setCurrentSection] = useState<any>({});
    const [sectionName, setSectionName] = useState('');
    const navigate = useNavigate();

    function setSection(id:string) {
        if(data){
            const sectionData = data.find((cat:ICatalogCategory) => cat.id === id)
            if(sectionData){
                setCurrentSection(sectionData)
                setSectionName(sectionData.name || 'Каталог')          
            }
        }
    }

    function onSubCategoryClicked (id: string, parent_id: string){
        const sub = currentSection.sub_categories.find((cat:ICatalogCategory) => cat.id === parent_id)
        if(sub){
            const subsub = sub.sub_categories.find((cat:ICatalogCategory) => cat.id === id)
            if(subsub && subsub.sub_categories){
              navigate(`/category/${id}`)
            } else {
              navigate(`/subcategory/${id}`)
            }
        }
    }

    function onCategoryClicked (id:string) {
        if(data){
            const parentId = data.find((cat:ICatalogCategory) => cat.id === currentSection.id)
            if(parentId){
                if(parentId.sub_categories){
                    const sub = parentId.sub_categories.find((cat:ICatalogCategory) => cat.id === id)
                    if(sub && sub.sub_categories){
                      navigate(`/category/${id}`)
                    } else {
                      navigate(`/subcategory/${id}`)
                    }
                } 
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            {isLoading && 
            <>
                <Skeleton variant='rectangular' width='20%' height={20} style={{marginBottom:'1rem'}}/>
                <Skeleton variant='rectangular' width='30%' height={40} style={{marginBottom:'7.6rem'}}/>
                <Skeleton variant='rectangular' width='70%' height={150}/>
            </>
            }
            {error &&
                <Typography>Ошибка загрузки категорий</Typography>
            }
            {data && 
                <>
                    <BreadCrumbs activeSection={[currentSection]}/>
                    <div className={cx('select_wrapper')}>
                        <Selector title='Каталог' data={data} onChange={setSection}/>
                    </div>
                    <h3>{sectionName}</h3>
                    <section className={cx('content')}>
                    <div className={cx('sections')}>
                        <Sections 
                            sectionId={currentSection.id}
                            onCategorySelect={onCategoryClicked}
                            onSubCategorySelect={onSubCategoryClicked}
                        />
                        </div>
                        <div className={cx('offers')}>
                            <OffersBlock brands/> 
                        </div>
                    </section>
                </>
            }
        </div>
    )
}

export default CatalogPage;
