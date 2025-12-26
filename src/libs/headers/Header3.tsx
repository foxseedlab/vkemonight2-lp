type Props = {
  title: string;
  className?: string;
  widthFull?: boolean;
};

export default function Header3({
  title,
  className = '',
  widthFull = true,
}: Props) {
  return (
    <h3
      className={`${widthFull ? 'w-full' : ''} pl-6 text-xl font-bold tracking-wide text-[hsl(270,25%,15%)] bg-white leading-12 break-keep wrap-anywhere ${className ?? ''}`}
    >
      {title}
    </h3>
  );
}
