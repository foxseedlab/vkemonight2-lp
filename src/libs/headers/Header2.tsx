type Props = {
  title: string;
  className?: string;
  widthFull?: boolean;
};

export default function Header2({
  title,
  className = '',
  widthFull = true,
}: Props) {
  return (
    <h2
      className={`${widthFull ? 'w-full' : ''} text-3xl font-bold tracking-wide leading-12 break-keep wrap-anywhere ${className}`}
    >
      {title}
    </h2>
  );
}
