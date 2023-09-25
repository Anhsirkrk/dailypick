import React,{useState} from 'react';
import './Trail.css'

const Trail = () => {

    const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
        // Add more options as needed
      ];
    


    const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='first-column'>
            <div>
                <h2>Multiple Checkboxes</h2>
                <ul>
                    {options.map((option) => (
                    <li key={option.id}>
                        <label>
                            <input type="checkbox" checked={selectedOptions.includes(option)} onChange={() => handleCheckboxChange(option)} />
                            {option.label}
                        </label>
                    </li>
                    ))}
                </ul>
                    <p>Selected options: {selectedOptions.join(', ')}</p>
            </div>
            </div>
            <div className='second-column'>
                        <div className='top'>
                            <h4>milk milk milk</h4>
                            <h4>milk milk milk</h4>
                            <h4>milk milk milk</h4>
                        </div>
                        <div className='items-display'>

                        </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Trail;




{/* <div className='daily-needs'>     
            
<div className="Heading" >Daily Needs </div>
<div className="group" >
<div className="scroll-container">
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >Vegetables </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >Milk </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >News Papers </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >Curd </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >Vegetables </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >Milk </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >News Papers </div>
    </div>
</div>
<div className="rectangle" >
    <div className="DN-field" >
      <img className="DN_Image" src="rectangle-14102.png" />
      <div className="name" >Curd </div>
    </div>
</div>

</div>
</div>
</div> */}