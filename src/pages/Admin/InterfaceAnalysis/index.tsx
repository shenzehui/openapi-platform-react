import { listTopInvokeInterfaceInfoUsingGET } from '@/services/openapi-web/analysisController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTopInvokeInterfaceInfoUsingGET().then((resp) => {
      if (resp.data) {
        setData(resp.data);
        setLoading(false);
      }
    });
  }, []);

  // { value: 1048, name: 'Search Engine' },
  const chartsData = data.map((item: any) => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });

  const options = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartsData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <PageContainer title={'接口调用情况'}>
      <ReactECharts showLoading={loading} option={options} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
