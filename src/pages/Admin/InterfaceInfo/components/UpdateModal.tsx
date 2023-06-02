import { ProColumns, ProTable } from '@ant-design/pro-table/lib';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit, values } = props;

  const formRef = useRef<any>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);
  return (
    <Modal title={'新建接口'} footer={null} open={visible} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
