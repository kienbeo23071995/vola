import {
    EditOutlined,
    HomeOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop,
    Breadcrumb,
    Col,
    Form,
    Input,
    Row,
    Select,
    Spin,
    Table
} from 'antd';
import React, { useEffect, useState } from 'react';
import "./mediaManagementByCampaign.css";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';
import mediaApi from '../../../apis/mediaApi';
const { Option } = Select;

const MediaManagementByCampaign = () => {

    const [milestone, setMilestone] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [id, setId] = useState();
    const params = useParams();

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
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
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            key: 'image',
            render: (text, record) => (
                <img
                    src={record.image}
                    alt="Choose some img for slider"
                    className="create-post-image-preview"
                    max-width="30%"
                    max-height="30%"
                />
            )
        },
        {
            title: 'Video',
            key: 'video',
            render: (text, record) => (
                <div>
                    <video controls width="300">
                        <source src={record.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <Link
                                size="small"
                                icon={<EditOutlined />}
                                style={{ width: 150, borderRadius: 15, height: 30 }}
                                to={`/update-media/` + record.id + "/" + params.idcampaign}
                            >{"Chỉnh sửa"}
                            </Link>
                        </div>
                    </Row>
                </div >
            ),
        },
    ];


    useEffect(() => {
        (async () => {
            try {
                await axios.get("http://localhost:8080/getByIdCampagin/" + params.idcampaign).then((res) => {
                    console.log(res.data);
                    setMilestone(res.data);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            };
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
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} scroll={{ x: true }}
                            pagination={{ position: ['bottomCenter'] }} dataSource={milestone} />
                    </div>
                </div>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default MediaManagementByCampaign;