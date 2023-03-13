import '../../css/utility/recommendedtabs.css'
//--------------End of module imports---------------//
import nycphoto from '../../images/home/nyc.avif';
import londonphoto from '../../images/home/london.avif';
import miamiphoto from '../../images/home/miami.avif';
//--------------End of photo imports---------------//
export function RecommendedTab({ img, }) {
  return (

<ul className='recommendedtabswrap'>
<li className="recommendedtabs">
    <div className='imgwrap'>
        <img className='recommendedtabsimg' src={nycphoto}></img>
    </div>
    <div className='optionswrap'>
        <p className='textwraps'>City Name</p>
        <p className='textwraps'>Flights | Hotels | Activities</p>
    </div>
</li>
<li className="recommendedtabs">
    <div className='imgwrap'>
    <img className='recommendedtabsimg' src={nycphoto}></img>
    </div>
    <div className='optionswrap'>
        <p className='textwraps'>City Name</p>
        <p className='textwraps'>Flights | Hotels | Activities</p>
    </div>
</li>
<li className="recommendedtabs">
    <div className='imgwrap'>
    <img className='recommendedtabsimg' src={nycphoto}></img>
    </div>
    <div className='optionswrap'>
        <p className='textwraps'>City Name</p>
        <p className='textwraps'>Flights | Hotels | Activities</p>
    </div>
</li>
</ul>
  )
}
export default RecommendedTab;
