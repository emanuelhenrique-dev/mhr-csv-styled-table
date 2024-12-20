import { useState, useEffect } from 'react';
import { SlotButton } from './SlotButton/SlotButton';
import './SearchMenu.css'

export const SearchMenu = ({groupedData, filteredData, setFilteredData, setFilteredData2, setVisibleCardsCount, viewMarked, setViewMarked}) => {

  const [searchSkill, setSearchSkill] = useState('');
  const [searchSlot, setSearchSlot] = useState('');
  const [avaSKills, setAvaSkills] = useState('');


  useEffect(() => {
    reset();   
  }, [groupedData]); 

  const reset = () => {
    setSearchSkill('');
    setSearchSlot('');
    console.log('reset search terms')
  }


  const FilteredCards = (data) => {
    return data.filter((group) => {
      // Dividir o searchTerm em nome da skill e valor
      const skillSearch = searchSkill.split(':').map((item) => item.trim());
      const skillName = skillSearch[0] || '';
      const skillValue = skillSearch[1] ? parseInt(skillSearch[1], 10) : null;

      // Filtra os cards por searchSkill (Skill) - Ignora maiúsculas/minúsculas
      const filteredSkills = group.cardsGroup.skill.filter((skill) => {
        const skillMatches = skill.Type.toLowerCase().includes(
          skillName.toLowerCase()
        ); // Verifica o nome da habilidade
        const valueMatches = skillValue === null || skill.Value === skillValue; // Verifica se o valor da habilidade corresponde, se fornecido

        return skillMatches && valueMatches;
      });

      // Verifica se searchSlot foi preenchido e filtra pelo valor do slot
      const slotMatches =
        !searchSlot || group.cardsGroup.slot === parseInt(searchSlot, 10);

      // Se searchSkill estiver vazio, não há filtragem para Skill, e se searchSlot estiver vazio, não filtra por slot
      return (filteredSkills.length > 0 || !searchSkill) && slotMatches;
    });
  };

  //filter with available skills selector
  const FilteredCards2 = (data) => {
    return data.filter((group)=>{

      const skillsCard = group.cardsGroup.skill;
      const foundSkill = skillsCard.find((skill)=> skill.Type.toLowerCase().includes((avaSKills).toLowerCase()));
      //console.log(foundSkill);
      return foundSkill;
  })}

  const SkillsSelect = (data) => {
    return data.reduce((acc, curr) => {

      const skills = curr.cardsGroup.skill;

      skills.forEach(element => {
        const { Type, Value } = element;
        const value = parseInt(Value, 10);
        const skill = element.Type.split(":")[1];

        const existingSkill = acc.find((item) => item === skill);
        if (existingSkill) {
          return
        } else {
          acc.push(skill);
        }
      });

      return acc;
    },[]).sort()
  }

  //console.log(JSON.stringify(SkillsSelect(filteredData)));
  
    // useEffect para filtrar e passar os dados filtrados para o pai
    useEffect(() => {
      // Chama o filtro e atualiza o estado do pai
      const filteredData = FilteredCards(groupedData);
      setFilteredData(filteredData);
      const filteredData2 = FilteredCards2(filteredData)
      setFilteredData2(filteredData2);
      setVisibleCardsCount(500);
    }, [searchSkill, searchSlot, groupedData, setFilteredData]); // Depende do searchSkill,

    // useEffect para filtrar o filteredData
    useEffect(()=>{
      //console.log('assaas')
      const filteredData2 = FilteredCards2(filteredData)
      setFilteredData2(filteredData2)
    }, [avaSKills, filteredData]) 
 

  return (         
  <div className="search-terms">
    <svg onClick={()=> {
      setViewMarked(!viewMarked)
      setAvaSkills('')
      reset()
      }} width="42" height="40" viewBox="0 0 40 38" fill={!viewMarked? 'none' : 'white'} xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5261 1.67436L21.5261 1.67435L21.5238 1.66896C21.3732 1.32171 21.1245 1.02604 20.8081 0.818348C20.4916 0.610655 20.1214 0.5 19.7429 0.5C19.3645 0.5 18.9942 0.610655 18.6778 0.818348C18.3614 1.02604 18.1127 1.32171 17.9621 1.66896L17.9621 1.66895L17.9598 1.67436L13.7757 11.6457L13.7755 11.6462C13.7094 11.8042 13.6013 11.9411 13.4631 12.0423C13.3249 12.1434 13.1618 12.2048 12.9913 12.2201C12.9912 12.2201 12.9911 12.2201 12.991 12.2201L2.28544 13.1456C2.28493 13.1456 2.28441 13.1457 2.2839 13.1457C1.90169 13.1767 1.53722 13.3203 1.2365 13.5583C0.935376 13.7965 0.711702 14.1188 0.593781 14.4843C0.47586 14.8497 0.468992 15.2419 0.574046 15.6113C0.678785 15.9795 0.890081 16.3085 1.18132 16.557L9.30292 23.6415C9.30312 23.6417 9.30331 23.6419 9.30351 23.6421C9.43285 23.7559 9.52902 23.9025 9.58182 24.0665C9.6347 24.2308 9.6421 24.4063 9.60325 24.5744L9.60323 24.5745L7.16832 35.1174C7.16824 35.1177 7.16816 35.1181 7.16808 35.1184C7.08168 35.4891 7.10615 35.8769 7.23846 36.2338C7.37089 36.591 7.6055 36.9013 7.91306 37.1261C8.22061 37.3509 8.58752 37.4802 8.96806 37.4979C9.3486 37.5156 9.72593 37.421 10.0531 37.2257L10.0561 37.2239L19.2602 31.6402L19.2606 31.6399C19.406 31.5516 19.5728 31.5048 19.7429 31.5048C19.9131 31.5048 20.0799 31.5516 20.2253 31.6399L20.2257 31.6402L29.4297 37.2239L29.4328 37.2257C29.76 37.421 30.1373 37.5156 30.5178 37.4979C30.8984 37.4802 31.2653 37.3509 31.5728 37.1261C31.8804 36.9013 32.115 36.591 32.2474 36.2338C32.3797 35.877 32.4042 35.4892 32.3179 35.1186C32.3178 35.1182 32.3177 35.1178 32.3176 35.1174L29.8827 24.5745L29.8827 24.5744C29.8438 24.4063 29.8512 24.2308 29.9041 24.0665C29.9569 23.9024 30.0532 23.7557 30.1826 23.6419C30.1827 23.6418 30.1829 23.6416 30.183 23.6415L38.3019 16.5592C38.3028 16.5585 38.3037 16.5578 38.3045 16.557C38.5958 16.3086 38.8071 15.9796 38.9118 15.6113C39.0169 15.2419 39.01 14.8497 38.8921 14.4843C38.7742 14.1188 38.5505 13.7965 38.2494 13.5583C37.9487 13.3203 37.5842 13.1767 37.202 13.1457C37.2015 13.1457 37.201 13.1456 37.2005 13.1456L26.4949 12.2201C26.4948 12.2201 26.4947 12.2201 26.4946 12.2201C26.3241 12.2048 26.161 12.1434 26.0228 12.0423C25.8846 11.9411 25.7765 11.8042 25.7104 11.6462L25.7102 11.6457L21.5261 1.67436Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    <input
      type="search"
      placeholder="Search Skill"
      value={searchSkill}
      onChange={(e) => (
        setSearchSkill(e.target.value),
        setAvaSkills('')
      )}
    />
    <div className="slots-number">
      <p>Slots:</p>
      <div className="count">
        <SlotButton
          count={'-'}
          searchSlot={searchSlot}
          setSearchSlot={setSearchSlot}
        />
        {searchSlot ? (
          <p>{searchSlot}</p>
        ) : (
          <p>
            <img src="./quest-maker.png" alt="" />
          </p>
        )}
        <SlotButton
          count={'+'}
          searchSlot={searchSlot}
          setSearchSlot={setSearchSlot}
        />
      </div>
    </div>
    <div className='selector-skills'>
      <label htmlFor="skills">Available skills:</label>
        <select name="cars" id="skills" value={avaSKills} onChange={(e) => setAvaSkills(e.target.value)}>
          <option ></option>
          {!viewMarked && (SkillsSelect(filteredData).map((group, index)=>(
          <option key={index} >{group}</option>)))}
        </select>
        {/* <button onClick={()=>setAvaSkills('')}>close</button> */}
    </div>
  </div> ); 
}