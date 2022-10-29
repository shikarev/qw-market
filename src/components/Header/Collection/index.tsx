import HeartActiveIcon from "../../../assets/Icons/outlined/heart.svg";
import CollectionItem from "./CollectionItem";
import {CollectionItem as Item} from '../../../types';
import HeartFilledIcon from "../../../assets/Icons/filled/heart.png";
import {generateKey} from "../../../utils/utils";
import {useGetCollectionsQuery} from "../../../api/collections";
import first from '../../../assets/test/header/1.png';
import second from '../../../assets/test/header/2.png';
import third from '../../../assets/test/header/3.png';
import four from '../../../assets/test/header/4.png';
import classNames from "classnames/bind";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const item: Item[] = [
    {
        title: 'Топ 10 новых товаров для гейминг',
        itemImg: first,
        likeCount: 0,
        likeIcon: HeartActiveIcon,
        likeIconFilled: HeartFilledIcon
    },
    {
        title: 'Лучшие кроссовки для бега',
        itemImg: second,
        likeCount: 0,
        likeIcon: HeartActiveIcon,
        likeIconFilled: HeartFilledIcon
    },
    {
        title: 'Новые города для путешестивий',
        itemImg: third,
        likeCount: 0,
        likeIcon: HeartActiveIcon,
        likeIconFilled: HeartFilledIcon
    },
    {
        title: 'Топ 10 новых товаров для гейминга',
        itemImg: four,
        likeCount: 0,
        likeIcon: HeartActiveIcon,
        likeIconFilled: HeartFilledIcon
    },
];

const Collections = () => {
    const { data, error, isLoading } = useGetCollectionsQuery();

    return (
        <section className={cx('collections')}>
            {item.map(item => <CollectionItem
            key={generateKey(item.title)}
            title={item.title}
            imgUrl={item.itemImg}
            likeCount={item.likeCount}
            likeIcon={item.likeIcon}
            likeIconFilled={item.likeIconFilled}
        />)}
        </section>
    )
};

export default Collections;
