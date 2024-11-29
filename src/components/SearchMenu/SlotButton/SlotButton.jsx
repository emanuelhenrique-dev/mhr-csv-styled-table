import './SlotButton.css'

export const SlotButton = ({count, searchSlot, setSearchSlot}) => {

    // Função para alterar o valor (incrementar ou decrementar)
    const ChangeSlot = (count) => {
      if (searchSlot === '') {
        // Se o valor estiver vazio, definir comportamento inicial
        if (count === '+') {
          setSearchSlot('0'); // Se estiver vazio e somar, define como 1
        } else if (count === '-') {
          setSearchSlot('4'); // Se estiver vazio e subtrair, define como 4
        }
      } else {
        // Caso contrário, trata a alteração normal
        if (count === '+') {
          if (Number(searchSlot) < 4) {
            setSearchSlot((prevValue) => (Number(prevValue) + 1).toString());
          } else {
            setSearchSlot(''); // Se o valor for 4, reseta para ''
          }
        } else if (count === '-') {
          if (Number(searchSlot) > 0) {
            setSearchSlot((prevValue) => (Number(prevValue) - 1).toString());
          } else {
            setSearchSlot(''); // Se o valor for 0, reseta para ''
          }
        }
      }
    };
  
  return ( 
    <div className="SlotButton" onClick={() => ChangeSlot(count)}>
      <p>{count}</p>
    </div>
   );
}