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
import campaignApi from '../../apis/campaignApi';
import storyApi from "../../apis/storyApi";
import "./storyManagement.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const { Option } = Select;

const StoryManagement = () => {

    const [campaign, setCampaign] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [id, setId] = useState();
    const [campaignList, setCampaignList] = useState([]);
    const [createContent,setCreateContent] = useState('');
    const [updateContent,setUpdateContent] = useState('');

    const showModal = () => {
        setOpenModalCreate(true);
    };

    const handleOkUser = async (values) => {
        setLoading(true);
        try {
            const campaign = {
                "name": values.name,
                "content": createContent,
                "title": values.title,
                "created_at": values.created_at,
                "campaignId": values.campaignId
            }
            return storyApi.createStories(campaign).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo câu chuyện thất bại',
                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo câu chuyện thành công',
                    });
                    setOpenModalCreate(false);
                    handleCampaignList();
                    setLoading(false);
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleUpdateCampaign = async (values) => {
        setLoading(true);
        try {
            const campaign = {
                "storyId": id,
                "name": values.name,
                "content": updateContent,
                "title": values.title,
                "created_at": values.created_at,
                "campaignId": values.campaignId
            }
            await storyApi.updateStories(campaign, id).then(response => {
                console.log(response);
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa câu chuyện thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa câu chuyện thành công',
                    });
                    handleCampaignList();
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

    const handleCampaignList = async () => {
        try {
            await storyApi.listStories().then((res) => {
                console.log(res);
                setCampaign(res);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleDeleteCampaign = async (id) => {
        setLoading(true);
        try {
            await storyApi.deleteStories(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa câu chuyện thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa câu chuyện thành công',

                    });
                    handleCampaignList();
                    setLoading(false);
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleEditCampaign = (id) => {
        setOpenModalUpdate(true);
        (async () => {
            try {
                const response = await storyApi.getDetailStories(id);
                setId(id);
                form2.setFieldsValue({
                    name: response.name,
                    content: response.content,
                    title: response.title,
                    created_at: moment(response.created_at),
                    campaignId: response.campaignId,
                });
                setUpdateContent(response.content);
                console.log(response);
                setLoading(false);
            } catch (error) {
                throw error;
            }
        })();
    }

    const handleFilter = async (name) => {
        try {
            const res = await storyApi.searchStories(name);
    
            // Create a Set to store unique story IDs
            const uniqueStoryIds = new Set();
    
            // Use filter to keep only unique stories based on storyId
            const uniqueStories = res.filter(story => {
                if (!uniqueStoryIds.has(story.storyId)) {
                    uniqueStoryIds.add(story.storyId);
                    return true;
                }
                return false;
            });
    
            setCampaign(uniqueStories);
        } catch (error) {
            console.log('search to fetch campaign list:' + error);
        }
    }
    
    const [page, setPage] = useState(1);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'index',
            render: (value, item, index) => (
                (page - 1) * 10 + (index + 1)
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (value) => (
                <div dangerouslySetInnerHTML={{ __html: value }} />
            )
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => moment(created_at).format('DD-MM-YYYY'),
        },
        {
            title: 'Tên chiến dịch',
            dataIndex: 'campaignName',
            key: 'campaignName',
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
                                onClick={() => handleEditCampaign(record.storyId)}
                            >
                                {"Chỉnh sửa"}
                            </Button>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Popconfirm
                                title="Bạn có chắc chắn xóa câu chuyện này?"
                                onConfirm={() => handleDeleteCampaign(record.storyId)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                >
                                    {"Xóa"}
                                </Button>
                            </Popconfirm>
                        </div>
                    </Row>
                </div>
            ),
        },
    ];



    useEffect(() => {
        (async () => {
            try {
                await storyApi.listStories().then((res) => {
                    console.log(res);
                    setCampaign(res);
                    setLoading(false);
                });

                await campaignApi.listCampaign().then((res) => {
                    console.log(res);
                    setCampaignList(res);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch campaign list:' + error);
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
                                <span>Quản lý câu chuyện</span>
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
                                                <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo câu chuyện</Button>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} scroll={{ x: true }}
                            pagination={{ position: ['bottomCenter'] }} dataSource={campaign} />
                    </div>


                    <Modal
                        title="Tạo câu chuyện mới"
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
                            name="storyCreate"
                            layout="vertical"
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
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
                                <CKEditor editor={ClassicEditor} data="<p>Please input content here</p>" onChange={(event,editor) => {
                                         setCreateContent(editor.getData());
                                }} />
                            </Form.Item>
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
                                <Input placeholder="Tiêu đề" />
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
                                <DatePicker format="DD-MM-YYYY" placeholder="Ngày tạo" />
                            </Form.Item>
                            <Form.Item
                                name="campaignId"
                                label="Chiến dịch"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn chiến dịch!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select style={{ width: '100%' }} tokenSeparators={[',']} placeholder="Chiến dịch" showSearch filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {campaignList.map((item, index) => {
                                        return (
                                            <Option value={item.campaignId} key={item.campaignId} >
                                                {item.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Form>

                    </Modal>

                    <Modal
                        title="Chỉnh sửa câu chuyện"
                        visible={openModalUpdate}
                        style={{ top: 100 }}
                        onOk={() => {
                            form2
                                .validateFields()
                                .then((values) => {
                                    form2.resetFields();
                                    handleUpdateCampaign(values);
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
                            name="storyCreate"
                            layout="vertical"
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
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
                                <CKEditor editor={ClassicEditor} data={updateContent} onChange={(event,editor) => {
                                         setUpdateContent(editor.getData());
                                }} />
                            </Form.Item>
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
                                <Input placeholder="Tiêu đề" />
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
                                <DatePicker format="DD-MM-YYYY" placeholder="Ngày tạo" />
                            </Form.Item>

                            <Form.Item
                                name="campaignId"
                                label="Chiến dịch"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn chiến dịch!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select style={{ width: '100%' }} tokenSeparators={[',']} placeholder="Chiến dịch" showSearch filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {campaignList.map((item, index) => {
                                        return (
                                            <Option value={item.campaignId} key={item.campaignId} >
                                                {item.name}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Form>

                    </Modal>
                </div>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default StoryManagement;