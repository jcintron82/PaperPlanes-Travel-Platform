export function RecommendedTravelsTabs({ bgImg, text, className }) {
  return (
    <button className={className}  style={{
      backgroundImage: `url(${bgImg})`
    }}>
      { text }
    </button>
  );
}
export default RecommendedTravelsTabs;
