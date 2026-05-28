'use client';

import { useInView } from 'react-intersection-observer';
import RCCountUp from 'react-countup';

export function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 2.2,
  decimals = 0,
  className,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <span ref={ref as unknown as React.RefObject<HTMLSpanElement>} className={className}>
      {inView ? (
        <RCCountUp end={end} duration={duration} decimals={decimals} prefix={prefix} suffix={suffix} />
      ) : (
        <>
          {prefix}0{suffix}
        </>
      )}
    </span>
  );
}
