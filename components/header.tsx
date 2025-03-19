type HeaderProps = {
  title: string;
  description: string;
  length?: number;
};

const Header = ({ title, description, length }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
        {length && <> ({length})</>}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Header;
