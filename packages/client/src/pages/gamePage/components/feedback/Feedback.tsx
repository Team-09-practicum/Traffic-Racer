import React, { useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import './Feedback.scss';

export const Feedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <FormOutlined className="feedback-button" onClick={showModal} />
      <Modal centered title="Об" open={isModalOpen} onCancel={handleCancel} />
    </div>
  );
};
