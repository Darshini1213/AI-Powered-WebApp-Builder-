import '../styles/skeleton-loader.css';

export const SkeletonLoader = ({ width = '100%', height = '20px', className = '', borderRadius = '4px' }) => (
  <div
    className={`skeleton-loader ${className}`}
    style={{
      width,
      height,
      borderRadius,
    }}
  />
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`skeleton-text ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonLoader key={i} width={i === lines - 1 ? '80%' : '100%'} height="16px" />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    <SkeletonLoader width="100%" height="200px" borderRadius="8px" className="mb-20" />
    <SkeletonLoader width="80%" height="20px" borderRadius="4px" className="mb-12" />
    <SkeletonText lines={2} className="mb-16" />
    <div style={{ display: 'flex', gap: '10px' }}>
      <SkeletonLoader width="80px" height="36px" borderRadius="4px" />
      <SkeletonLoader width="80px" height="36px" borderRadius="4px" />
    </div>
  </div>
);

export const SkeletonGrid = ({ items = 3, className = '' }) => (
  <div className={`skeleton-grid ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const ProjectCardSkeleton = () => (
  <div className="skeleton-project-card">
    <SkeletonLoader width="100%" height="150px" borderRadius="8px" className="mb-16" />
    <SkeletonLoader width="70%" height="18px" borderRadius="4px" className="mb-8" />
    <SkeletonLoader width="100%" height="16px" borderRadius="4px" className="mb-12" />
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
      <SkeletonLoader width="70px" height="32px" borderRadius="4px" />
      <SkeletonLoader width="70px" height="32px" borderRadius="4px" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="dashboard-skeleton">
    <div style={{ marginBottom: '30px' }}>
      <SkeletonLoader width="200px" height="32px" borderRadius="4px" className="mb-12" />
      <SkeletonLoader width="150px" height="16px" borderRadius="4px" />
    </div>
    <SkeletonGrid items={6} className="dashboard-grid-skeleton" />
  </div>
);

export const BuilderSkeleton = () => (
  <div className="builder-skeleton">
    <div className="builder-skeleton-left">
      <SkeletonLoader width="100%" height="40px" borderRadius="4px" className="mb-16" />
      <SkeletonText lines={5} />
    </div>
    <div className="builder-skeleton-right">
      <SkeletonLoader width="100%" height="300px" borderRadius="8px" />
    </div>
  </div>
);
