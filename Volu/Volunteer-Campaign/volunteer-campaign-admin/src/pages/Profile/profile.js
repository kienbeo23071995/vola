import {
    FormOutlined,
    HomeOutlined
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Divider,
    Form, Input,
    Modal,
    Select,
    Spin,
    Typography,
    notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from '../../apis/userApi';
import "./profile.scss";


const { confirm } = Modal;
const { Option } = Select;
const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

const Profile = () => {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [isVisibleModal, setVisibleModal] = useState(false);
    const [profile, setProfile] = useState([]);

    const handleList = () => {
        (async () => {
            try {
                const currentData = JSON.parse(localStorage.getItem("user"));
                setUserData(JSON.parse(localStorage.getItem("user")));
                const response = await userApi.getProfile(currentData.userId);
                console.log(response);
                setProfile(response);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch profile user:' + error);
            }
        })();
    }

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);
    }, [])

    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
            const formatData = {
                "email": values.email,
                "phone": values.phone,
                "password": profile.password,
            };

            await userApi.updateProfile(formatData, profile.accountId)
                .then(response => {
                    console.log(response);
                    if (response === '' || response === undefined) {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Cập nhật tài khoản thất bại',
                        });
                    } else {
                        notification.success({
                            message: 'Thông báo',
                            description: 'Cập nhật tài khoản thành công',
                        });
                        setVisibleModal(false)
                    }
                });
            handleList();
        } catch (error) {
            throw error;
        }
    };
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            if (values.password.length <= 6) {
                // Show an error notification or handle the validation appropriately
                notification.error({
                    message: 'Thông báo',
                    description: 'Mật khẩu phải có ít nhất 7 kí tự.',
                });
                return;
            }
            
            const formatData = {
                "currentPassword": values.currentPassword,
                "password": values.password,
            };

            await userApi.updateProfile(formatData, profile.accountId)
                .then(response => {
                    console.log(response);
                    if (response.data === '' || response === undefined) {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Cập nhật mật khẩu thất bại',
                        });
                    } else {
                        notification.success({
                            message: 'Thông báo',
                            description: 'Cập nhật mật khẩu thành công',
                        });
                        setPasswordModalVisible(false);
                        form.resetFields();
                    }
                });
            handleList();
        } catch (error) {
            throw error;
        }
    }
    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginTop: 20, marginLeft: 24 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <FormOutlined />
                            <span>Trang cá nhân</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="single">
                    <div className="singleContainer">
                        <div className="top">
                            <div className="left">
                                <h1 className="title">Thông tin cá nhân</h1>
                                <div className="item">
                                    <img
                                        src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <div className="detailItem">
                                            <span className="itemKey">Tên:</span>
                                            <span className="itemValue">{profile?.lastname} {profile?.firstname}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Email:</span>
                                            <span className="itemValue">{profile?.email}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Số điện thoại:</span>
                                            <span className="itemValue">{profile?.phone}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Địa chỉ:</span>
                                            <span className="itemValue">{profile?.address}</span>
                                        </div>
                                        <div style={{ marginTop: 10 }}>
                                            <Button type="primary" style={{ marginRight: 10 }} onClick={() => setVisibleModal(true)}>Cập nhật Profile</Button>
                                            <Button type="primary" onClick={() => setPasswordModalVisible(true)}>Đổi mật khẩu</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">


                            </div>
                        </div>
                        <Modal
                            visible={isPasswordModalVisible}
                            onCancel={() => setPasswordModalVisible(false)}
                            footer={null}
                        >
                            <div className="changePassword">
                                <Form
                                    style={{ width: 400, marginBottom: 8 }}
                                    name="normal_login"
                                    form={form}
                                    className="loginform"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item style={{ marginBottom: 3 }}>
                                        <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">THAY ĐỔI MẬT KHẨU</Divider>
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 16, textAlign: "center" }}>
                                        <p className="text">Nhập thông tin dưới đây</p>
                                    </Form.Item>

                                    <Form.Item
                                        name="currentPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu cũ!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder="Mật khẩu cũ" />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu mới!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder="Mật khẩu" />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập lại mật khẩu mới!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }

                                                    return Promise.reject(new Error('2 mật khẩu bạn nhập vào không trùng nhau!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder="Xác minh mật khẩu" />
                                    </Form.Item>

                                    <Form.Item style={{ width: '100%', marginTop: 20 }}>
                                        <Button className="button" type="primary" htmlType="submit"  >
                                            Hoàn Thành
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </div>
                        </Modal>
                        <div>
                            <Modal
                                title="Cập nhật thông tin cá nhân"
                                visible={isVisibleModal}
                                onCancel={() => setVisibleModal(false)}
                                footer={null}
                            >
                                <Form
                                    initialValues={{
                                        lastname: profile?.lastname,
                                        firstname: profile?.firstname,
                                        email: profile?.email,
                                        phone: profile?.phone,
                                        address: profile?.address,
                                    }}
                                    onFinish={handleFormSubmit}
                                >
                                    <Form.Item
                                        label="Tên"
                                        name="firstname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập firstname!',
                                            },
                                        ]}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                    <Form.Item
                                        label="Họ"
                                        name="lastname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập lastname!',
                                            },
                                        ]}
                                    >
                                        <Input readOnly />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email" rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email!',
                                        },
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại" name="phone" rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại!',
                                        },
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Địa chỉ" name="address" rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập địa chỉ!',
                                        },
                                    ]}>
                                        <Input readOnly />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Cập nhật
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div >


            </Spin >
        </div >
    )
}

export default Profile;