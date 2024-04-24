import { classNames } from '../../features/classNames';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ className, children }: Props) => {
  return (
    <div className={classNames('bg-slate-800 rounded-xl p-8', className)}>
      {children}
    </div>
  );
};
