export default function Dado({ valor }) {
  return (
    <img
      src={`/dados/lado${valor}.png`}
      alt={`Dado ${valor}`}
      style={{ width: "80px", margin: "5px" }}
    />
  );
}