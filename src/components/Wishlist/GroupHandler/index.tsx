import {Formik, Form, Field} from 'formik';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import styles from './groupHandler.module.scss';
import classNames from 'classnames/bind';
import { Modal } from '@mui/material';

const cx = classNames.bind(styles);

const GroupAddSchema = Yup.object().shape({
    groupName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

function GroupHandler({ onSubmit }: any) {
    const initialValues = { groupName: '' };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={GroupAddSchema}
                onSubmit={(values, actions) => {
                    onSubmit({ name: values.groupName });
                    actions.setSubmitting(false);
                }}>
                {({ errors, touched }) =>
                    <Form className={cx('wrapper')} >
                        <h1>Новая группа</h1>
                        <Field id="groupName" name="groupName" placeholder="Название группы" autocomplete="off" />
                        <Button
                            disabled={(errors.groupName && touched.groupName) ? true : false}
                            type='submit'
                            variant="contained"
                            size="large"
                            color="primary"
                        >
                            Создать группу
                        </Button>
                    </Form>
                }
            </Formik>
        </>
    );
}


const addGroupModal = ({show, onClose, onSubmit}:{show: boolean, onClose: any, onSubmit: any}) => {
    return (<Modal
        open={show}
        onClose={onClose}
    >
        <div className={cx('modal')}>
            <GroupHandler onSubmit={onSubmit} />
        </div>
    </Modal>
    )
}

export default addGroupModal;