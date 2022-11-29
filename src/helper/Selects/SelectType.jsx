const SelectType = ({ skill,handleChange }) => {
  return (
    <div className="d-flex justify-content-between w-50">
      <select className="form-select me-4" value={skill.skill_type} onChange={handleChange}>
        <option value={skill.id}>
          {skill.skill_type === 1 ? "Atak" : "Defans"}
        </option>
      </select>
      <select className="form-select " value={skill.skill_type_option}>
        <option value={skill.id}>
          {skill.skill_type_option === 1 ? "Yakın Mesafe" : "Uzak Mesafe"}
        </option>
      </select>
    </div>
  );
};

export default SelectType;
