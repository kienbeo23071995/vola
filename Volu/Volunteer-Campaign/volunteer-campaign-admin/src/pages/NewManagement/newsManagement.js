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
    DatePicker,
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
import newsApi from "../../apis/newsApi";
import "./newsManagement.css";
const { Option } = Select;

const NewManagement = () => {

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
                "title": values.title,
                "content": values.content,
                "created_at": values.created_at,
            }
            return newsApi.createNews(milestone).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo tin tức thất bại',
                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo tin tức thành công',
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
                "title": values.title,
                "content": values.content,
                "created_at": values.created_at,
            }
            await newsApi.updateNews(milestone, id).then(response => {
                console.log(response);
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa tin tức thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa tin tức thành công',
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
            await newsApi.listNews().then((res) => {
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
            await newsApi.deleteNews(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa tin tức thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa tin tức thành công',

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
                const response = await newsApi.getDetailNews(id);
                setId(id);
                form2.setFieldsValue({
                    title: response.title,
                    content: response.content,
                    created_at: moment(response.created_at),
                });
                setLoading(false);
            } catch (error) {
                throw error;
            }
        })();
    };
    

    const handleFilter = async (name) => {
        try {
            const res = await newsApi.searchNews(name);
            setMilestone(res);
        } catch (error) {
            console.log('search to fetch milestone list:' + error);
        }
    }


    const columns = [
        {
            title: 'Index',
            dataIndex: 'newId',
            key: 'newId',
        },
        {
            title: 'Tên tin tức',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (start_date) => moment(start_date).format('DD-MM-YYYY'),
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
                                onClick={() => handleEditMilestone(record.newId)}
                            >{"Chỉnh sửa"}
                            </Button>
                        </div>
                        <div
                            style={{ marginTop: 10 }}>
                            <Popconfirm
                                title="Bạn có chắc chắn xóa tin tức này?"
                                onConfirm={() => handleDeleteMilestone(record.newId)}
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
                await newsApi.listNews().then((res) => {
                    console.log(res);
                    setMilestone(res);
                    setLoading(false);
                });

            } catch (error) {
                console.log('Failed to fetch milestone list:' + error);
            }
        })();
    }, [])

    // Hàm loại bỏ dữ liệu trùng lặp dựa trên một key cụ thể
    const disabledEndDate = (endValue) => {
        const startValue = form.getFieldValue('created_at');
        if (!startValue || !endValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

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
                                <span>Quản lý tin tức</span>
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
                                                <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo  tin tức</Button>
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
                    title="Tạo tin tức mới"
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
                            name="title"
                            label="Tiêu đề"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Tiêu đề bài viết" />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="Nội dung"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập nội dung!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input.TextArea placeholder="Nội dung bài viết" />
                        </Form.Item>
                        <Form.Item
                            name="created_at"
                            label="Ngày tạo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ngày tạo!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Chọn ngày và giờ" />
                        </Form.Item>


                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa tin tức"
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
                            name="title"
                            label="Tiêu đề"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Tiêu đề bài viết" />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            label="Nội dung"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập nội dung!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input.TextArea placeholder="Nội dung bài viết" />
                        </Form.Item>
                        <Form.Item
                            name="created_at"
                            label="Ngày tạo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ngày tạo!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Chọn ngày và giờ" />
                        </Form.Item>



                    </Form>
                </Modal>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default NewManagement;