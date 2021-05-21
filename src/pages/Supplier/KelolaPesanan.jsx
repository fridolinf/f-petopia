import React from 'react';
import { Tabs, Badge } from 'antd';

import TabPesananBaru from './components/Pesanan/TabPesananBaru';
import TabDalamProses from './components/Pesanan/TabDalamProses';
import TabTertunda from './components/Pesanan/TabTertunda';
import TabPengiriman from './components/Pesanan/TabPengiriman';

const { TabPane } = Tabs;

class KelolaPesanan extends React.Component {
	state = { size: 'small' };

	render() {
		const { size } = this.state;
		return (
			<div>
				<Tabs centered defaultActiveKey='1' type='card' size={size}>
					<TabPane
						tab={
							<span>
								Pesanan Baru
								<Badge className='ml-1' count={11} overflowCount={10} />{' '}
							</span>
						}
						key='1'
					>
						<TabPesananBaru />
					</TabPane>

					<TabPane
						tab={
							<span>
								Dalam Proses
								<Badge className='ml-1' count={11} overflowCount={10} />{' '}
							</span>
						}
						key='2'
					>
						<TabDalamProses />
					</TabPane>

					<TabPane
						tab={
							<span>
								Tertunda
								<Badge className='ml-1' count={11} overflowCount={10} />{' '}
							</span>
						}
						key='3'
					>
						<TabTertunda />
					</TabPane>

					<TabPane
						tab={
							<span>
								Pengiriman
								<Badge className='ml-1' count={11} overflowCount={10} />{' '}
							</span>
						}
						key='4'
					>
						<TabPengiriman />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
export default KelolaPesanan;
