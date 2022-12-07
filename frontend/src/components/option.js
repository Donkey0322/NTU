

const Option = ({ me, option,  handleOption }) => {
    {option.map((e, index)=>{
        
        <button type="button" onclick = {() => {handleOption(me)}} key = {index}>{e}</button>
    })}
  };
  
  export default Option;