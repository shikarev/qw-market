import { useState } from "react";
import styles from './category.module.scss';
import { ReactComponent as Arrow } from '../../../assets/Icons/arrow-down.svg?svgr';
import { generateKey } from "../../../utils/utils";
import classNames from 'classnames/bind';
import { ISubCategory } from "../../../types/Catalog";
import { ICategory } from '../../../types/Catalog';
import { Box, Typography } from '@mui/material';

const cx = classNames.bind(styles)

const SubCategory = ({name, onSubCategorySelect}:ISubCategory) => {
    return <Typography onClick={onSubCategorySelect} className={cx('pointer')}>{name}</Typography>
}

const Category = ({name, path, items, onCategorySelect, onSubCategorySelect, small}:ICategory) => {
    const [expanded, setExpanded] = useState(false)

    function expandSwitch(){
        setExpanded(!expanded)
    }

    function onClick (id:string) {    
        onCategorySelect(id)
    }

    function subCategoryClick(id: string, parent_id: string){
        onSubCategorySelect(id, parent_id)
    }

    return(
        <div className={cx('list', small && 'small-list')} >
            <div style={{display: 'inline-block'}}>
            {/* Category name */}
            <Typography variant="h2" style={{cursor: 'pointer'}} onClick={() => onClick(path)}>{name}</Typography>
            {/* Category content: */}  
            {items ? 
            <div className={cx('content')} style={{position: 'relative', transition: 'height 0.0s ease-in-out'}}>{/*, height: `${bounds.height > 10 ? bounds.height : 150}px`}}>*/}
                <div className={cx('absolute')}>
                    {items.map((item, index) => !expanded ?
                    index < 5 ?  <SubCategory key={generateKey(item.name)} parent={name} name={item.name} path={item.name} onSubCategorySelect={() => subCategoryClick(item.id, item.parent_id || '')}/>: null 
                    :
                    <SubCategory key={generateKey(item.name)} parent={name} name={item.name} path={item.name} onSubCategorySelect={() => subCategoryClick(item.id, item.parent_id || '')}/> 
                    )}                    
                </div>
            </div>
            :
            null
            }
            {(items && items.length > 5) && 
            <Box sx={{display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}} className={cx('expander')} onClick={expandSwitch}>
                <Arrow className={cx('arrow')} style={{transform: `rotateZ(${expanded?180:0}deg)`}}/>
                <Typography sx={{fontWeight: 700}}>{expanded ? 'Свернуть' : 'Еще'}</Typography>
            </Box>
            }
            </div>
        </div>
    )
}

export default Category;
