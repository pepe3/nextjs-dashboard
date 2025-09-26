import CardWrapper from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { AvgMeasureChartSkeleton, CardSkeleton, LatestMeasureSkeleton } from '@/app/ui/skeletons';
import LatestMeasures from '@/app/ui/dashboard/latest-measures';
import AvgMeasureChart from '@/app/ui/dashboard/avg-measure-chart';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<AvgMeasureChartSkeleton />}>
          <AvgMeasureChart />
        </Suspense>
        <Suspense fallback={<LatestMeasureSkeleton />}>
          <LatestMeasures />
        </Suspense>
      </div>
    </main>
  );
}