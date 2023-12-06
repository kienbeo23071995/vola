import {
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop,
    Breadcrumb,
    Button,
    Col,
    Form,
    Input,
    Modal, Popconfirm,
    Row,
    Select,
    Space,
    Spin,
    Table,
    notification
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import mediaApi from "../../apis/mediaApi";
import "./mediaManagement.css";
const { Option } = Select;

const MediaManagement = () => {

    const [milestone, setMilestone] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [campaignList, setCampaignList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [id, setId] = useState();


    const showModal = () => {
        setOpenModalCreate(true);
    };

    const handleOkUser = async (values) => {
        setLoading(true);
        try {
            const milestone = {
                "image": values.image,
                "video": values.video,
            }
            return mediaApi.createMedia(milestone).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo media thất bại',
                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo media thành công',
                    });
                    setOpenModalCreate(false);
                    handleMilestoneList();
                    setLoading(false);
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleUpdateMilestone = async (values) => {
        setLoading(true);
        try {

            const milestone = {
                "mediaId": id,
                "image": values.image,
                "video": values.video,
            }
            await mediaApi.updateMedia(milestone, id).then(response => {
                console.log(response);
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa media thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa media thành công',
                    });
                    handleMilestoneList();
                    setOpenModalUpdate(false);
                }
            })
            setLoading(false);

        } catch (error) {
            throw error;
        }
    }

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
    };

    const handleMilestoneList = async () => {
        try {
            await mediaApi.listMedia().then((res) => {
                console.log(res);
                setMilestone(res);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleDeleteMilestone = async (id) => {
        setLoading(true);
        try {
            await mediaApi.deleteMedia(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa media thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa media thành công',

                    });
                    handleMilestoneList();
                    setLoading(false);
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleEditMilestone = (id) => {
        setOpenModalUpdate(true);
        (async () => {
            try {
                const response = await mediaApi.getDetailMedia(id);
                setId(id);
                form2.setFieldsValue({
                    mediaId: response.mediaId,
                    image: response.image,
                    video: moment(response.video),
                });
                setLoading(false);
            } catch (error) {
                throw error;
            }
        })();
    };


    const handleFilter = async (name) => {
        try {
            const res = await mediaApi.searchMedia(name);
            setMilestone(res);
        } catch (error) {
            console.log('search to fetch milestone list:' + error);
        }
    }


    const columns = [
        {
            title: 'Index',
            dataIndex: 'mediaId',
            key: 'mediaId',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Video',
            dataIndex: 'video',
            key: 'video',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <Button
                                size="small"
                                icon={<EditOutlined />}
                                style={{ width: 150, borderRadius: 15, height: 30 }}
                                onClick={() => handleEditMilestone(record.mediaId)}
                            >{"Chỉnh sửa"}
                            </Button>
                        </div>
                        <div
                            style={{ marginTop: 10 }}>
                            <Popconfirm
                                title="Bạn có chắc chắn xóa media này?"
                                onConfirm={() => handleDeleteMilestone(record.mediaId)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                >{"Xóa"}
                                </Button>
                            </Popconfirm>
                        </div>
                    </Row>
                </div >
            ),
        },
    ];


    useEffect(() => {
        (async () => {
            try {
                await mediaApi.listMedia().then((res) => {
                    console.log(res);
                    setMilestone(res);
                    setLoading(false);
                });

            } catch (error) {
                console.log('Failed to fetch milestone list:' + error);
            }
        })();
    }, [])

    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <ShoppingOutlined />
                                <span>Quản lý media</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        <Input
                                            placeholder="Tìm kiếm"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                            <Space>
                                                <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo  media</Button>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} scroll={{ x: true }}
                            pagination={{ position: ['bottomCenter'] }} dataSource={milestone} />
                    </div>
                </div>

                <Modal
                    title="Tạo media mới"
                    visible={openModalCreate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                handleOkUser(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={() => handleCancel("create")}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Form
                        form={form}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="image"
                            label="Link ảnh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đường link ảnh!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Đường link ảnh" />
                        </Form.Item>
                        <Form.Item
                            name="video"
                            label="Link video"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đường link video!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Đường link video" />
                        </Form.Item>

                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa media"
                    visible={openModalUpdate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form2
                            .validateFields()
                            .then((values) => {
                                form2.resetFields();
                                handleUpdateMilestone(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Form
                        form={form2}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="image"
                            label="Link ảnh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đường link ảnh!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Đường link ảnh" />
                        </Form.Item>
                        <Form.Item
                            name="video"
                            label="Link video"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đường link video!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Đường link video" />
                        </Form.Item>


                    </Form>
                </Modal>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default MediaManagement;