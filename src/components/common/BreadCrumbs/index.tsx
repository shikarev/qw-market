import React from 'react';
import { Breadcrumbs, Box, Link, LinkProps, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import classNames from 'classnames/bind';
import {ICatalogCategory} from "../../../types/Catalog";
import {ReactComponent as ArrowR} from "../../../assets/Icons/arrow-r.svg?svgr";

const cx = classNames.bind(styles);

const breadcrumbNameMap: { [key: string]: string } = {
    '/': 'Главная Страница',
    '/catalog': 'Каталог',
    '/category': '',
    '/subcategory': '',
    '/brands': 'Все бренды',
    '/brands/cat': '',
    '/stores': 'Магазины',
    '/product': '',
    '/promotion': 'Акции и предложения',
    '/reviews_articles': 'Обзоры',
    '/reviews_videos': 'Видео',
}

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

export interface IBreadCrumb {
    url: string,
    name: string,
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

function BreadCrumbs({ links, activeSection, disableLast=false } : { links?: IBreadCrumb[], activeSection?: ICatalogCategory[],  disableLast?: boolean }) {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box className={cx('wrapper')} sx={{'& a, p, svg': {color: 'text.primary'}}}>
            <Breadcrumbs aria-label="breadcrumb" sx={{mb: '1.6rem'}} separator={<ArrowR viewBox='0 0 24 24' width={20} height={20}/>}>
                <LinkRouter color="inherit" to="/">
                    <Typography>Главная страница</Typography>
                </LinkRouter>
                {
                    // AUTO GENERATED LINKS
                    pathnames.map((value, index) => {
                        const last = (index === pathnames.length - 1) && !activeSection;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        if (breadcrumbNameMap[to]) {
                            return (last) ? (
                                <Typography color="textPrimary" key={to}>
                                    {breadcrumbNameMap[to]}
                                </Typography>
                            ) : (
                                <LinkRouter color="textPrimary" to={to} key={to}>
                                    {breadcrumbNameMap[to]}
                                </LinkRouter>
                            );
                        }
                    })
                }
                {
                    //CUSTOM LINKS
                    links?.map((value, index) => {
                        const last = (index === links.length - 1) && !disableLast;
                        const to = `/${value.url}`;
                        return last ?
                            <Typography color="textPrimary" key={to}>
                                {value.name}
                            </Typography>
                            :
                            <LinkRouter color="textPrimary" to={value.url} key={to}>
                                {value.name}
                            </LinkRouter>
                    })
                }
                {
                    // CAROUSEL ROOTS
                    activeSection?.map((value, index) => {
                        const last = (index === activeSection.length - 1) && !disableLast;
                        const to = `/`;
                        return last ?
                            <Typography color="textPrimary" key={to}>
                                {value.name}
                            </Typography>
                            :
                            <LinkRouter color="textPrimary" to={value.id} key={to}>
                                {value.name}
                            </LinkRouter>
                    })
                }
            </Breadcrumbs>
        </Box>
    );
}

export default BreadCrumbs;
