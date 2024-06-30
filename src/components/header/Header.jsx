export default function Header(props) {
  return (
    <header className="text-center my-8">
      <label className="text-3xl font-bold">{props.title}</label>
    </header>
  );
}
