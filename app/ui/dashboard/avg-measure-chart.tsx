import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchMeasures } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function AvgMeasureChart() {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('en-US', { month: 'short' }),
  }));
  const revenue = await fetchMeasures();

  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Avarage Temperatures 2025
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${400}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {months.map(({ month }) => {
            const monthData = revenue.find((m) => m.month === month);
            const avgTemp = monthData?.avarage_temperature ?? 0;

            return (
              <div key={month} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-blue-300"
                  style={{
                    height: `${(chartHeight / topLabel) * avgTemp}px`,
                  }}
                ></div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                  {month}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
