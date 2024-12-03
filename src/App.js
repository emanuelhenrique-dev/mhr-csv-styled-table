import { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/Card/Card.jsx';
import { SearchMenu } from './components/SearchMenu/SearchMenu';
import Papa from 'papaparse';

function App() {
  const [fileName, setFileName] = useState('Choose csv file');
  const [csvData, setCsvData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleCardsCount, setVisibleCardsCount] = useState(500);
  const [viewMarked, setViewMarked] = useState(false);

  // Função que lida com a leitura do arquivo CSV
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData([]);
          const parsedData = result.data;

          // Filtrar itens com Type ou Value inválidos
          const validData = parsedData.filter((item) => {
            return item.Type && !isNaN(parseInt(item.Value, 10));
          });

          window.scrollTo(0, 0);
          setVisibleCardsCount(500);
          setFileName(file.name);
          setCsvData(validData);

          // Agrupar os dados por "No"
          const grouped = groupByNo(validData);
          setGroupedData(grouped); // Armazenar os dados agrupados por "No"
        },
        header: true // Se você quiser que o PapaParse use a primeira linha como cabeçalhos
      });
    }
  };

  // Função para agrupar os dados por "No"
  const groupByNo = (data) => {
    const grouped = data.reduce((acc, curr) => {
      const { No } = curr;

      if (!acc[No]) {
        acc[No] = []; // Garante que acc[No] seja sempre um array
      }

      acc[No].push(curr);

      return acc;
    }, {});

    // Adicionando o console log aqui
    //console.log("Agrupado por 'No':", grouped); // Veja como os dados ficam depois de agrupados por No

    // Agora, para cada grupo de "No", agrupamos por "Type"
    return Object.keys(grouped).map((no) => {
      const group = grouped[no];
      return {
        No: no,
        cards: group,
        cardsGroup: groupByType(group) // groupByType sempre deve retornar um array
      };
    });
  };

  // Função para agrupar os dados por "Type" dentro de cada "No"
  const groupByType = (cards) => {
    const grouped = cards.reduce(
      (acc, curr) => {
        const { Type, Value } = curr;

        // Verifique se o Type existe antes de fazer qualquer operação
        if (!Type) {
          console.error('Tipo não definido para o item:', curr); // Mensagem de erro caso Type seja undefined
          return acc; // Ignorar este item se o Type não existir
        }

        const value = parseInt(Value, 10);

        // Agrupar os valores de tipos iguais
        if (Type.includes('2`Def')) {
          acc.def += value; // Soma o valor de Def
        } else if (Type.includes('Fire Res')) {
          acc.FireRes += value;
        } else if (Type.includes('Water Res')) {
          acc.WaterRes += value;
        } else if (Type.includes('Thunder Res')) {
          acc.ThunderRes += value;
        } else if (Type.includes('Ice Res')) {
          acc.IceRes += value;
        } else if (Type.includes('Dragon Res')) {
          acc.DragonRes += value;
        } else if (Type.includes('Slot')) {
          acc.slot += value;
        } else {
          // Para Skills, verifique se já existe e, se sim, some os valores
          const existingSkill = acc.skill.find((item) => item.Type === Type);

          if (existingSkill) {
            existingSkill.Value += value;
          } else {
            acc.skill.push({ Type, Value: value });
          }
        }

        return acc;
      },
      {
        def: 0,
        FireRes: 0,
        WaterRes: 0,
        ThunderRes: 0,
        IceRes: 0,
        DragonRes: 0,
        slot: 0,
        mark: false,
        skill: []
      }
    );

    // Adicionando o console log aqui
    //console.log("Agrupado por 'Type':", grouped); // Veja como os dados ficam após o agrupamento por Type

    // Certifique-se de que groupByType sempre retorna um objeto bem estruturado, com um array em skill
    return grouped;
  };

  // aumenta o numero maximo de cards
  const handleNumberMaxCards = () => {
    if (groupedData.length >= visibleCardsCount) {
      setVisibleCardsCount((prev) => prev + 500);
    }
    console.log('visibleCardsCount=' + visibleCardsCount);
    console.log('filteredData.length=' + filteredData.length);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="title">
          <img src="./quest-maker.png" alt="" />
          <input type="text" defaultValue="Armor X Aug+" />
        </div>
        <SearchMenu
          groupedData={groupedData}
          setFilteredData={setFilteredData}
          setVisibleCardsCount={setVisibleCardsCount}
          viewMarked={viewMarked}
          setViewMarked={setViewMarked}
        />
        <label htmlFor="file" className="input-csv-file">
          <img src="./upload-cloud.png" alt="upload cloud" />
          {fileName} -{groupedData && <p> {filteredData.length} Cards</p>}
        </label>
        <input
          type="file"
          accept=".csv"
          id="file"
          className="input-file"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </header>

      <div className="container-cards">
        {!viewMarked
          ? filteredData
              .slice(0, visibleCardsCount)
              .map((group, index) => (
                <Card
                  key={index}
                  No={group.No}
                  cards={group.cardsGroup}
                  abstract={group.cards}
                />
              ))
          : filteredData.map(
              (group, index) =>
                group.cardsGroup.mark && (
                  <Card
                    key={index}
                    No={group.No}
                    cards={group.cardsGroup}
                    abstract={group.cards}
                  />
                )
            )}

        {!(filteredData.length <= visibleCardsCount) && !viewMarked && (
          <div className="increased-number">
            <button onClick={handleNumberMaxCards}>More Cards</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
