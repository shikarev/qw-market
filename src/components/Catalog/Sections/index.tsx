import Category from '../Category';
import styles from './sections.module.scss';
import classNames from 'classnames/bind';
import { useGetCategoryQuery} from '../../../api/categories';
import { Skeleton, Typography } from '@mui/material';
import {  ISection } from '../../../types/Catalog';
import { ISectionColumn } from '../../../types/Catalog';

const cx = classNames.bind(styles)

const SectionsColumns = ({ data, onCategorySelect, onSubCategorySelect, small }: ISectionColumn) => {
    if (!data || data.length <= 0) {
        return (
            <div className={cx('categories')}>
                <Typography>Здесь пока ничего нет...</Typography>
            </div>
        )
    }

    return (
        <div className={cx('categories')}>
            {data.map((item) =>
                <Category
                    key={item.id}
                    name={item.name}
                    small={small}
                    items={item.sub_categories || []}
                    path={item.id}
                    onCategorySelect={onCategorySelect}
                    onSubCategorySelect={onSubCategorySelect}
                />
            )}
        </div>
    )
}

const Sections = ({ sectionId, onCategorySelect, onSubCategorySelect, small }: ISection) => {
    const { data, error, isLoading } = useGetCategoryQuery({categoryId: sectionId}, { skip: !sectionId })

    return (
        error ? <Typography>возникла ошибка</Typography> :
            isLoading ?
                <div className={cx('skeletons')} >
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
                :
                data ? <SectionsColumns small={small} data={data.sub_categories || []} onCategorySelect={onCategorySelect} onSubCategorySelect={onSubCategorySelect} />
                    :
                    null
    )
}

export default Sections;