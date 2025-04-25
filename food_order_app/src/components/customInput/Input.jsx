import styles from "./input.module.css";

const CustomInput = ({ name, label, type, value, hasError, errorMsg, ...props }) => {
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} value={value} {...props} />
            {hasError && <p className={styles.errorMsg}>{ errorMsg}</p>}
        </div>
    )
}

export default CustomInput;