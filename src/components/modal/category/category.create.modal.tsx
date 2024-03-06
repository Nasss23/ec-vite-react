/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd';
import { useState } from 'react';

const CreateCategoryModal = (props: any) => {
	const [open, setOpen] = useState(false);

	const handleSubmit = () => {};
	return (
		<div>
			<Modal
				title='Modal 1000px width'
				centered
				open={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				width={1000}>
				<p>some contents...</p>
				<p>some contents...</p>
				<p>some contents...</p>
			</Modal>
		</div>
	);
};

export default CreateCategoryModal;
