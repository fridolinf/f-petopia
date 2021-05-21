import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row } from 'antd';
import { getDataSupplier } from '../../redux/supplier/action/actionSupplier';
const Profile = () => {
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state) => state.reducerSupplier);

	useEffect(() => {
		dispatch(getDataSupplier());
	}, [dispatch]);
	return (
		<div>
			<Row className='justify-content-center'>
				<Card.Grid className='d-flex' style={{ width: '50%' }}>
					{/* <Avatar
						size={{ xs: 24, sm: 50, md: 100, lg: 150, xl: 200, xxl: 250 }}
						src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
					/> */}
					<div className='ml-5'>
						<h4>Nama</h4>
						<p>{user.name}</p>
						<h4>Email</h4>
						<p>{user.email}</p>
						<h4>No Handphone</h4>
						<p>{user.phone}</p>
						<h4>Alamat</h4>
						<p>{user.address}</p>

						<a className='mt-2 float-right' href='/' placeholder='ubah'>
							Ubah
						</a>
					</div>
				</Card.Grid>
			</Row>
		</div>
	);
};

export default Profile;
