import '../../css/utility/recommendedtabs.css'

export function RecommendedTab({ img, }) {
  return (
<li className="recommendedtabs">
    <div className='imgwrap'>
        Image
        {/* <img ></img> */}
    </div>
    <div className='optionswrap'>
        <p className='textwraps'>City Name</p>
        <p className='textwraps'>Flights | Hotels | Activities</p>
    </div>
</li>
  )
}
export default RecommendedTab;
