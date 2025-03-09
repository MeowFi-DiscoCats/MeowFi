import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lending', value: 20, color: '#ffb400' },
  { name: 'remaning', value: 20, color: '#3E4247' },
  { name: 'Vault Fees', value: 20, color: '#ffb400' },
  { name: 'Bribes', value: 30, color: '#FFFFFF' },
];

export default function VaultYieldCard() {
  return (
    <>
      <div className="relative h-36 w-36">
        <div className="font-Teko absolute flex h-full w-full items-center justify-center text-2xl font-semibold">
          {' '}
          20%
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="80%"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="py-4 pr-4">
        <h2 className="font-Teko font-semibold">Vault Yield</h2>
        <p className="text-xs">(last hour)</p>
        <p className="flex items-center gap-2">
          <span className="bg-amber inline-block h-3 w-3"></span>Lending
        </p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 bg-white"></span>Bribes
        </p>
        <p className="flex items-center gap-2">
          <span className="bg-amber inline-block h-3 w-3"></span>Vault Fees
        </p>
      </div>
    </>
  );
}
