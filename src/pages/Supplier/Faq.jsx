import React, { Component } from 'react';
import { Collapse, Typography } from 'antd';
import { getFaqs } from '../../redux/supplier/action/actionSupplier';
import { connect } from 'react-redux';

import UIBlocker from 'react-ui-blocker';
const { Text } = Typography;
const { Panel } = Collapse;

class Faq extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.getFaqs();
	}
	render() {
		return (
			<div>
				<UIBlocker
					theme='bounce' // default
					isVisible={this.props.loading}
					message=''
				/>
				<h2 className='mb-3'>Halaman FAQ</h2>
				{this.props.faqs.map((e, i) => (
					<Collapse accordion key={i} className='mt-2'>
						<Panel header={e.pertanyaan} className='site-collapse-custom-panel'>
							<div
								dangerouslySetInnerHTML={{
									__html: e.jawaban,
								}}
							></div>
						</Panel>
					</Collapse>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { faqs, loading, error } = state.reducerSupplier;
	return { faqs, loading, error };
};
export default connect(mapStateToProps, {
	getFaqs,
})(Faq);
