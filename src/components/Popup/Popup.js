import React, { useState } from "react";
import "./Popup.scss";

export default function Modal({element}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function check_date(el) 
  {
    if(el.type == 'focDate')
    {
        return el.date
    }else{
        return " "
    }
  }

  function check_characters(el) 
  {
    if(el.characters.available != 0)
    {   
        for(let i = 0;  i <  el.characters.items.length; i++)
        {
            if(el.characters.items.length = 1)
            {
                return el.characters.items[i].name 
            }else
            {
                return el.characters.items[i].name + ","
            }
            
        }
    }else{
        return " "
    }
  }
  function check_creators(el) 
  {
    if(el.creators.available != 0)
    {   
        for(let i = 0;  i <  el.creators.items.length; i++)
        {
            if(el.creators.items.length = 1)
            {
                return el.creators.items[i].name 
            }else
            {
                return el.creators.items[i].name + ","
            }
            
        }
    }else{
        return " "
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        More info
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <img className='picture' src={`${element.thumbnail.path}.${element.thumbnail.extension}`} alt='' height="245px" width="163px"/>
            <div className="text">
            <h2 className="popup-title">{element.title}</h2><br/>
            <ul class="rows">
                <li><span>Release Date:</span> {element.dates && element.dates.map((el)=> ( check_date(el)))}</li>
                <li><span>Format:</span> {element.format}</li>
                <li><span>Pages:</span> {element.pageCount}</li>
                <li><span>Characters:</span>{check_characters(element)}</li>
                <li><span>Creators:</span>{check_creators(element)}</li>
                <li><span>Diamon Code:</span>{element.diamondCode}</li>
                {element.prices && element.prices.map((price) => (   
                    <li><span>{price.price} €</span></li>
                ))}
            </ul>

                
            </div>
            
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}