type AppEnumColor = 
"default" | "primary" | "dark" | "black" |
"default-contrast" | "muted" | "muted-contrast" | "info" |
"success" | "warning" | "danger" | "light" | "red" ;

type AppEnumValue = number|string|unknown;
interface AppEnum {
  name:string,
  arName?:string,
  value:AppEnumValue
  color?:AppEnumColor,
  icon?: string
}
type AppEnumGroup = Array<AppEnum>


const statesType : AppEnumGroup = [
    {
        name: "Nothing",
        value: 0,
        color: 'warning',
        arName: 'Q'
    },
    {
        name: "Quiz",
        value: 1,
        color: 'warning',
        arName: 'Q'
    },
    {
        name: "HomeWork",
        value: 1,
        color: 'warning',
        arName: 'H'
    },{
        name: "Mid",
        value: 1,
        color: 'red',
        arName: 'M'
    },
]

const getEnumByValue = (enumGroup:AppEnumGroup,value:AppEnumValue)=>
    {
      const appEnum = enumGroup.find((e)=>e.value===value);
      return appEnum??enumGroup[0];
    }
    
    const getEnumByKey = (enumGroup:AppEnumGroup, key:keyof typeof enumGroup[0],value:unknown)=>
    {
      const appEnum = enumGroup.find((e)=>e[key]===value);
      return appEnum??enumGroup[0];
    }
    
    export{
      statesType,
      getEnumByKey,
      getEnumByValue,
    }