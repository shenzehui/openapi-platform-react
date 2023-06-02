import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingPOST,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/openapi-web/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateModal from './components/UpdateModal';

const InterfaceInfo: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   *  Delete node
   * @zh-CN 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdateInterfaceInfo = async (fields: API.InterfaceInfoUpdateRequest) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('正在更新');
    try {
      await updateInterfaceInfoUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();
      handleUpdateModalOpen(false);
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAddInterfaceInfo = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('添加成功');
      handleModalOpen(false);
    } catch (error: any) {
      hide();
      message.error('添加失败,' + error.message);
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      tip: '描述过长会自动收缩',
      valueType: 'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
      width: 250,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
    },
    {
      title: '状态',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInForm: true,
      sorter: true,
      width: 100,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInForm: true,
      sorter: true,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <a
          key="editable"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a
          key="config"
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </a>,
        record.status === 0 ? (
          <Button
            type="text"
            danger
            key="config"
            onClick={() => {
              handleOnline(record);
            }}
          >
            发布
          </Button>
        ) : null,
        record.status === 1 ? (
          <Button
            type="text"
            danger
            key="config"
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </Button>
        ) : null,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo>
        cardBordered
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params: { pageSize?: number; current?: number; keyword?: string }) => {
          const res = await listInterfaceInfoByPageUsingPOST({
            ...params,
          });
          if (res.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState[0]);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdateInterfaceInfo(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.InterfaceInfo>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfo>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => handleAddInterfaceInfo(values)}
        visible={createModalOpen}
      />
    </PageContainer>
  );
};
export default InterfaceInfo;
