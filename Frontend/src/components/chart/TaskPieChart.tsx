import { ChartType } from '@/types/ChartType';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

function TaskPieChart({ tasks }: { tasks: ChartType[] }) {
  return (
    <div>
      <BarChart width={730} height={250} data={tasks}>
        <CartesianGrid strokeDasharray='3 3' stroke='#e30d7c' />
        <XAxis dataKey='id' stroke={'white'} />
        <YAxis stroke={'white'} />
        <Tooltip cursor={{ fill: '#e30d7c', stroke: 'black' }} />
        <Bar dataKey='count' />
      </BarChart>
    </div>
  );
}

export default TaskPieChart;
