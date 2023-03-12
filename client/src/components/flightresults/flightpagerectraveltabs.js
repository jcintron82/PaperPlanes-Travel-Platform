

export function RecommendedTravelsTabs({ bgImg, text, className }) {
  return (
    <a className={className}  style={{
      backgroundImage: `url(${bgImg})`
    }}>
      { text }
    </a>
  );
}
export default RecommendedTravelsTabs;
