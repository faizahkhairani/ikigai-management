import { cn } from 'cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 mb-6', className)}>
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
