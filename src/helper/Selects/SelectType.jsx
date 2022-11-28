const SelectType = ({ skill,handleChange }) => {
  return (
    <div>
      <select value={skill.skill_type} onChange={handleChange}>
        <option value={skill.id}>
          {skill.skill_type === 1 ? "Atak" : "Defans"}
        </option>
      </select>
      <select value={skill.skill_type_option}>
        <option value={skill.id}>
          {skill.skill_type_option === 1 ? "Yakın Mesafe" : "Uzak Mesafe"}
        </option>
      </select>
    </div>
  );
};

export default SelectType;
