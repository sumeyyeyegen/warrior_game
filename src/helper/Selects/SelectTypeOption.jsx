

const SelectTypeOption = ({skill}) => {
  
  return (
    <select value={skill.skill_type_option}>
        <option value={skill.id}>{skill.skill_type_option===1 ? "Yakın Mesafe":"Uzak Mesafe"}</option>
    </select>
  );
};

export default SelectTypeOption;
