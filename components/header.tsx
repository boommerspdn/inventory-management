type HeaderProps = {
  title: string;
  description: string;
};

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Header;
