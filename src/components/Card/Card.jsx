import "./Card.css"
import { def_img, 
  firedef_img, 
  waterdef_img, 
  thunderdef_img,
  icedef_img,
  dragondef_img,
  slot_img
} from "../../assets/image";
import { useEffect, useState } from "react";

export const Card = ({No, cards, abstract}) => {

  const [peekOn, setPeekOn] = useState(false);
  const [marked, setMarked] = useState(cards.mark);

  useEffect(() => {
      setPeekOn(false);
      setMarked(cards.mark)
  }, [abstract]);

  
  const {
    def,
    FireRes,
    WaterRes,
    ThunderRes,
    IceRes,
    DragonRes,
    slot,
    mark
  } = cards;

  //Ordenar com base no valor de "Value" de forma decrescente
   const skill = cards.skill.sort((a, b) => parseInt(b.Value) - parseInt(a.Value));


  function handleMarkedState () {
    setMarked(prevState =>!prevState);
    cards.mark = !cards.mark;
    console.log('favoritado')
  }

  function handlePeekState () {
    setPeekOn(prevState =>!prevState);
  }

 return (
  <div className= {!mark ? "card-border" : "card-border marked"} alt="" >
    <div className="Card">
      <div className="number-card">
        <h2>{No}</h2>
        <img className={!peekOn ? "look" : "lookOn"} onClick={handlePeekState} src={peekOn ? './eye-on.png' : './eye-off.png'} alt="" />
      </div>
      {!peekOn ? 
      <div className="details">
        <div className="atributes">
          <p className="slots">
            Slots:
            <img src={slot_img} alt="" style={{
              opacity: slot >= 1 ? 1 : 0.2
            }}/>
            <img src={slot_img} alt="" style={{
              opacity: slot >= 2 ? 1 : 0.2
            }}/>
            <img src={slot_img} alt="" style={{
              opacity: slot >= 3 ? 1 : 0.2
            }}/>
            <img src={slot_img} alt="" style={{
              opacity: slot >= 4 ? 1 : 0.2
            }}/>
            </p>
          <div className="defenses">
            <p><img src={def_img} alt="" />Def: {def}</p>
            <p><img src={firedef_img} alt="" />Fire Res: {FireRes}</p>
            <p><img src={waterdef_img} alt="" />Water Res: {WaterRes}</p>
            <p><img src={thunderdef_img} alt="" />Thunder Res: {ThunderRes}</p>
            <p><img src={icedef_img} alt="" />Ice Res:{IceRes}</p>
            <p><img src={dragondef_img} alt="" />Dragon Res:{DragonRes}</p>
          </div>
        </div>
        <div className="skills">
          <h4>Skills:</h4>
          <div className="skills-values">
            {skill.length > 0 ? (
                skill.map((s, index) => (
                  <p key={index} style={{
                    color: s.Value > 0 ? '#8AE58A': '#E58A8A'
                  }}>
                    {(s.Type).split(":")[1]}: {s.Value}
                  </p>
                ))
              ) : (
                <p style={{width:'100%'}}>No Skills</p>
              )}
          </div>
        </div>
      </div> 
      : <div className="abstractData">
          <table border="1">
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {abstract.map((row, index) => (
                <tr key={index}>
                  <td>{row.Type}</td>
                  <td>{row.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      }



        <svg onClick={handleMarkedState} width="32" height="30" viewBox="0 0 40 38" fill={!marked ? 'none' : 'white'} xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5261 1.67436L21.5261 1.67435L21.5238 1.66896C21.3732 1.32171 21.1245 1.02604 20.8081 0.818348C20.4916 0.610655 20.1214 0.5 19.7429 0.5C19.3645 0.5 18.9942 0.610655 18.6778 0.818348C18.3614 1.02604 18.1127 1.32171 17.9621 1.66896L17.9621 1.66895L17.9598 1.67436L13.7757 11.6457L13.7755 11.6462C13.7094 11.8042 13.6013 11.9411 13.4631 12.0423C13.3249 12.1434 13.1618 12.2048 12.9913 12.2201C12.9912 12.2201 12.9911 12.2201 12.991 12.2201L2.28544 13.1456C2.28493 13.1456 2.28441 13.1457 2.2839 13.1457C1.90169 13.1767 1.53722 13.3203 1.2365 13.5583C0.935376 13.7965 0.711702 14.1188 0.593781 14.4843C0.47586 14.8497 0.468992 15.2419 0.574046 15.6113C0.678785 15.9795 0.890081 16.3085 1.18132 16.557L9.30292 23.6415C9.30312 23.6417 9.30331 23.6419 9.30351 23.6421C9.43285 23.7559 9.52902 23.9025 9.58182 24.0665C9.6347 24.2308 9.6421 24.4063 9.60325 24.5744L9.60323 24.5745L7.16832 35.1174C7.16824 35.1177 7.16816 35.1181 7.16808 35.1184C7.08168 35.4891 7.10615 35.8769 7.23846 36.2338C7.37089 36.591 7.6055 36.9013 7.91306 37.1261C8.22061 37.3509 8.58752 37.4802 8.96806 37.4979C9.3486 37.5156 9.72593 37.421 10.0531 37.2257L10.0561 37.2239L19.2602 31.6402L19.2606 31.6399C19.406 31.5516 19.5728 31.5048 19.7429 31.5048C19.9131 31.5048 20.0799 31.5516 20.2253 31.6399L20.2257 31.6402L29.4297 37.2239L29.4328 37.2257C29.76 37.421 30.1373 37.5156 30.5178 37.4979C30.8984 37.4802 31.2653 37.3509 31.5728 37.1261C31.8804 36.9013 32.115 36.591 32.2474 36.2338C32.3797 35.877 32.4042 35.4892 32.3179 35.1186C32.3178 35.1182 32.3177 35.1178 32.3176 35.1174L29.8827 24.5745L29.8827 24.5744C29.8438 24.4063 29.8512 24.2308 29.9041 24.0665C29.9569 23.9024 30.0532 23.7557 30.1826 23.6419C30.1827 23.6418 30.1829 23.6416 30.183 23.6415L38.3019 16.5592C38.3028 16.5585 38.3037 16.5578 38.3045 16.557C38.5958 16.3086 38.8071 15.9796 38.9118 15.6113C39.0169 15.2419 39.01 14.8497 38.8921 14.4843C38.7742 14.1188 38.5505 13.7965 38.2494 13.5583C37.9487 13.3203 37.5842 13.1767 37.202 13.1457C37.2015 13.1457 37.201 13.1456 37.2005 13.1456L26.4949 12.2201C26.4948 12.2201 26.4947 12.2201 26.4946 12.2201C26.3241 12.2048 26.161 12.1434 26.0228 12.0423C25.8846 11.9411 25.7765 11.8042 25.7104 11.6462L25.7102 11.6457L21.5261 1.67436Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>

    </div>
  </div>
 )
}