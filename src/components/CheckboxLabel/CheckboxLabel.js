import TextField from "../TextField/TextField"
import styles from "./CheckboxLabel.module.css"

const CheckboxLabel = ({ checked, label, handleLabel, handleChange }) => {
  return (
    <div className={styles.labelInfo}>
      <label>
        <input
          type="checkbox"
          name="checked"
          checked={checked}
          onChange={handleChange}
          className={styles.checkboxlabel}
        />
      </label>
      <TextField
        name="checkedLabel"
        id="checkedLabel"
        value={label}
        onChange={handleLabel}
        className={styles.inputfield}
        placeholder="Enter label ...."
      />
    </div>
  )
}

export default CheckboxLabel
