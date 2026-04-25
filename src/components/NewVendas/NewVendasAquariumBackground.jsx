import './AquariumBackground.css';

const NewVendasAquariumBackground = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[20] overflow-hidden"
      aria-hidden="true"
    >
      <div className="aq-blob aq-blob-a" />
      <div className="aq-blob aq-blob-b" />
      <div className="aq-blob aq-blob-c" />
      <div className="aq-blob aq-blob-d" />
    </div>
  );
};

export default NewVendasAquariumBackground;